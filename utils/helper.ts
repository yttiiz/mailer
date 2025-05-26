export class Helper {
  public static convertJsonToObject = async <T = unknown>(
    path: string,
  ): Promise<T> => {
    const { decoder, file } = await Helper.getDecoderAndFile(path);

    return JSON.parse(decoder.decode(file));
  };

  public static convertFileToString = async (path: string): Promise<string> => {
    const { decoder, file } = await Helper.getDecoderAndFile(path);

    return decoder.decode(file);
  };

  private static getDecoderAndFile = async (path: string) => {
    const decoder = new TextDecoder("utf-8");
    const file = await Deno.readFile(Deno.cwd() + path);

    return {
      decoder,
      file,
    };
  };
}