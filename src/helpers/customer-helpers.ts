import "server-only";

import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";

dayjs.extend(timezone);
dayjs.extend(utc);

export const getCustomers = async (
  accessToken: string,
  searchText?: string
) => {
  // console.log("getCustomers", accessToken);

  const headers = {
    Retailer: process.env.RETAILER_NAME || "",
    Authorization: `Bearer ${accessToken}`,
  };

  const startTime = dayjs()
    .tz("Asia/Ho_Chi_Minh")
    .startOf("date")
    .toISOString();

  console.log("startTime", startTime);

  const groupId = 19398;

  const response = await fetch(
    process.env.CUSTOMER_ENDPOINT
      ? `${
          process.env.CUSTOMER_ENDPOINT
        }?lastModifiedFrom=${startTime}&groupId=${groupId}&orderBy=modifiedDate&orderDirection=Desc&pageSize=80&includeTotal=true${
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
