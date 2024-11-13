import express from "express";
import { borrowController } from "./borrow-return.controller";

const router = express.Router();

// Route to borrow a book
router.post("/borrow", borrowController.borrowBook);

// Route to return a book
router.post("/return", borrowController.returnBook);

export const BorrowReturnRoutes = router;
