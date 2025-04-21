import { getAccessToken } from "@/helpers/access-token-helpers";
import { getCustomers } from "@/helpers/customer-helpers";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const searchText = searchParams.get("searchText");

  if(!searchText) {
    return Response.json({
        data: [],
        pageSize: 0,
        total: 0
    });
  }

  const { access_token } = await getAccessToken();

  const customers = await getCustomers(access_token, searchText || undefined);

  return Response.json(customers);
}
