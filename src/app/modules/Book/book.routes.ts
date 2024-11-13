import express from "express";
import { bookController } from "./book.controller";

const router = express.Router();

router.get("/", bookController.getAllBook);
router.get("/:bookId", bookController.getBookById);
router.post("/", bookController.createBook);
router.put("/:bookId", bookController.updateBook);
router.delete("/:bookId", bookController.deleteBook);

export const BookRoutes = router;
