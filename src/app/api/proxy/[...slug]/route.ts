import axios from "axios";
import { performance } from "perf_hooks";
import crypto from "crypto";
import CryptoJS from "crypto-js";
import { NextResponse } from "next/server";

async function parseRequestBody(req: Request) {
  const contentType = req.headers.get("content-type") || "";

  if (contentType.includes("application/json")) {
    const body = await req.json();
    return body;
  } else if (contentType.includes("application/x-www-form-urlencoded")) {
    const formData = await req.formData();
    const body: any = {};
    formData.forEach((value, key) => {
      body[key] = value;
    });
    return body;
  } else if (contentType.includes("multipart/form-data")) {
    return await req.formData();
  }

  return null;
}

async function handler(req: Request) {
  const start = performance.now();
  const url = new URL(req.url);
  const slug = url.pathname.split("/api/proxy/")[1];
  const nonce = crypto.randomBytes(16).toString("base64");
  const reqBody = await parseRequestBody(req);

  try {
    const formData = reqBody instanceof FormData ? reqBody : null;
    const data = formData ? formData : reqBody;

    const isMultipart = req.headers
      .get("content-type")
      ?.includes("multipart/form-data");

    const response = await axios({
      method: req.method,
      url: `${process.env.BACKEND_URL}/${slug}${url.search ? url.search : ""}`,
      headers: {
        ...(req.headers as any),
        "x-forwarded-for":
          req.headers.get("x-forwarded-for") || req.headers.get("host") || "",
        "X-Content-Type-Options": "nosniff",
        "X-Frame-Options": "DENY",
        "X-XSS-Protection": "1; mode=block",
        "x-client-api-key": process.env.CLIENT_API_KEY,
        "Strict-Transport-Security": "max-age=31536000; includeSubDomains",
        "Content-Security-Policy": `default-src 'self'; script-src 'nonce-${nonce}'`,
        Authorization:
          req.headers.get("Authorization") || req.headers.get("authorization"),
        ...(isMultipart && { "Content-Type": req.headers.get("content-type") }),
      },
      data,
      timeout: 40000,
    });

    console.log(
      `[PROXY] ${req.method} ${slug} - ${response.status} - ${
        performance.now() - start
      }ms`
    );

    const responseHeaders = new Headers(response.headers as any);
    const nextResponse = NextResponse.json(response.data, {
      status: response.status,
      headers: responseHeaders,
    });

    return nextResponse;
  } catch (error: any) {
    const status = error.response?.status || 500;

    console.error(
      `[PROXY ERROR] ${req.method} ${slug} - ${status} - ${
        performance.now() - start
      }ms: ${error.message}`
    );

    return NextResponse.json(
      {
        error:
          status == 500 || !error.response.data?.message
            ? "An error occurred while processing your request. Please try again later."
            : error.response.data?.message,
        details:
          process.env.NODE_ENV === "development" ? error.message : undefined,
      },
      { status }
    );
  }
}

export const GET = handler;
export const POST = handler;
export const PUT = handler;
export const DELETE = handler;
export const PATCH = handler;
