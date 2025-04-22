"use client";

import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

export default function PasswordChangePage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [reNewPassword, setReNewPassword] = useState("");
  const [isError, setIsError] = useState(false);
  const [isNotMatch, setIsNotMatch] = useState(false);

  const handleChangePassword = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setIsError(false);
    setIsNotMatch(false);

    if (newPassword !== reNewPassword) {
      setIsNotMatch(true);
      return;
    }

    try {
      const response = await fetch("/api/password/change", {
        method: "POST",
        body: new URLSearchParams({
          password,
          newPassword,
        }),
      });

      if (!response.ok) {
        setIsError(true);
        return;
      }

      router.push("/");
    } catch {
      setIsError(true);
    } finally {
      setPassword("");
      setNewPassword("");
    }
  };

  return (
    <form onSubmit={handleChangePassword}>
      <div className="flex flex-col items-center justify-center h-screen">
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="Hãy nhập mật khẩu"
          autoFocus
          className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 md:mr-5 mb-5 md:mb-0 max-w-xl"
        />
        <br />
        <input
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          type="password"
          placeholder="Hãy nhập mật khẩu mới"
          autoFocus
          className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 md:mr-5 mb-5 md:mb-0 max-w-xl"
        />
        <br />
        <input
          value={reNewPassword}
          onChange={(e) => setReNewPassword(e.target.value)}
          type="password"
          placeholder="Hãy nhập lại mật khẩu mới"
          autoFocus
          className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 md:mr-5 mb-5 md:mb-0 max-w-xl"
        />

        {isNotMatch ? (
          <label className="text-sm text-red-500">Mật khẩu không khớp</label>
        ) : null}

        {isError ? (
          <label className="text-sm text-red-500">Đổi mật khẩu thất bại</label>
        ) : null}

        <button
          disabled={!password || !newPassword || !reNewPassword}
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded mt-5 disabled:cursor-not-allowed disabled:opacity-80"
        >
          Xác nhận
        </button>
      </div>
    </form>
  );
}
