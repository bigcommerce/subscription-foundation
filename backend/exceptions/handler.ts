import HttpStatus from "http-status-codes";
import { NextApiRequest } from "@/types/next";
import HttpError from "./http-error";
import { NextApiResponse } from "next";

const exceptionHandler = (
  err: any,
  _req: NextApiRequest,
  res: NextApiResponse
): void => {
  const timestamp = new Date().toISOString();
  let errorName = err?.name ?? "SystemError";
  let errorCode = err?.code ?? HttpStatus.INTERNAL_SERVER_ERROR;
  let errorMessage = err?.message ?? "An unexpected error occurred";
  if (err.name === "MongoError" && (err as any).code === 11000) {
    errorMessage = "Duplicated Data error";
  }
  console.error(err);
  if (err instanceof HttpError) {
    errorCode = err.getCode();
  }
  res.status(errorCode).json({
    name: errorName,
    status: errorCode,
    message: errorMessage,
    trace: errorCode != HttpStatus.NOT_FOUND ? err.stack : undefined,
    timestamp: timestamp
  });
};

export default exceptionHandler;
