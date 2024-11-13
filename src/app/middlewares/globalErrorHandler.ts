import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";

const globalErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log("err", err);
  console.error(err);
  const statusCode = err.statusCode || httpStatus.INTERNAL_SERVER_ERROR;
  const message = err.message || "Something went wrong!";
  res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
    success: false,
    message: message,
    // error: err,
    status: statusCode,
  });
};

export default globalErrorHandler;
