import { revalidateTag } from "next/cache";

export const getCustomers = async (accessToken: string) => {
    const headers = {
        Retailer: process.env.RETAILER_NAME || '',
        Authorization: `Bearer ${accessToken}`,
    };

    const response = await fetch(process.env.CUSTOMER_ENDPOINT ? `${process.env.CUSTOMER_ENDPOINT}?orderBy=modifiedDate&orderDirection=Desc&pageSize=80&includeTotal=true` : '', {
        method: "GET",
        headers: headers,
    })

    if(response.status === 401) {
        revalidateTag('fetch-access-token');
        throw new Error('Failed to fetch customers because access token expired');
    }

    if (!response.ok) {
        throw new Error('Failed to fetch customers');
    }

    const data = await response.json();

    return data;
}