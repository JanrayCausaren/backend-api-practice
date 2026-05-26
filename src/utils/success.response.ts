import type { Response } from "express";

export type SuccessResponseParams<T> = {
  message?: string;
  data: T;
  res: Response;
  statusCode?: number;
};

export const successResponse = <T>({
  message = "success",
  data,
  res,
  statusCode = 200,
}: SuccessResponseParams<T>) => {
  return res.status(statusCode).json({
    success: true,
    message,
    data,
  });
};
