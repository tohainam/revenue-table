import { login } from "@/helpers/authenticate";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  const formData = await request.formData();
  const password = formData.get("password");

  if (!password || typeof password !== "string")
    return new Response("Missing password", {
      status: 500,
    });

  const isValid = await login(password);

  if (!isValid)
    return new Response("Invalid password", {
      status: 500,
    });

  return new Response("OK", {
    status: 200,
  });
}
