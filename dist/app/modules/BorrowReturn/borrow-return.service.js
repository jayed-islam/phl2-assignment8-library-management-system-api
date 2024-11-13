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
exports.borrowService = void 0;
const prisma_1 = __importDefault(require("../../../shared/prisma"));
// Borrow a book with transaction
const borrowBook = (bookId, memberId) => __awaiter(void 0, void 0, void 0, function* () {
    const book = yield prisma_1.default.book.findUnique({ where: { bookId } });
    if (!book) {
        throw new Error("Book not found.");
    }
    const result = yield prisma_1.default.borrowRecord.create({
        data: {
            bookId,
            memberId,
            borrowDate: new Date(),
        },
    });
    return result;
});
// Return a book with transaction
const returnBook = (borrowId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.$transaction((prisma) => __awaiter(void 0, void 0, void 0, function* () {
        // Check if the borrow entry exists
        const borrowEntry = yield prisma.borrowRecord.findUnique({
            where: { borrowId },
        });
        if (!borrowEntry) {
            throw new Error("Borrow record not found.");
        }
        // Check if the book has already been returned
        if (borrowEntry.returnDate) {
            throw new Error("Book has already been returned.");
        }
        // Update the borrow record with the return date
        const updatedBorrowRecord = yield prisma.borrowRecord.update({
            where: { borrowId },
            data: {
                returnDate: new Date(),
            },
        });
        return updatedBorrowRecord;
    }));
    return result;
});
exports.borrowService = {
    borrowBook,
    returnBook,
};
