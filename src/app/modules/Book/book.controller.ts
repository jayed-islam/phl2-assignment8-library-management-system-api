import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";
import { bookService } from "./book.service";

const createBook = catchAsync(async (req: Request, res: Response) => {
  console.log("test", req.body);
  const result = await bookService.createBook(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Book Created successfuly",
    data: result,
  });
});

const getAllBook = catchAsync(async (req, res) => {
  const result = await bookService.getAllBook();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Books retrieved successfully",
    data: result,
  });
});

const getBookById = catchAsync(async (req, res) => {
  const { bookId } = req.params;
  const result = await bookService.getBookById(bookId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Book retrieved successfully",
    data: result,
  });
});

const updateBook = catchAsync(async (req, res) => {
  const { bookId } = req.params;
  const updateData = req.body;

  const result = await bookService.updateBook(bookId, updateData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Book updated successfully",
    data: result,
  });
});

const deleteBook = catchAsync(async (req, res) => {
  const { bookId } = req.params;
  const result = await bookService.deleteBook(bookId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Book deleted successfully",
    data: result,
  });
});

export const bookController = {
  createBook,
  getAllBook,
  getBookById,
  updateBook,
  deleteBook,
};
