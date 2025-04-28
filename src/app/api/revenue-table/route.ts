import { getAccessToken } from "@/helpers/access-token-helpers";
import { getCustomers } from "@/helpers/customer-helpers";

export const runtime = 'edge'

export async function GET() {
    const {access_token} = await getAccessToken();

    const customers = await getCustomers(access_token);

    return Response.json(customers)
}