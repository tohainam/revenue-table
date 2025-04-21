"use client";

import Image from "next/image";
import background from "@/assets/background.jpeg";
import logo from "@/assets/logo.png";
import { useState } from "react";
import { generateTableData } from "@/utils/generate-table-data";
import { RevenueTable } from "@/components/RevenueTable";

export default function SearchingPage() {
  const [searchText, setSearchText] = useState<string>("");
  const [tableData, setTableData] = useState<
    | {
        headers: string[];
        rows: { id: number; col1: string; col2: string; col3: string }[];
        order: number;
      }
    | undefined
  >({
    headers: [],
    rows: [],
    order: 1,
  });

  const handleSearch = async () => {
    const response = await fetch(`/api/search?searchText=${searchText.trim()}`);

    const result = await response.json();

    const data =
      (result.data as {
        id: number;
        code: string;
        name: string;
        totalRevenue: number;
      }[]) || [];

    setTableData(generateTableData(1, data));
  };

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
        className="mx-auto"
        priority
        width={120}
        height={120}
      />
      <div className="text-center my-5 md:my-10">
        <h2 className="text-xl md:text-3xl font-bold md:tracking-wider text-blue-600">
          ĐẦU MỐI HẢI SẢN ĐÔNG DƯƠNG KÍNH CHÀO QUÝ KHÁCH!
        </h2>
      </div>

      <div className="flex flex-col md:flex-row justify-center items-center max-w-3xl mx-auto mb-5 mt-20">
        <input
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          type="text"
          autoFocus
          className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 md:mr-5 mb-5 md:mb-0"
        />
        <button
          disabled={searchText?.trim().length < 4}
          type="button"
          className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-md font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 max-w-24 disabled:bg-gray-500 disabled:cursor-not-allowed disabled:opacity-80"
          onClick={handleSearch}
        >
          Tìm kiếm
        </button>
      </div>

      {tableData?.rows?.length ? (
        <div className="max-w-3xl mx-auto">
          <RevenueTable
            headers={tableData.headers}
            rows={tableData.rows}
            order={tableData.order}
          />
        </div>
      ) : null}
    </div>
  );
}
