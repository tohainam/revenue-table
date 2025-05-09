export const generateTableData = (
  order: number,
  data: {
    id: number;
    code: string;
    name: string;
    totalRevenue: number | undefined;
  }[]
) => {
  if (data.length < 20) {
    const dummyData = Array.from({ length: 20 - data.length }, () => ({
      id: Math.floor(Math.random() * 1000000000),
      code: "",
      name: "",
      totalRevenue: undefined,
    }));
    data = [...data, ...dummyData];
  }

  return {
    order,
    headers: ["Số đoàn", "Biển số", "Doanh thu"],
    rows: data.map((item) => ({
      id: item.id,
      col1: item.code,
      col2: item.name,
      col3: item.totalRevenue !== undefined ? item.totalRevenue
        .toLocaleString("vi-VN", {
          style: "currency",
          currency: "VND",
        })
        .replaceAll(".", ",") : '',
    })),
  };
};
