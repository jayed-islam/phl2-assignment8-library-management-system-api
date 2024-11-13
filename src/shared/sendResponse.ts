import { Response } from "express";

const sendResponse = <T>(
  res: Response,
  jsonData: {
    statusCode: number;
    success: boolean;
    message: string;
    data?: T | null | undefined;
  }
) => {
  res.status(jsonData.statusCode).json({
    success: jsonData.success,
    status: jsonData.statusCode,
    message: jsonData.message,
    ...(jsonData.data && { data: jsonData.data }),
  });
};

export default sendResponse;
