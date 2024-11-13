import prisma from "../../../shared/prisma";

// Borrow a book with transaction
const borrowBook = async (bookId: string, memberId: string) => {
  const result = await prisma.$transaction(async (prisma) => {
    // Check if the book exists
    const book = await prisma.book.findUnique({
      where: { bookId },
    });
    if (!book) {
      throw new Error("Book not found.");
    }

    // Check if the member exists
    const member = await prisma.member.findUnique({
      where: { memberId },
    });
    if (!member) {
      throw new Error("Member not found.");
    }

    // Create a borrow record if both book and member exist
    const borrowRecord = await prisma.borrowRecord.create({
      data: {
        bookId,
        memberId,
        borrowDate: new Date(),
      },
    });

    const { returnDate, ...responseData } = borrowRecord;
    return returnDate === null ? responseData : borrowRecord;
  });

  return result;
};

// Return a book with transaction
const returnBook = async (borrowId: string) => {
  const result = await prisma.$transaction(async (prisma) => {
    // Check if the borrow entry exists
    const borrowEntry = await prisma.borrowRecord.findUnique({
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

export const borrowService = {
  borrowBook,
  returnBook,
};
