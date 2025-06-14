import { email } from "./sendEmail.action.ts";
import { recaptchaAction } from "./sendRecaptcha.action.ts";

export const server = {
  email,
  recaptchaAction,
};
