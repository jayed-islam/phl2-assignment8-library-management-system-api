import prisma from "../../../shared/prisma";

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
const borrowBook = async (bookId: string, memberId: string) => {
  const result = await prisma.$transaction(
    async (prisma) => {
      const book = await prisma.book.findUnique({
        where: { bookId },
      });
      if (!book) {
        throw new Error("Book not found.");
      }

      const member = await prisma.member.findUnique({
        where: { memberId },
      });
      if (!member) {
        throw new Error("Member not found.");
      }

      if (book.availableCopies <= 0) {
        throw new Error("No copies available for borrowing.");
      }

      await prisma.book.update({
        where: { bookId },
        data: {
          availableCopies: book.availableCopies - 1,
        },
      });

      const borrowRecord = await prisma.borrowRecord.create({
        data: {
          bookId,
          memberId,
          borrowDate: new Date(),
        },
      });

      const { returnDate, ...responseData } = borrowRecord;
      return returnDate === null ? responseData : borrowRecord;
    },
    {
      timeout: 10000,
    }
  );

  return result;
};

// Return a book
const returnBook = async (borrowId: string) => {
  const result = await prisma.$transaction(async (prisma) => {
    const borrowEntry = await prisma.borrowRecord.findUnique({
      where: { borrowId },
    });
    if (!borrowEntry) {
      throw new Error("Borrow record not found.");
    }

    if (borrowEntry.returnDate) {
      throw new Error("Book has already been returned.");
    }

    const book = await prisma.book.findUnique({
      where: { bookId: borrowEntry.bookId },
    });
    if (!book) {
      throw new Error("Book not found.");
    }

    await prisma.book.update({
      where: { bookId: borrowEntry.bookId },
      data: {
        availableCopies: book.availableCopies + 1,
      },
    });

    const updatedBorrowRecord = await prisma.borrowRecord.update({
      where: { borrowId },
      data: {
        returnDate: new Date(),
      },
    });

    return updatedBorrowRecord;
  });

  return result;
};

const getOverdueBorrowList = async () => {
  const today = new Date();
  const overdueThreshold = new Date(today.setDate(today.getDate() - 14));

  const overdueBooks = await prisma.borrowRecord.findMany({
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
    const overdueDays =
      Math.floor(
        (new Date().getTime() - new Date(record.borrowDate).getTime()) /
          (1000 * 60 * 60 * 24)
      ) - 14;

    return {
      borrowId: record.borrowId,
      bookTitle: record.book.title,
      borrowerName: record.member.name,
      overdueDays,
    };
  });

  return overdueList;
};

export const borrowService = {
  borrowBook,
  returnBook,
  getOverdueBorrowList,
};
