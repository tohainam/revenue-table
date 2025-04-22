import "server-only";

import bcrypt from "bcryptjs";

let currentPassword = process.env.INIT_PASSWORD || "";

export const login = async (password: string): Promise<boolean> => {
  return bcrypt.compare(password, currentPassword);
};

export const changePassword = async (
  oldPassword: string,
  newPassword: string
): Promise<boolean> => {
  const isMatch = await bcrypt.compare(oldPassword, currentPassword);
  if (!isMatch) {
    throw new Error("Old password is incorrect.");
  }

  const salt = bcrypt.genSaltSync(10);
  const newHashedPassword = await bcrypt.hash(newPassword, salt);
  currentPassword = newHashedPassword;

  return true;
};
