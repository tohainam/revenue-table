import "server-only";

import dayjs from "dayjs";

export const getCustomers = async (
  accessToken: string,
  searchText?: string
) => {
  console.log("getCustomers", accessToken);

  const headers = {
    Retailer: process.env.RETAILER_NAME || "",
    Authorization: `Bearer ${accessToken}`,
  };

  const startTime0 = dayjs().startOf("date").toISOString();

  console.log("startTime0", startTime0);

  const response = await fetch(
    process.env.CUSTOMER_ENDPOINT
      ? `${
          process.env.CUSTOMER_ENDPOINT
        }?lastModifiedFrom=${startTime0}&orderBy=modifiedDate&orderDirection=Desc&pageSize=80&includeTotal=true${
          searchText ? "&name=" + searchText : ""
        }`
      : "",
    {
      method: "GET",
      headers: headers,
    }
  );

  if (response.status === 401) {
    console.log("Access token expired, revalidating...");
    // revalidateTag('fetchaccesstoken');
    throw new Error("Failed to fetch customers because access token expired");
  }

  if (!response.ok) {
    // revalidateTag('fetchaccesstoken');
    throw new Error("Failed to fetch customers");
  }

  const data = await response.json();

  return data;
};
