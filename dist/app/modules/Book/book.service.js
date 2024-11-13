"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookService = void 0;
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const createBook = (bookData) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("final", bookData);
    // Check if a book with the same title already exists
    const existingBook = yield prisma_1.default.book.findFirst({
        where: { title: bookData.title },
    });
    console.log("test existing", existingBook);
    if (existingBook) {
        throw new Error("A book with this title already exists.");
    }
    // Create the book if it doesn't exist
    const result = yield prisma_1.default.book.create({ data: bookData });
    return result;
});
const getAllBook = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.book.findMany();
    return result;
});
const getBookById = (bookId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.book.findFirstOrThrow({
        where: {
            bookId: bookId,
        },
    });
    return result;
});
const updateBook = (bookId, updateData) => __awaiter(void 0, void 0, void 0, function* () {
    // Check if the book exists
    const existingBook = yield prisma_1.default.book.findUnique({
        where: { bookId },
    });
    if (!existingBook) {
        throw new Error("Book not found. Cannot update a non-existent book.");
    }
    const result = yield prisma_1.default.book.update({
        where: {
            bookId: bookId,
        },
        data: updateData,
    });
    return result;
});
const deleteBook = (bookId) => __awaiter(void 0, void 0, void 0, function* () {
    // Check if the book exists
    const existingBook = yield prisma_1.default.book.findUnique({
        where: { bookId },
    });
    if (!existingBook) {
        throw new Error("Book not found. Cannot delete a non-existent book.");
    }
    const result = yield prisma_1.default.book.delete({
        where: {
            bookId: bookId,
        },
    });
    return result;
});
exports.bookService = {
    createBook,
    getAllBook,
    getBookById,
    updateBook,
    deleteBook,
};
