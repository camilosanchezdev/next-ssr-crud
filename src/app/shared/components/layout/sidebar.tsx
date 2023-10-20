import Image from "next/image";
import logo from "@/app/assets/png/logo.png";
import Link from "next/link";
import LogoutAction from "../ui/logout/logout";

export default function Sidebar() {
  return (
    <div className="col-span-2 bg-gray-800 text-white">
      <div className="flex p-4 justify-center">
        <Image src={logo} alt="logo" className="w-4/6" title="logo" />
      </div>
      <div className="">
        <div className="relative min-h-[calc(100vh-10rem)]">
          <span className="uppercase font-semibold pb-4 px-4 text-lg">
            Analysis
          </span>
          <ul className="my-2">
            <li className="hover:bg-gray-500 cursor-pointer ">
              <Link
                href="dashboard"
                className="px-4 py-2 flex gap-4 items-center"
              >
                <i className="pi pi-th-large"></i>
                Dashboard
              </Link>
            </li>
            <li className="hover:bg-gray-500 cursor-pointer ">
              <Link href="books" className="px-4 py-2 flex gap-4 items-center">
                <i className="pi pi-user"></i>
                Books
              </Link>
            </li>
            <li className="hover:bg-gray-500 cursor-pointer ">
              <Link href="jobs" className="px-4 py-2 flex gap-4 items-center">
                <i className="pi pi-briefcase"></i>
                Jobs
              </Link>
            </li>
          </ul>
          <div className="absolute bottom-4 w-full">
            <LogoutAction />
          </div>
        </div>
      </div>
    </div>
  );
}
