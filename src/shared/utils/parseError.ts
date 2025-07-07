export function parseError(err: unknown): string {
  if (typeof err === "string") {
    return err;
  }

  if (err instanceof Error) {
    return err.message;
  }

  if (typeof err === "object" && err !== null) {
    const maybeObj = err as Record<string, unknown>;

    const msg = maybeObj.message;
    if (typeof msg === "string") {
      return msg;
    }

    const data = maybeObj.data;
    if (typeof data === "object" && data !== null) {
      const nestedMsg = (data as Record<string, unknown>).message;
      if (typeof nestedMsg === "string") {
        return nestedMsg;
      }
    }
  }

  return "Something went wrong";
}
