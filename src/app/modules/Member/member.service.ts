import prisma from "../../../shared/prisma";

// Create a new member, checking for an existing email
const createMember = async (memberData: any) => {
  const existingMember = await prisma.member.findFirst({
    where: { email: memberData.email },
  });

  if (existingMember) {
    throw new Error("A member with this email already exists.");
  }

  const result = await prisma.member.create({ data: memberData });
  return result;
};

// Get all members
const getAllMembers = async () => {
  const result = await prisma.member.findMany();
  return result;
};

// Get a member by memberId
const getMemberById = async (memberId: string) => {
  const result = await prisma.member.findFirstOrThrow({
    where: { memberId },
  });

  return result;
};

// Update a member's details, checking for existence first
const updateMember = async (memberId: string, updateData: any) => {
  const existingMember = await prisma.member.findUnique({
    where: { memberId },
  });

  if (!existingMember) {
    throw new Error("Member not found. Cannot update a non-existent member.");
  }

  const result = await prisma.member.update({
    where: { memberId },
    data: updateData,
  });

  return result;
};

// Delete a member by memberId, checking for existence first
const deleteMember = async (memberId: string) => {
  const existingMember = await prisma.member.findUnique({
    where: { memberId },
  });

  if (!existingMember) {
    throw new Error("Member not found. Cannot delete a non-existent member.");
  }

  const result = await prisma.member.delete({
    where: { memberId },
  });

  return result;
};

export const memberService = {
  createMember,
  getAllMembers,
  getMemberById,
  updateMember,
  deleteMember,
};
