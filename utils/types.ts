import { oak } from "@deps";

// Response types
export type ContentHeadersType = {
  name: string;
  value: string;
};

export type ContextType<T extends string> = oak.RouterContext<T> | oak.Context;

// Mailer types
export type MailConfigType = {
  host: string;
  port: number;
  secure: boolean;
};

export type SendParameterType = {
  to: string;
  emailContent: EmailContentType;
  needToWriteLog?: boolean;
};

export type EmailContentType = {
  subject: string;
  messagePlainText?: string;
  messageHtml: string;
};
