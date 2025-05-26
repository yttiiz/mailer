import { load } from "@deps";

export class Env {
  public static async init() {
    const env = await load();

    // Set environnement variables from '.env' file.
    Object.keys(env).map((key) => Deno.env.set(key, env[key]));

    return Deno.env.toObject();
  }
}
