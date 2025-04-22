import "server-only";

import fs from "node:fs";
import path from "path";
import bcrypt from "bcryptjs";

export const login = async (
  password: string
): Promise<boolean> => {
  const passwordFilePath = path.resolve(process.cwd(), "password.txt");
  const initPassword = process.env.INIT_PASSWORD;

  if (!fs.existsSync(passwordFilePath)) {
    if (!initPassword) {
      throw new Error("INIT_PASSWORD is not defined in environment variables.");
    }
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = await bcrypt.hash(initPassword, salt);
    fs.writeFileSync(passwordFilePath, hashedPassword, "utf8");
  }

  const storedHashedPassword = fs.readFileSync(passwordFilePath, "utf8");
  return bcrypt.compare(password, storedHashedPassword);
};
