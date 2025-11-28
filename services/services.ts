import { oak } from "@deps";
import {
  Crypto,
  EmailContentType,
  getBasicElements,
  Helper,
  Mailer,
  Response,
  setAdminBookingContent,
  setAdminContactContent,
  setBookingContent,
  setBookingUpdateContent,
  setContactContent,
  setForgotPasswordContent,
  setForgotPasswordTokenContent,
  setRegisterContent,
  verifyApiKey,
} from "@utils";
import {
  ResponseBookingJsonType,
  ResponseContactJsonType,
  ResponseForgotPasswordJsonType,
  ResponseForgotPasswordTokenJsonType,
  ResponseRegisterJsonType,
} from "@services";

export const getMiddleware = (ctx: oak.Context) => {
  const response = new Response(ctx);
  const headers = { name: "Content-Type", value: "application/json" };

  response
    .setHeaders(headers)
    .setResponse({ message: "Unauthorized request." }, 401);
};

export const postRegisterMiddleware = async (ctx: oak.Context) => {
  const { apiKey, response, headers } = getBasicElements(ctx);

  if (apiKey) {
    const { isOk, message } = verifyApiKey(ctx, apiKey);

    if (!isOk) {
      return response
        .setHeaders(headers)
        .setResponse({ message: message ?? "" }, 401);
    }
  }

  const { email, firstname }: ResponseRegisterJsonType = await ctx
    .request.body.json();
  const { subject, messageHtml, messagePlainText } = await Helper
    .convertJsonToObject<EmailContentType>("/email/register/email.json");

  // Send mail to user.
  Mailer.send({
    to: email,
    emailContent: {
      subject,
      messageHtml: setRegisterContent({
        textContent: messageHtml,
        userFirstname: firstname,
        userEmail: email,
      }),
      messagePlainText: setRegisterContent({
        textContent: messagePlainText,
        userFirstname: firstname,
        userEmail: email,
      }),
    },
  });

  response
    .setHeaders(headers)
    .setResponse(
      { message: "Email envoyé" },
      200,
    );
};

export const postBookingMiddleware = async (ctx: oak.Context) => {
  const { apiKey, response, headers } = getBasicElements(ctx);

  if (apiKey) {
    const { isOk, message } = verifyApiKey(ctx, apiKey);

    if (!isOk) {
      return response
        .setHeaders(headers)
        .setResponse({ message: message ?? "" }, 401);
    }
  }

  const { email, apartment, dates, firstname, fullname, price, numberOfDays }:
    ResponseBookingJsonType = await ctx
      .request.body.json();

  const { subject, messageHtml, messagePlainText } = await Helper
    .convertJsonToObject<EmailContentType>("/email/booking/email.json");

  const amount = price * numberOfDays;
  const desposit = (amount / 100) * 30;

  // Send mail to user.
  Mailer.send({
    to: email,
    emailContent: {
      subject,
      messageHtml: setBookingContent({
        textContent: messageHtml,
        userFirstname: firstname,
        dates,
        apartment,
        price,
        numberOfDays,
        amount,
        desposit,
      }),
      messagePlainText: setBookingContent({
        textContent: messagePlainText,
        userFirstname: firstname,
        dates,
        apartment,
        price,
        numberOfDays,
        amount,
        desposit,
      }),
    },
  });

  const {
    subject: adminSubject,
    messageHtml: adminMsgHtml,
    messagePlainText: adminMsgPlainText,
  } = await Helper
    .convertJsonToObject<EmailContentType>("/email/admin-booking/email.json");

  // Send mail to admin.
  Mailer.send({
    to: Deno.env.get("ADMIN_EMAIL") as string,
    emailContent: {
      subject: adminSubject,
      messageHtml: setAdminBookingContent({
        textContent: adminMsgHtml,
        userFullname: fullname,
        userEmail: email,
        dates,
        apartment: apartment.name,
        amount,
        price,
      }),
      messagePlainText: setAdminBookingContent({
        textContent: adminMsgPlainText,
        userFullname: fullname,
        userEmail: email,
        dates,
        apartment: apartment.name,
        amount,
        price,
      }),
    },
  });

  response
    .setHeaders(headers)
    .setResponse(
      { message: "Réservation effectuée" },
      200,
    );
};

export const postBookingUpdateMiddleware = async (ctx: oak.Context) => {
  const { apiKey, response, headers } = getBasicElements(ctx);

  if (apiKey) {
    const { isOk, message } = verifyApiKey(ctx, apiKey);

    if (!isOk) {
      return response
        .setHeaders(headers)
        .setResponse({ message: message ?? "" }, 401);
    }
  }

  const { email, apartment, dates, firstname, price, numberOfDays }:
    ResponseBookingJsonType = await ctx
      .request.body.json();

  const { subject, messageHtml, messagePlainText } = await Helper
    .convertJsonToObject<EmailContentType>("/email/booking-update/email.json");

  const amount = price * numberOfDays;

  // Send mail to user.
  Mailer.send({
    to: email,
    emailContent: {
      subject,
      messageHtml: setBookingUpdateContent({
        textContent: messageHtml,
        userFirstname: firstname,
        dates,
        apartment,
        price,
        numberOfDays,
        amount,
      }),
      messagePlainText: setBookingUpdateContent({
        textContent: messagePlainText,
        userFirstname: firstname,
        dates,
        apartment,
        price,
        numberOfDays,
        amount,
      }),
    },
  });

  response
    .setHeaders(headers)
    .setResponse(
      { message: "Réservation modifiée" },
      200,
    );
};

export const postContactMiddleware = async (ctx: oak.Context) => {
  const { apiKey, response, headers } = getBasicElements(ctx);

  if (apiKey) {
    const { isOk, message } = verifyApiKey(ctx, apiKey);

    if (!isOk) {
      return response
        .setHeaders(headers)
        .setResponse({ message: message ?? "" }, 401);
    }
  }

  const { email, firstname, lastname, message }: ResponseContactJsonType =
    await ctx
      .request.body.json();

  const { subject, messageHtml, messagePlainText } = await Helper
    .convertJsonToObject<EmailContentType>("/email/contact/email.json");

  // Send mail to user.
  Mailer.send({
    to: email,
    emailContent: {
      subject,
      messageHtml: setContactContent({
        textContent: messageHtml,
        userFirstname: firstname,
        userMessage: message,
      }),
      messagePlainText: setContactContent({
        textContent: messagePlainText,
        userFirstname: firstname,
        userMessage: message,
      }),
    },
  });

  const {
    subject: adminSubject,
    messageHtml: adminMessageHtml,
    messagePlainText: adminMessagePlainText,
  } = await Helper
    .convertJsonToObject<EmailContentType>("/email/admin-contact/email.json");

  // Send mail to admin.
  Mailer.send({
    to: Deno.env.get("ADMIN_EMAIL") as string,
    emailContent: {
      subject: adminSubject,
      messageHtml: setAdminContactContent({
        textContent: adminMessageHtml,
        userFirstname: firstname,
        userLastname: lastname,
        userEmail: email,
        userMessage: message,
      }),
      messagePlainText: setAdminContactContent({
        textContent: adminMessagePlainText,
        userFirstname: firstname,
        userLastname: lastname,
        userEmail: email,
        userMessage: message,
      }),
    },
  });

  response
    .setHeaders(headers)
    .setResponse(
      { message: "Message bien reçu." },
      200,
    );
};

export const postForgotPasswordMiddleware = async (ctx: oak.Context) => {
  const { apiKey, response, headers } = getBasicElements(ctx);

  if (apiKey) {
    const { isOk, message } = verifyApiKey(ctx, apiKey);

    if (!isOk) {
      return response
        .setHeaders(headers)
        .setResponse({ message: message ?? "" }, 401);
    }
  }

  const { email, firstname }: ResponseForgotPasswordJsonType = await ctx.request
    .body
    .json();

  const newPassword = Crypto.generatePassword();
  const { subject, messageHtml, messagePlainText } = await Helper
    .convertJsonToObject<EmailContentType>("/email/forgot-password/email.json");

  // Send mail to user.
  Mailer.send({
    to: email,
    emailContent: {
      subject,
      messageHtml: setForgotPasswordContent({
        textContent: messageHtml,
        userFirstname: firstname,
        userNewPassword: newPassword,
      }),
      messagePlainText: setForgotPasswordContent({
        textContent: messagePlainText,
        userFirstname: firstname,
        userNewPassword: newPassword,
      }),
    },
  });

  response
    .setHeaders(headers)
    .setResponse(
      {
        newPassword,
      },
      200,
    );
};

export const postForgotPasswordTokenMiddleware = async (ctx: oak.Context) => {
  const { apiKey, response, headers } = getBasicElements(ctx);

  if (apiKey) {
    const { isOk, message } = verifyApiKey(ctx, apiKey);

    if (!isOk) {
      return response
        .setHeaders(headers)
        .setResponse({ message: message ?? "" }, 401);
    }
  }

  const { email, firstname, token, url }: ResponseForgotPasswordTokenJsonType =
    await ctx.request.body
      .json();

  const { subject, messageHtml, messagePlainText } = await Helper
    .convertJsonToObject<EmailContentType>(
      "/email/forgot-password-token/email.json",
    );

  // Send mail to user.
  Mailer.send({
    to: email,
    emailContent: {
      subject,
      messageHtml: setForgotPasswordTokenContent({
        textContent: messageHtml,
        userFirstname: firstname,
        url,
        token,
      }),
      messagePlainText: setForgotPasswordTokenContent({
        textContent: messagePlainText,
        userFirstname: firstname,
        url,
        token,
      }),
    },
  });

  response
    .setHeaders(headers)
    .setResponse(
      {
        message: "Message envoyé",
      },
      200,
    );
};
