"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.memberService = void 0;
const prisma_1 = __importDefault(require("../../../shared/prisma"));
// Create a new member, checking for an existing email
const createMember = (memberData) => __awaiter(void 0, void 0, void 0, function* () {
    const existingMember = yield prisma_1.default.member.findFirst({
        where: { email: memberData.email },
    });
    if (existingMember) {
        throw new Error("A member with this email already exists.");
    }
    const result = yield prisma_1.default.member.create({ data: memberData });
    return result;
});
// Get all members
const getAllMembers = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.member.findMany();
    return result;
});
// Get a member by memberId
const getMemberById = (memberId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.member.findFirstOrThrow({
        where: { memberId },
    });
    return result;
});
// Update a member's details, checking for existence first
const updateMember = (memberId, updateData) => __awaiter(void 0, void 0, void 0, function* () {
    const existingMember = yield prisma_1.default.member.findUnique({
        where: { memberId },
    });
    if (!existingMember) {
        throw new Error("Member not found. Cannot update a non-existent member.");
    }
    const result = yield prisma_1.default.member.update({
        where: { memberId },
        data: updateData,
    });
    return result;
});
// Delete a member by memberId, checking for existence first
const deleteMember = (memberId) => __awaiter(void 0, void 0, void 0, function* () {
    const existingMember = yield prisma_1.default.member.findUnique({
        where: { memberId },
    });
    if (!existingMember) {
        throw new Error("Member not found. Cannot delete a non-existent member.");
    }
    const result = yield prisma_1.default.member.delete({
        where: { memberId },
    });
    return result;
});
exports.memberService = {
    createMember,
    getAllMembers,
    getMemberById,
    updateMember,
    deleteMember,
};
