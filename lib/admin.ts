import { auth } from "@clerk/nextjs/server";

const adminIds = [
  "user_2gGVULAB1IkKKuy3aQRktTTu6ev",
  "user_2hjdhHteHJCEmULDPduvVY85zK6",
  "user_2gGTuYcESL8LrYi8Wf3Xjdbf7Ge",
];

export const isAdmin = () => {
  const { userId } = auth();
  if (!userId) return false;
  return adminIds.indexOf(userId) !== -1;
};
