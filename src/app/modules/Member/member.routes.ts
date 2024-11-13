import express from "express";
import { memberController } from "./member.controller";

const router = express.Router();

router.get("/", memberController.getAllMembers);
router.get("/:memberId", memberController.getMemberById);
router.post("/", memberController.createMember);
router.put("/:memberId", memberController.updateMember);
router.delete("/:memberId", memberController.deleteMember);

export const MemberRoutes = router;
