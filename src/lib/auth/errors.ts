export class AuthRequiredError extends Error {
  readonly status: number;

  constructor(message = "Unauthorized", status = 401) {
    super(message);
    this.name = "AuthRequiredError";
    this.status = status;
  }
}
