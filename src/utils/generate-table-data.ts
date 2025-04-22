import reverse from "lodash.reverse";

export const generateTableData = (
  order: number,
  data: {
    id: number;
    code: string;
    name: string;
    totalRevenue: number;
  }[]
) => {
  if (!data || data.length === 0)
    return {
      id: 0,
      order: 0,
      headers: [],
      rows: [],
    };

  return {
    order,
    headers: ["Số đoàn", "Biển số", "Doanh thu"],
    rows: reverse(data).map((item) => ({
      id: item.id,
      col1: item.code,
      col2: item.name,
      col3: item.totalRevenue
        .toLocaleString("vi-VN", {
          style: "currency",
          currency: "VND",
        })
        .replaceAll(".", ","),
    })),
  };
};
