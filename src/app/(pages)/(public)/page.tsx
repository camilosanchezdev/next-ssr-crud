import background from "@/app/assets/png/home-bg.png";
import Image from "next/image";
import LoginForm from "./login-form";

export default async function Page() {
  return (
    <main className="bg-gray-200 grid grid-cols-12">
      <div className="col-span-8 flex items-center justify-center min-h-screen">
        <Image src={background} alt="" className="w-96 h-96" />
      </div>
      <div className="col-span-4 bg-white rounded-2xl m-4 p-4 flex flex-col justify-center">
        <h1 className="text-3xl font-semibold text-center">Welcome Back</h1>
        <p className="text-center">Please enter your details</p>
        <LoginForm />
      </div>
    </main>
  );
}
