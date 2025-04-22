import fs from "node:fs";
import path from "path";
import bcrypt from "bcryptjs";

export const changePassword = async (
  oldPassword: string,
  newPassword: string
): Promise<boolean> => {
  const passwordFilePath = path.resolve(process.cwd(), "password.txt");

  if (!fs.existsSync(passwordFilePath)) {
    throw new Error("Password file does not exist.");
  }

  const storedHashedPassword = fs.readFileSync(passwordFilePath, "utf8");

  const isMatch = await bcrypt.compare(oldPassword, storedHashedPassword);
  if (!isMatch) {
    throw new Error("Old password is incorrect.");
  }

  const salt = bcrypt.genSaltSync(10);
  const newHashedPassword = await bcrypt.hash(newPassword, salt);
  fs.writeFileSync(passwordFilePath, newHashedPassword, "utf8");

  return true;
};