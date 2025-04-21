import dayjs from "dayjs";
import { revalidateTag } from "next/cache";
import timezone from "dayjs/plugin/timezone";

dayjs.extend(timezone)
dayjs.tz.setDefault("Asia/Ho_Chi_Minh");

export const getCustomers = async (accessToken: string, searchText?: string) => {
    const headers = {
        Retailer: process.env.RETAILER_NAME || '',
        Authorization: `Bearer ${accessToken}`,
    };

    const startTime = dayjs().startOf('day').toISOString();

    const response = await fetch(process.env.CUSTOMER_ENDPOINT ? `${process.env.CUSTOMER_ENDPOINT}?lastModifiedFrom=${startTime}&orderBy=modifiedDate&orderDirection=Desc&pageSize=80&includeTotal=true${searchText ? '&name=' + searchText : ''}` : '', {
        method: "GET",
        headers: headers,
    })

    if(response.status === 401) {
        revalidateTag('fetch-access-token');
        throw new Error('Failed to fetch customers because access token expired');
    }

    if (!response.ok) {
        revalidateTag('fetch-access-token');
        throw new Error('Failed to fetch customers');
    }

    const data = await response.json();

    return data;
}