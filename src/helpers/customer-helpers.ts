// import "server-only";

export const runtime = 'edge';

import dayjs from "dayjs";
import { revalidateTag } from "next/cache";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc)

export const getCustomers = async (accessToken: string, searchText?: string) => {
    const headers = {
        Retailer: process.env.RETAILER_NAME || '',
        Authorization: `Bearer ${accessToken}`,
    };

    const startTime = dayjs().utcOffset(0).startOf('date').toISOString();

    const response = await fetch(process.env.CUSTOMER_ENDPOINT ? `${process.env.CUSTOMER_ENDPOINT}?lastModifiedFrom=${startTime}&orderBy=modifiedDate&orderDirection=Desc&pageSize=80&includeTotal=true${searchText ? '&name=' + searchText : ''}` : '', {
        method: "GET",
        headers: headers,
    })

    if(response.status === 401) {
        console.log('Access token expired, revalidating...');
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