import {
  Response,
  SetAdminBookingContentType,
  SetAdminContactContentType,
  SetBookingContentType,
  SetBookingUpdateContentType,
  SetContactContentType,
  SetForgotPasswordContentType,
  SetForgotPasswordTokenContentType,
  SetRegisterContentType,
} from "@utils";
import { DateFormatter, oak } from "@deps";

export const verifyApiKey = (ctx: oak.Context, apiKey: string) => {
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

export const setRegisterContent = ({
  textContent,
  userFirstname,
  userEmail,
}: SetRegisterContentType) =>
  textContent
    .replace("{{ userFirstname }}", userFirstname)
    .replace("{{ userEmail }}", userEmail);

export const setBookingContent = ({
  textContent,
  userFirstname,
  dates,
  apartment,
  price,
  amount,
  numberOfDays,
  desposit,
}: SetBookingContentType) =>
  textContent
    .replace("{{ userFirstname }}", userFirstname)
    .replace("{{ apartmentType }}", apartment.type)
    .replace("{{ apartmentName }}", apartment.name)
    .replace("{{ startingDate }}", dates.starting)
    .replace("{{ endingDate }}", dates.ending)
    .replace("{{ numberOfDays }}", numberOfDays.toString())
    .replaceAll("{{ pricing }}", price.toString())
    .replace("{{ amount }}", amount.toString())
    .replace("{{ desposit }}", desposit.toString())
    .replace(
      "{{ currentDate }}",
      DateFormatter.display({ date: new Date(), style: "normal" }),
    );

export const setBookingUpdateContent = ({
  textContent,
  userFirstname,
  dates,
  apartment,
  price,
  amount,
  numberOfDays,
}: SetBookingUpdateContentType) =>
  textContent
    .replace("{{ userFirstname }}", userFirstname)
    .replace("{{ apartmentType }}", apartment.type)
    .replace("{{ apartmentName }}", apartment.name)
    .replace("{{ startingDate }}", dates.starting)
    .replace("{{ endingDate }}", dates.ending)
    .replace("{{ numberOfDays }}", numberOfDays.toString())
    .replaceAll("{{ pricing }}", price.toString())
    .replace("{{ amount }}", amount.toString())
    .replace(
      "{{ currentDate }}",
      DateFormatter.display({ date: new Date(), style: "normal" }),
    );

export const setAdminContactContent = ({
  textContent,
  userFirstname,
  userLastname,
  userEmail,
  userMessage,
}: SetAdminContactContentType) =>
  textContent
    .replace("{{ userFirstname }}", userFirstname)
    .replace("{{ userLastname }}", userLastname)
    .replace("{{ userEmail }}", userEmail)
    .replace("{{ userMessage }}", userMessage);

export const setContactContent = ({
  textContent,
  userFirstname,
  userMessage,
}: SetContactContentType) =>
  textContent
    .replace("{{ userFirstname }}", userFirstname)
    .replace("{{ userMessage }}", userMessage);

export const setForgotPasswordContent = ({
  textContent,
  userFirstname,
  userNewPassword,
}: SetForgotPasswordContentType) =>
  textContent
    .replace("{{ userFirstname }}", userFirstname)
    .replace("{{ userNewPassword }}", userNewPassword);

export const setForgotPasswordTokenContent = ({
  textContent,
  userFirstname,
  url,
  token,
}: SetForgotPasswordTokenContentType) =>
  textContent
    .replace("{{ userFirstname }}", userFirstname)
    .replaceAll("{{ url }}", url)
    .replace("{{ token }}", token);

export const setAdminBookingContent = ({
  textContent,
  userFullname,
  userEmail,
  apartment,
  price,
  amount,
  dates,
}: SetAdminBookingContentType) =>
  textContent
    .replace("{{ userFullname }}", userFullname)
    .replace("{{ userEmail }}", userEmail)
    .replace("{{ apartmentChosen }}", apartment)
    .replace("{{ userStartingDate }}", dates.starting)
    .replace("{{ userEndingDate }}", dates.ending)
    .replace("{{ pricing }}", price.toString())
    .replace("{{ amount }}", amount.toString());

export const getBasicElements = (ctx: oak.Context) => ({
  apiKey: Deno.env.get("API_KEY"),
  response: new Response(ctx),
  headers: { name: "Content-Type", value: "application/json" },
});
