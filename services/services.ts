import { oak } from "@deps";
import { EmailContentType, Helper, Mailer, Response } from "@utils";

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

  const { email, firstname }: { email: string; firstname: string } = await ctx
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
}: {
  textContent: string;
  userFirstname: string;
  userEmail: string;
}) =>
  textContent
    .replace("{{ userFirstname }}", userFirstname)
    .replace("{{ userEmail }}", userEmail);

const getBasicElements = (ctx: oak.Context) => ({
  apiKey: Deno.env.get("API_KEY"),
  response: new Response(ctx),
  headers: { name: "Content-Type", value: "application/json" },
});

const getContent = (
  item: string,
  searchValue: string,
  replaceValue: string,
) =>
  item.replace(
    searchValue,
    replaceValue,
  );

const getMaintainerMessage = (
  message: string,
  userEmail: string,
  userMessage: string,
) =>
  message
    .replace("{{ userEmail }}", userEmail)
    .replace(
      "{{ userMessage }}",
      userMessage,
    );
