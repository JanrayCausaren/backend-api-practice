import type { Request, Response, NextFunction } from "express";
import type { AppError } from "../utils/error/app.error.js";


//This is the single place all errors land. It checks if the error is one of yours (operational) or an unexpected bug, and responds accordingly.
export const errorHandler = (
  err: AppError,        // ← the error that was thrown
  _req: Request,
  res: Response,
  _next: NextFunction    // ← Express requires this 4th arg
) => {

  if (err.isOperational) {
    // YOUR errors — NotFoundError, ValidationError, etc.
    // These have statusCode + code because they extend AppError
    return res.status(err.statusCode).json({
      status:  "error",
      code:    err.code,
      message: err.message,
    });
  }

  // UNKNOWN errors — bugs, DB crashes, typos
  // Don't send the real error to the client — log it instead
  console.error(err);
  return res.status(500).json({
    status:  "error",
    message: "Something went wrong",
  });
};