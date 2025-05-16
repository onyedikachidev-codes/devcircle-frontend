import React from "react";

const ContentGuidelines = () => {
  return (
    <div className="min-h-screen bg-white w-full text-sm md:text-md leading-normal md:leading-relaxed">
      <div className="max-w-4xl mx-auto p-6 text-gray-700">
        <h1 className="text-xl font-app-medium mb-4 md:mb-6">
          Content Guidelines for TechGather
        </h1>
        <p className="mb-3 md:mb-4">
          Welcome to TechGather! We’re thrilled to have you share your thoughts,
          stories, and expertise with our community. To make sure our platform
          remains a welcoming, safe, and engaging space for everyone, we ask all
          contributors to follow these simple, community-focused guidelines.
        </p>
        <section className="mb-4 md:mb-6">
          <h2 className="text-base font-app-medium mb-1 md:mb-2">
            1. Originality & Authenticity
          </h2>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              <strong>Write Your Own Story:</strong> We love unique
              perspectives. Please only share content that you’ve personally
              created. Plagiarism or re-posting others` work without permission
              is prohibited.
            </li>
            <li>
              <strong>Be Transparent:</strong> If you’re sharing information or
              insights, keep it factual and accurate. Opinions are welcome, but
              make it clear where personal views end and factual information
              begins.
            </li>
          </ul>
        </section>
        <section className="mb-4 md:mb-6">
          <h2 className="text-base font-app-medium mb-1 md:mb-2">
            2. Respectful Community Standards
          </h2>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              <strong>Respect Differences:</strong> Avoid offensive language or
              harmful stereotyping. We’re here to celebrate diverse
              perspectives, so please express yourself with respect and empathy.
            </li>
            <li>
              <strong>No Harassment:</strong> Don’t target or intimidate others,
              either directly or indirectly. Harassment, bullying, or content
              that singles out others for negative reasons won’t be tolerated.
            </li>
            <li>
              <strong>Constructive Feedback:</strong> Sharing constructive
              feedback is great, but avoid harmful criticism. Focus on adding
              value to the conversation, not tearing others down.
            </li>
          </ul>
        </section>
        <section className="mb-4 md:mb-6">
          <h2 className="text-base font-app-medium mb-1 md:mb-2">
            3. Sensitive Content Guidelines
          </h2>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              <strong>Handle with Care:</strong> If your content covers
              sensitive or triggering topics, consider adding a brief content
              warning at the beginning of the article. This helps readers make
              informed choices about what they engage with.
            </li>
            <li>
              <strong>No Misinformation:</strong> We’re a platform for sharing
              real, reliable information. Avoid sharing unverified claims,
              especially around health, safety, or finance. Link to reputable
              sources when you’re citing data or studies.
            </li>
          </ul>
        </section>
        <section className="mb-4 md:mb-6">
          <h2 className="text-base font-app-medium mb-1 md:mb-2">
            4. Promotional Content
          </h2>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              <strong>Be Transparent About Affiliates:</strong> If your content
              includes affiliate links or promotions, make sure to disclose this
              upfront. It’s all about honesty with our readers.
            </li>
            <li>
              <strong>Keep Promotion Relevant:</strong> If you’re promoting your
              work, product, or service, make sure it’s relevant to the topic
              and adds value for readers. Excessive self-promotion isn’t
              allowed.
            </li>
          </ul>
        </section>
        <section className="mb-4 md:mb-6">
          <h2 className="text-base font-app-medium mb-1 md:mb-2">
            5. Quality & Presentation
          </h2>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              <strong>Aim for Clarity:</strong> Break up your writing with
              headings, paragraphs, and lists where it helps readability.
              Double-check for typos and grammar errors to keep your content
              polished.
            </li>
            <li>
              <strong>Use Appropriate Media:</strong> Feel free to include
              images, videos, or graphics that enhance your content. Ensure you
              have permission to use any media, and give credit to the original
              creator.
            </li>
            <li>
              <strong>Fact-Check When Needed:</strong> Readers rely on accurate
              information. If you’re sharing statistics or data, make sure it’s
              from a reputable source and up-to-date.
            </li>
          </ul>
        </section>
        <section className="mb-4 md:mb-6">
          <h2 className="text-base font-app-medium mb-1 md:mb-2">
            6. Moderation & Editorial Rights
          </h2>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              <strong>Right to Edit or Remove Content:</strong> We may edit or
              remove content that doesn’t meet these guidelines. Our goal is to
              maintain readability and quality while respecting your voice and
              intent.
            </li>
            <li>
              <strong>Community Feedback:</strong> We encourage community input
              on content. Articles that consistently receive negative feedback
              for violations of our guidelines may be subject to review.
            </li>
          </ul>
        </section>
        <section className="mb-4 md:mb-6">
          <h2 className="text-base font-app-medium mb-1 md:mb-2">
            7. Violations & Reporting
          </h2>
          <p className="mb-1 md:mb-2">
            We take these guidelines seriously. If content is found to violate
            our guidelines, it may be removed, and the contributor may receive a
            warning or, in cases of repeated violations, account restrictions.
          </p>
          <p>
            To report content that you believe violates these guidelines, please
            contact us at{" "}
            <a
              href="mailto:support@TechGather.io"
              className="text-blue-600 hover:underline"
            >
              support@TechGather.io
            </a>
            . We review all reports and take action as needed to maintain the
            quality of our community.
          </p>
        </section>
        <p className="mt-6">
          Thank you for being part of TechGather. By following these guidelines,
          you help us build a community where knowledge and creativity thrive.
          Let’s make TechGather a place where ideas, stories, and inspiration
          come to life!
        </p>
      </div>
    </div>
  );
};

export default ContentGuidelines;
