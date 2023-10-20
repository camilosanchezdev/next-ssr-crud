"use client";

import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

interface IFormInput {
  email: string;
  password: string;
}

export default function LoginForm() {
  const session = useSession();
  const router = useRouter();
  const [error, setError] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "admin@admin.com",
      password: "123",
    },
  });
  const auth = async (body: IFormInput) => {
    const response = await signIn("credentials", {
      redirect: false,
      ...body,
    });
    if (response?.ok) {
      router.push("/dashboard");
    } else {
      setError(true);
    }
  };
  const onSubmit: SubmitHandler<IFormInput> = async (form) => {
    setError(false);
    await auth(form);
  };
  return (
    <form
      className="w-full flex flex-col items-center"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="w-2/3">
        <input
          type="text"
          placeholder="Email"
          className="border-b focus:outline-0 w-full py-4 focus:border-gray-400"
          {...register("email", { required: true })}
        />
      </div>
      <div className="w-2/3">
        <input
          type="password"
          placeholder="Password"
          className="border-b focus:outline-0 w-full py-4 focus:border-gray-400"
          {...register("password", { required: true })}
        />
      </div>
      <div className="w-2/3">
        <div className="flex gap-2 my-4">
          <input type="checkbox" className="" id="remember" />
          <label htmlFor="remember" className="text-sm">
            Remember for 30 days
          </label>
        </div>
      </div>
      {error ? (
        <div className="w-2/3">
          <span className="text-sm text-red-600" role="alert">
            Wrong credentials
          </span>
        </div>
      ) : null}
      <div className="w-2/3">
        <div className="flex gap-2 my-4">
          <button
            className="bg-black text-white w-full rounded-xl py-2 text-sm hover:bg-gray-800 active:bg-gray-900 disabled:bg-gray-100"
            type="submit"
            disabled={session.status === "loading"}
          >
            Login In
          </button>
        </div>
      </div>
    </form>
  );
}
