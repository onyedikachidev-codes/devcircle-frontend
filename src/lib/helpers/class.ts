import { ErrorResponse } from "./constants";

export class CustomError extends Error {
  response?: ErrorResponse;

  constructor(message: string, response?: ErrorResponse) {
    super(message);
    this.name = this.constructor.name;
    this.response = response;

    const error = response?.data?.error;

    if (Array.isArray(error)) {
      this.message = error[0];
    } else if (typeof error === "string") {
      this.message = error;
    } else {
      this.message =
        "An error occurred while processing your request. Please try again later.";
    }
  }
}
