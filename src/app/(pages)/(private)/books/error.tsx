"use client";
import { ErrorPageIcon } from "../../../assets/svg/error-page.icon";

export default function Error() {
  return (
    <div className="px-6 py-12 text-gray-700">
      <div className="grid px-4 place-content-center h-[calc(100vh-250px)]">
        <div className="text-center">
          <ErrorPageIcon />
          <h1 className="mt-6 text-2xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Uh-oh!
          </h1>
          <p className="mt-4 text-gray-500">Something went wrong.</p>
        </div>
      </div>
    </div>
  );
}
