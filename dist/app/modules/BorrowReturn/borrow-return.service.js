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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.borrowService = void 0;
const prisma_1 = __importDefault(require("../../../shared/prisma"));
// Borrow a book
// const borrowBook = async (bookId: string, memberId: string) => {
//   const result = await prisma.$transaction(async (prisma) => {
//     const book = await prisma.book.findUnique({
//       where: { bookId },
//     });
//     if (!book) {
//       throw new Error("Book not found.");
//     }
//     const member = await prisma.member.findUnique({
//       where: { memberId },
//     });
//     if (!member) {
//       throw new Error("Member not found.");
//     }
//     if (book.availableCopies <= 0) {
//       throw new Error("No copies available for borrowing.");
//     }
//     await prisma.book.update({
//       where: { bookId },
//       data: {
//         availableCopies: book.availableCopies - 1,
//       },
//     });
//     const borrowRecord = await prisma.borrowRecord.create({
//       data: {
//         bookId,
//         memberId,
//         borrowDate: new Date(),
//       },
//     });
//     const { returnDate, ...responseData } = borrowRecord;
//     return returnDate === null ? responseData : borrowRecord;
//   });
//   return result;
// };
const borrowBook = (bookId, memberId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.$transaction((prisma) => __awaiter(void 0, void 0, void 0, function* () {
        const book = yield prisma.book.findUnique({
            where: { bookId },
        });
        if (!book) {
            throw new Error("Book not found.");
        }
        const member = yield prisma.member.findUnique({
            where: { memberId },
        });
        if (!member) {
            throw new Error("Member not found.");
        }
        if (book.availableCopies <= 0) {
            throw new Error("No copies available for borrowing.");
        }
        yield prisma.book.update({
            where: { bookId },
            data: {
                availableCopies: book.availableCopies - 1,
            },
        });
        const borrowRecord = yield prisma.borrowRecord.create({
            data: {
                bookId,
                memberId,
                borrowDate: new Date(),
            },
        });
        const { returnDate } = borrowRecord, responseData = __rest(borrowRecord, ["returnDate"]);
        return returnDate === null ? responseData : borrowRecord;
    }), {
        timeout: 10000,
    });
    return result;
});
// Return a book
const returnBook = (borrowId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.$transaction((prisma) => __awaiter(void 0, void 0, void 0, function* () {
        const borrowEntry = yield prisma.borrowRecord.findUnique({
            where: { borrowId },
        });
        if (!borrowEntry) {
            throw new Error("Borrow record not found.");
        }
        if (borrowEntry.returnDate) {
            throw new Error("Book has already been returned.");
        }
        const book = yield prisma.book.findUnique({
            where: { bookId: borrowEntry.bookId },
        });
        if (!book) {
            throw new Error("Book not found.");
        }
        yield prisma.book.update({
            where: { bookId: borrowEntry.bookId },
            data: {
                availableCopies: book.availableCopies + 1,
            },
        });
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
const getOverdueBorrowList = () => __awaiter(void 0, void 0, void 0, function* () {
    const today = new Date();
    const overdueThreshold = new Date(today.setDate(today.getDate() - 14));
    const overdueBooks = yield prisma_1.default.borrowRecord.findMany({
        where: {
            returnDate: null,
            borrowDate: {
                lte: overdueThreshold,
            },
        },
        select: {
            borrowId: true,
            book: {
                select: { title: true },
            },
            member: {
                select: { name: true },
            },
            borrowDate: true,
        },
    });
    const overdueList = overdueBooks.map((record) => {
        const overdueDays = Math.floor((new Date().getTime() - new Date(record.borrowDate).getTime()) /
            (1000 * 60 * 60 * 24)) - 14;
        return {
            borrowId: record.borrowId,
            bookTitle: record.book.title,
            borrowerName: record.member.name,
            overdueDays,
        };
    });
    return overdueList;
});
exports.borrowService = {
    borrowBook,
    returnBook,
    getOverdueBorrowList,
};
