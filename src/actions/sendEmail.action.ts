import { defineAction, ActionError } from "astro:actions";
import { z } from "astro:schema";
import type { ContactForm } from "@interfaces/contact-form.interface.ts";
import { PUBLIC_COMPANY_EMAIL, PUBLIC_NETLIFY_URL } from "astro:env/client";
import { NETLIFY_EMAILS_SECRET } from "astro:env/server";

async function handlerSendEmail({
  email,
  name,
  subject,
  options,
  message,
}: ContactForm): Promise<{
  code: number;
  status: "error" | "success";
  message: string;
}> {
  try {
    await fetch(`${PUBLIC_NETLIFY_URL}/.netlify/functions/emails/contact`, {
      headers: {
        "Content-Type": "application/json",
        "netlify-emails-secret": NETLIFY_EMAILS_SECRET,
      },
      method: "POST",
      body: JSON.stringify({
        from: email,
        to: PUBLIC_COMPANY_EMAIL,
        subject: subject,
        parameters: {
          name,
          email,
          subject,
          options,
          message,
        },
      }),
    });
    return {
      code: 200,
      status: "success",
      message: "Email sent successfully.",
    };
  } catch {
    throw new ActionError({
      code: "INTERNAL_SERVER_ERROR",
      message: "Email not found.",
    });
  }
}

export const email = {
  sendEmail: defineAction({
    accept: "form",
    input: z.object({
      email: z.string().email(),
      name: z.string(),
      subject: z.string(),
      options: z.string(),
      message: z.string(),
    }),
    handler: async (input) => await handlerSendEmail(input),
  }),
};
