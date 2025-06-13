import { email } from "./sendEmail.action.ts";
import { recaptchaAction } from "./send-recaptcha.action.ts";

export const server = {
  email,
  recaptchaAction,
};
