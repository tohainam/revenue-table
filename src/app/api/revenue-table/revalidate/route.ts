import { getAccessToken } from "@/helpers/access-token-helpers";
import { revalidateTag } from "next/cache";

export const runtime = "edge";

export async function GET() {
  revalidateTag("fetchaccesstoken");
  const { access_token } = await getAccessToken();
  return Response.json(access_token)
}
