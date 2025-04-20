"use client";

import background from "@/assets/background.jpeg";
import logo from "@/assets/logo.png";
import { RevenueTable } from "@/components/RevenueTable";
import { useEffect, useRef, useState } from "react";
import chunk from "lodash.chunk";
import reverse from "lodash.reverse";
import Image from "next/image";

const generateTableData = (
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
      col3: Number(10000000)
        .toLocaleString("vi-VN", {
          style: "currency",
          currency: "VND",
        })
        .replaceAll(".", ","),
    })),
  };
};

export default function Home() {
  const intervalId = useRef<number>(0);
  const [revenueTableData, setRevenueTableData] = useState<
    {
      id: number;
      code: string;
      name: string;
      totalRevenue: number;
    }[]
  >([]);

  const fetchRevenueTableData = async () => {
    const response = await fetch("/api/revenue-table");
    const data = (await response.json()) as {
      data: {
        id: number;
        code: string;
        name: string;
        totalRevenue: number;
      }[];
    };

    setRevenueTableData(data.data);
  };

  useEffect(() => {
    fetchRevenueTableData();

    if (intervalId.current !== 0) {
      clearInterval(intervalId.current);
    }

    intervalId.current = window.setInterval(
      () => {
        fetchRevenueTableData();
      },
      process.env.NEXT_PUBLIC_RELOAD_INTERVAL_TIME_MS
        ? parseInt(process.env.NEXT_PUBLIC_RELOAD_INTERVAL_TIME_MS)
        : 10000
    );
  }, []);

  const tablesData = [
    generateTableData(1, chunk(revenueTableData, 20)[3]),
    generateTableData(2, chunk(revenueTableData, 20)[2]),
    generateTableData(3, chunk(revenueTableData, 20)[1]),
    generateTableData(4, chunk(revenueTableData, 20)[0]),
  ];

  return (
    <div
      style={{
        background: `url(${background.src}) no-repeat center center fixed`,
      }}
      className="min-h-screen min-w-screen py-5 px-5 md:px-20"
    >
      <Image
        src={logo.src}
        alt="Logo"
        className="absolute top-2 left-5 hidden md:block"
        priority
        width={120}
        height={120}
      />
      <div className="text-center my-5 md:my-10">
        <h2 className="text-xl md:text-3xl font-bold md:tracking-wider text-blue-600">
          ĐẦU MỐI HẢI SẢN ĐÔNG DƯƠNG KÍNH CHÀO QUÝ KHÁCH!
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {tablesData.map((tableData, index) => (
          <div key={index} className="w-full">
            <RevenueTable
              headers={tableData.headers}
              rows={tableData.rows}
              order={tableData.order}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
