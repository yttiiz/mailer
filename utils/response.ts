import type { ContentHeadersType, ContextType } from "./mod.ts";

export class Response<T extends string> {
  private ctx: ContextType<T>;

  constructor(ctx: ContextType<T>) {
    this.ctx = ctx;
  }

  public setHeaders(...contents: ContentHeadersType[]) {
    for (const { name, value } of contents) {
      this.ctx.response.headers.append(name, value);
    }
    return this;
  }

  public setResponse(data: string | Record<string, string>, status: number) {
    this.ctx.response.body = data;
    this.ctx.response.status = status;
    return this;
  }

  public redirect(url: URL) {
    this.ctx.response.redirect(url);
    return this;
  }
}
