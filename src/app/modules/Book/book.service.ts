import prisma from "../../../shared/prisma";

const createBook = async (bookData: any) => {
  console.log("final", bookData);
  // Check if a book with the same title already exists
  const existingBook = await prisma.book.findFirst({
    where: { title: bookData.title },
  });

  console.log("test existing", existingBook);

  if (existingBook) {
    throw new Error("A book with this title already exists.");
  }

  // Create the book if it doesn't exist
  const result = await prisma.book.create({ data: bookData });
  return result;
};

const getAllBook = async () => {
  const result = await prisma.book.findMany();
  return result;
};

const getBookById = async (bookId: string) => {
  const result = await prisma.book.findFirstOrThrow({
    where: {
      bookId: bookId,
    },
  });

  return result;
};

const updateBook = async (bookId: string, updateData: any) => {
  // Check if the book exists
  const existingBook = await prisma.book.findUnique({
    where: { bookId },
  });

  if (!existingBook) {
    throw new Error("Book not found. Cannot update a non-existent book.");
  }
  const result = await prisma.book.update({
    where: {
      bookId: bookId,
    },
    data: updateData,
  });

  return result;
};

const deleteBook = async (bookId: string) => {
  // Check if the book exists
  const existingBook = await prisma.book.findUnique({
    where: { bookId },
  });

  if (!existingBook) {
    throw new Error("Book not found. Cannot delete a non-existent book.");
  }

  const result = await prisma.book.delete({
    where: {
      bookId: bookId,
    },
  });

  return result;
};

export const bookService = {
  createBook,
  getAllBook,
  getBookById,
  updateBook,
  deleteBook,
};
