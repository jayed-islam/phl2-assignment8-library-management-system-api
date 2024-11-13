import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";
import { borrowService } from "./borrow-return.service";

// Borrow a book
const borrowBook = catchAsync(async (req: Request, res: Response) => {
  const { bookId, memberId } = req.body;
  const result = await borrowService.borrowBook(bookId, memberId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Book borrowed successfully",
    data: result,
  });
});

// Return a book
const returnBook = catchAsync(async (req: Request, res: Response) => {
  const { borrowId } = req.body;
  const result = await borrowService.returnBook(borrowId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Book returned successfully"',
  });
});

export const borrowController = {
  borrowBook,
  returnBook,
};
