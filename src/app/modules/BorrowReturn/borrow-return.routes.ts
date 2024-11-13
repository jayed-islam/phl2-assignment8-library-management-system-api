import express from "express";
import { borrowController } from "./borrow-return.controller";

const router = express.Router();

// borrow a book
router.post("/borrow", borrowController.borrowBook);

// return a book
router.post("/return", borrowController.returnBook);

// get overdue borrow list
router.get("/borrow/overdue", borrowController.getOverdueBorrowList);

export const BorrowReturnRoutes = router;
