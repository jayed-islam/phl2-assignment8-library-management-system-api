import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";
import { memberService } from "./member.service";

// Create a new member
const createMember = catchAsync(async (req: Request, res: Response) => {
  const result = await memberService.createMember(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Member created successfully",
    data: result,
  });
});

// Get all members
const getAllMembers = catchAsync(async (req, res) => {
  const result = await memberService.getAllMembers();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Members retrieved successfully",
    data: result,
  });
});

// Get a member by memberId
const getMemberById = catchAsync(async (req, res) => {
  const { memberId } = req.params;
  const result = await memberService.getMemberById(memberId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Member retrieved successfully",
    data: result,
  });
});

// Update a member
const updateMember = catchAsync(async (req, res) => {
  const { memberId } = req.params;
  const updateData = req.body;
  const result = await memberService.updateMember(memberId, updateData);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Member updated successfully!",
    data: result,
  });
});

// Delete a member
const deleteMember = catchAsync(async (req, res) => {
  const { memberId } = req.params;
  const result = await memberService.deleteMember(memberId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Member successfully deleted",
    data: result,
  });
});

export const memberController = {
  createMember,
  getAllMembers,
  getMemberById,
  updateMember,
  deleteMember,
};
