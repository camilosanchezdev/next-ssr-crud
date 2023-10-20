import Image from "next/image";
import icon from "@/app/assets/png/icon.png";

export default function Header() {
  return (
    <div className="bg-white h-24 flex justify-end items-center">
      <div className="px-4 flex items-center gap-4">
        <i className="pi pi-bell text-xl cursor-pointer border-r pr-4"></i>
        <span>John Doe</span>
        <div className="cursor-pointer">
          <Image
            src={icon}
            alt="icon"
            className="w-12 h-12 hover:shadow-lg rounded-full "
          />
        </div>
      </div>
    </div>
  );
}
