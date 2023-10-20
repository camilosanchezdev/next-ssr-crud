"use client";

import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LogoutAction() {
  const router = useRouter();
  const handleLogout = () => {
    signOut();
    router.push("/");
  };
  return (
    <button
      className=" hover:bg-gray-500 w-full flex justify-center"
      onClick={handleLogout}
    >
      <div className="w-full px-4 py-2 flex gap-4 items-center ">
        <i className="pi pi-sign-out"></i>
        Logout
      </div>
    </button>
  );
}
