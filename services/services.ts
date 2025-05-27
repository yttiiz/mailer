import { DateFormatter, oak } from "@deps";
import { EmailContentType, Helper, Mailer, Response } from "@utils";
import {
  ResponseBookingJsonType,
  ResponseContactJsonType,
  ResponseRegisterJsonType,
  SetBookingContentType,
  SetContactContentType,
  SetRegisterContentType,
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

  const { email, apartment, dates, firstname }: ResponseBookingJsonType =
    await ctx
      .request.body.json();

  const { subject, messageHtml, messagePlainText } = await Helper
    .convertJsonToObject<EmailContentType>("/email/booking/email.json");

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
      }),
      messagePlainText: setBookingContent({
        textContent: messagePlainText,
        userFirstname: firstname,
        dates,
        apartment,
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
        userLastname: lastname,
        userEmail: email,
        userMessage: message,
      }),
      messagePlainText: setContactContent({
        textContent: messagePlainText,
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

const verifyApiKey = (ctx: oak.Context, apiKey: string) => {
  const givenApiKey = ctx.request.url.searchParams.get("apiKey");

  if (!givenApiKey) {
    return {
      isOk: false,
      message: "No api key given",
    };
  }

  const isAuthorized = givenApiKey === apiKey;

  if (!isAuthorized) {
    return {
      isOk: false,
      message: "Api key is no correct.",
    };
  }

  return { isOk: true };
};

const setRegisterContent = ({
  textContent,
  userFirstname,
  userEmail,
}: SetRegisterContentType) =>
  textContent
    .replace("{{ userFirstname }}", userFirstname)
    .replace("{{ userEmail }}", userEmail);

const setBookingContent = ({
  textContent,
  userFirstname,
  dates,
  apartment,
}: SetBookingContentType) =>
  textContent
    .replace("{{ userFirstname }}", userFirstname)
    .replace("{{ apartmentType }}", apartment.type)
    .replace("{{ apartmentName }}", apartment.name)
    .replace("{{ startingDate }}", dates.starting)
    .replace("{{ endingDate }}", dates.ending)
    .replace(
      "{{ currentDate }}",
      DateFormatter.display({ date: new Date(), style: "normal" }),
    );

const setContactContent = ({
  textContent,
  userFirstname,
  userLastname,
  userEmail,
  userMessage,
}: SetContactContentType) =>
  textContent
    .replace("{{ userFirstname }}", userFirstname)
    .replace("{{ userLastname }}", userLastname)
    .replace("{{ userEmail }}", userEmail)
    .replace("{{ userMessage }}", userMessage);

const getBasicElements = (ctx: oak.Context) => ({
  apiKey: Deno.env.get("API_KEY"),
  response: new Response(ctx),
  headers: { name: "Content-Type", value: "application/json" },
});
