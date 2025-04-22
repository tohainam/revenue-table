"use client";

import { HomePageClient } from "@/components/HomePageClient";
import { FormEvent, useState } from "react";

export default function Home() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [isError, setIsError] = useState(false);

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setIsError(false);

    try {
      const response = await fetch("/api/login", {
        method: "POST",
        body: new URLSearchParams({
          password,
        }),
      });

      if (!response.ok) {
        setIsError(true);
        return;
      }

      setIsAuthenticated(true);
    } catch {
      setIsError(true);
    } finally {
      setPassword("");
    }
  };

  if (!isAuthenticated)
    return (
      <form onSubmit={handleLogin}>
        <div className="flex flex-col items-center justify-center h-screen">
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Hãy nhập mật khẩu"
            autoFocus
            className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 md:mr-5 mb-5 md:mb-0 max-w-xl"
          />
          {isError ? (
            <label className="text-sm text-red-500">
              Sai mật khẩu, vui lòng nhập lại
            </label>
          ) : null}

          <button
          disabled={!password}
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded mt-5 disabled:cursor-not-allowed disabled:opacity-80"
          >
            Đăng nhập
          </button>
        </div>
      </form>
    );

  return <HomePageClient />;
}
