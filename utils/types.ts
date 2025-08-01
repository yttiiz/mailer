import { oak } from "@deps";

// Response types
export type ContentHeadersType = {
  name: string;
  value: string;
};

export type ContextType<T extends string> = oak.RouterContext<T> | oak.Context;

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
