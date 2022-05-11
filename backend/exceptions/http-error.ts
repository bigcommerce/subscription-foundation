import HttpStatus from "http-status-codes";
import BaseError from "./base-error";

export default class HttpError extends BaseError {
  constructor(
    m: string,
    code: number = HttpStatus.INTERNAL_SERVER_ERROR,
    name = "HTTPERROR"
  ) {
    super(m, code, name);
    // Set the prototype explicitly.
    Object.setPrototypeOf(this, HttpError.prototype);
  }
}
