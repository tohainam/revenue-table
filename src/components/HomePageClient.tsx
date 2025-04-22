"use client";

import { generateTableData } from "@/utils/generate-table-data";
import chunk from "lodash.chunk";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { RevenueTable } from "./RevenueTable";
import background from "@/assets/background.jpeg";
import logo from "@/assets/logo.png";
import searchingQrCode from "@/assets/searching_qrcode.png";

export const HomePageClient = () => {
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
    try {
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
    } catch {
      setRevenueTableData([]);
      console.log("Failed to fetch revenue table data");
    }
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

  const tablesData = (() => {
    const chunkedData = chunk(revenueTableData, 20);
    while (chunkedData.length < 4) {
      chunkedData.unshift([]);
    }

    return [
      generateTableData(1, chunkedData[3] || []),
      generateTableData(2, chunkedData[2] || []),
      generateTableData(3, chunkedData[1] || []),
      generateTableData(4, chunkedData[0] || []),
    ];
  })();

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

      <Image
        src={searchingQrCode.src}
        alt="Searching QR Code"
        className="absolute top-2 right-5 hidden md:block"
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
};
