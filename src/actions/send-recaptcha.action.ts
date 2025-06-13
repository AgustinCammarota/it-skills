import { defineAction, ActionError } from "astro:actions";
import { z } from "astro:schema";
import { PUBLIC_API_RECAPTCHA } from "astro:env/client";
import { RECAPTCHA_SECRET_KEY } from "astro:env/server";

async function requestCaptcha(token: string): Promise<{
  code: number;
  status: "error" | "success";
  message: string;
}> {
  const requestHeaders = {
    "Content-Type": "application/x-www-form-urlencoded",
  };

  const requestBody = new URLSearchParams({
    secret: RECAPTCHA_SECRET_KEY,
    response: token,
  });

  try {
    const response = await fetch(PUBLIC_API_RECAPTCHA, {
      method: "POST",
      headers: requestHeaders,
      body: requestBody.toString(),
    });

    return {
      code: response.ok ? 200 : 400,
      status: response.ok ? "success" : "error",
      message: response.ok ? "Recaptcha verified." : "Error recaptcha request.",
    };
  } catch {
    throw new ActionError({
      code: "BAD_REQUEST",
      message: "Error recaptcha request.",
    });
  }
}

export const recaptchaAction = {
  verifyCaptcha: defineAction({
    input: z.object({
      token: z.string(),
    }),
    handler: async ({ token }) => await requestCaptcha(token),
  }),
};
