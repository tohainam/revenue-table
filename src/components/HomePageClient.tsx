"use client";

import { generateTableData } from "@/utils/generate-table-data";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { RevenueTable } from "./RevenueTable";
import background from "@/assets/background.jpeg";
import logo from "@/assets/logo.png";
import searchingQrCode from "@/assets/searching_qrcode.png";
import { splitArray } from "@/utils/split-array";
import cloneDeep from "lodash.clonedeep";

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
    const newData = cloneDeep(revenueTableData);
    newData.reverse()
  
    const chunkedData = splitArray(newData, 20);

    return [
      generateTableData(1, chunkedData[0] || []),
      generateTableData(2, chunkedData[1] || []),
      generateTableData(3, chunkedData[2] || []),
      generateTableData(4, chunkedData[3] || []),
    ];
  })();

  return (
    <div
      style={{
        background: `url(${background.src}) no-repeat center center fixed`,
      }}
      className="flex flex-col justify-between min-h-screen min-w-screen py-5 xl:py-10 px-5 md:px-20"
    >
      <Image
        src={logo.src}
        alt="Logo"
        className="absolute top-2 xl:top-10 left-5 hidden md:block"
        priority
        width={150}
        height={150}
      />

      <div className="absolute top-2 xl:top-10 right-5 hidden md:block flex justify-items-center">
        <Image
          src={searchingQrCode.src}
          alt="Searching QR Code"
          priority
          width={150}
          height={150}
        />
        <span className="text-blue-600 text-xl md:text-lg font-bold">Quét để kiểm tra doanh thu đoàn</span>
      </div>

      <div className="text-center my-5 md:my-10 xl:px-30">
        <h2 className="text-xl md:text-3xl xl:text-4xl font-bold md:tracking-wider text-blue-600">
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
