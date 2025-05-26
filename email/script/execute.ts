import { EmailContentType, Helper } from "@utils";

export async function createEmailTemplate(
  emailJsonPath: string,
  emailHtmlPath: string,
) {
  // 1. Retreive "email.json".
  const baseEmailJson = await Helper.convertJsonToObject<EmailContentType>(
    emailJsonPath,
  );

  // 2. Replace previous "messageHtml" property content by "{{ emailHmtlContent }} mark."
  baseEmailJson.messageHtml = "{{ emailHtmlContent }}";

  // 3. Rewrite "email.json".
  const baseEmailJsonClean = JSON.stringify(baseEmailJson);
  await Deno.writeTextFile(Deno.cwd() + emailJsonPath, baseEmailJsonClean);

  // 4. Convert files.
  let emailHtml = await Helper.convertFileToString(emailHtmlPath);
  let emailJson = await Helper.convertFileToString(emailJsonPath);

  const date = new Date();

  // 5. Replace whitespaces & double quote | Insert new content.
  emailHtml = emailHtml.replaceAll("\n", "\\n");
  emailHtml = emailHtml.replaceAll('"', '\\"');
  emailHtml = emailHtml.replace(
    "{{ currentYear }}",
    date.getFullYear().toString(),
  );

  if (emailHtml.includes("{{ currentDate }}")) {
    emailHtml = emailHtml.replace(
      "{{ currentDate }}",
      new Intl.DateTimeFormat("fr-FR", {
        timeZone: "Europe/Paris",
        year: "numeric",
        month: "short",
        day: "numeric",
      }).format(date),
    );
  }

  emailJson = emailJson.replace("{{ emailHtmlContent }}", emailHtml);

  // 6. Rewrite "email.json" again.
  await Deno.writeTextFile(Deno.cwd() + emailJsonPath, emailJson);
}

for (const item of ["register", "booking"]) {
  createEmailTemplate(
    `/email/${item}/email.json`,
    `/email/${item}/email.html`,
  );
}
