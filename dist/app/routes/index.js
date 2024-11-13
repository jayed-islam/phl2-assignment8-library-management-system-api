"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const book_routes_1 = require("../modules/Book/book.routes");
const member_routes_1 = require("../modules/Member/member.routes");
const borrow_return_routes_1 = require("../modules/BorrowReturn/borrow-return.routes");
const router = express_1.default.Router();
const moduleRoutes = [
    {
        path: "/books",
        route: book_routes_1.BookRoutes,
    },
    {
        path: "/members",
        route: member_routes_1.MemberRoutes,
    },
    {
        path: "/",
        route: borrow_return_routes_1.BorrowReturnRoutes,
    },
];
moduleRoutes.forEach((route) => router.use(route.path, route.route));
exports.default = router;
