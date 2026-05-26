export type PaginationResponse<T> = {
  data: T;
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
};

export type Pagination = {
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
};

import type { Response } from "express";

export type SuccessPaginatedResponse<T, P> = {
  res: Response;
  statusCode?: number;
  message?: string;
  data: T;
  pagination: P;
};

export const successPaginatedResponse = <T, P>({
  message = "success",
  data,
  res,
  statusCode = 200,
  pagination,
}: SuccessPaginatedResponse<T,P>) => {
  return res.status(statusCode).json({
    success: true,
    message,
    data,
    pagination,
  });
};
