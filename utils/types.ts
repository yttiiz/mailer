import { oak } from "@deps";

// Response types
export type ContentHeadersType = {
  name: string;
  value: string;
};

export type ContextType<T extends string> = oak.RouterContext<T> | oak.Context;

export type SetContentType = {
  textContent: string;
  userFirstname: string;
};

export type SetRegisterContentType = SetContentType & {
  userEmail: string;
};

// Mailer types
export type SendParameterType = {
  to: string;
  emailContent: EmailContentType;
  isForAdmin?: boolean;
};

export type EmailContentType = {
  subject: string;
  messagePlainText: string;
  messageHtml: string;
};

export type SetContactContentType = SetContentType & {
  userMessage: string;
};

export type SetAdminContactContentType = SetContentType & {
  userLastname: string;
  userEmail: string;
  userMessage: string;
};

export type SetForgotPasswordContentType = SetContentType & {
  userNewPassword: string;
};

export type SetForgotPasswordTokenContentType = SetContentType & {
  url: string;
  token: string;
};

export type SetBookingContentType = SetContentType & {
  dates: {
    starting: string;
    ending: string;
  };
  apartment: {
    type: string;
    name: string;
  };
};

export type SetAdminContentType = {
  textContent: string;
  userFullname: string;
  userEmail: string;
  apartment: string;
  price: number;
  dates: { starting: string; ending: string };
  amount: number;
};
