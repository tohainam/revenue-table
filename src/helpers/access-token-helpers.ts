import "server-only";

export const getAccessToken = async () => {
  const response = await fetch(process.env.TOKEN_ENDPOINT || "", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Accept: "application/json",
    },
    body: new URLSearchParams({
      scopes: "PublicApi.Access",
      grant_type: "client_credentials",
      client_id: process.env.CLIENT_ID || "",
      client_secret: process.env.CLIENT_SECRET || "",
    }),
    next: {
      revalidate: process.env.TOKEN_API_CACHE_TIME
        ? parseInt(process.env.TOKEN_API_CACHE_TIME)
        : 86000,
      tags: ["fetchaccesstoken"],
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch access token");
  }

  const data = await response.json();

  // console.log('getAccessToken', data?.access_token);

  return data;
};
