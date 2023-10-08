export class ApiError extends Error {
  code: number;
  constructor(message: string, code: number = 500) {
    super(message);
    this.code = code;
  }
}

export class AuthError extends ApiError {
  constructor(message: string, code: number = 403) {
    super(message, code);
  }
}
