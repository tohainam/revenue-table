import { NextRequest } from "next/server";
import { changePassword } from "@/helpers/chang-password";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const password = formData.get("password");
    const newPassword = formData.get("newPassword");

    if (!password || typeof password !== "string" || !newPassword || typeof newPassword !== "string") {
      return new Response("Invalid input", { status: 400 });
    }

    await changePassword(password, newPassword);

    return new Response("Password changed successfully", { status: 200 });
  } catch {
    return new Response('Invalid', { status: 500 });
  }
}
