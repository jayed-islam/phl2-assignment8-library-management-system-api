"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BorrowReturnRoutes = void 0;
const express_1 = __importDefault(require("express"));
const borrow_return_controller_1 = require("./borrow-return.controller");
const router = express_1.default.Router();
// Route to borrow a book
router.post("borrow", borrow_return_controller_1.borrowController.borrowBook);
// Route to return a book
router.post("return", borrow_return_controller_1.borrowController.returnBook);
exports.BorrowReturnRoutes = router;
