import { EmailContentType, Helper } from "@utils";
import { DateFormatter } from "@deps";

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
      DateFormatter.display({ date, style: "normal" }),
    );
  }

  emailJson = emailJson.replace("{{ emailHtmlContent }}", emailHtml);

  // 6. Rewrite "email.json" again.
  await Deno.writeTextFile(Deno.cwd() + emailJsonPath, emailJson);
}

for await (const { name } of Deno.readDir(Deno.cwd() + "/email")) {
  if (name !== "script") {
    createEmailTemplate(
      `/email/${name}/email.json`,
      `/email/${name}/email.html`,
    );
  }
}