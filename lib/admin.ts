import { auth } from "@clerk/nextjs/server";

const adminIds = ["user_2gGVULAB1IkKKuy3aQRktTTu6ev"];

export const isAdmin = () => {
  const { userId } = auth();
  if (!userId) return false;
  return adminIds.indexOf(userId) !== -1;
};
