import express from "express";
import { BookRoutes } from "../modules/Book/book.routes";
import { MemberRoutes } from "../modules/Member/member.routes";
import { BorrowReturnRoutes } from "../modules/BorrowReturn/borrow-return.routes";

const router = express.Router();

const moduleRoutes = [
  {
    path: "/books",
    route: BookRoutes,
  },
  {
    path: "/members",
    route: MemberRoutes,
  },
  {
    path: "/",
    route: BorrowReturnRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
