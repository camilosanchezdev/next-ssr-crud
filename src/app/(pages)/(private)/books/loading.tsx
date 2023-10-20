import Skeleton from "@/app/shared/components/ui/skeleton/skeleton";

export default function Loading() {
  return (
    <div className="px-6 py-12 text-gray-700">
      <h1 className="text-3xl font-semibold">Books</h1>
      <div className="my-8">
        <Skeleton className="h-8 my-2" height="6rem" />
        <Skeleton className="h-8 my-2" height="3rem" />
        <Skeleton className="h-8 my-2" height="3rem" />
        <Skeleton className="h-8 my-2" height="3rem" />
        <Skeleton className="h-8 my-2" height="3rem" />
        <Skeleton className="h-8 my-2" height="3rem" />
        <Skeleton className="h-8 my-2" height="3rem" />
        <Skeleton className="h-8 my-2" height="3rem" />
        <Skeleton className="h-8 my-2" height="3rem" />
        <Skeleton className="h-8 my-2" height="6rem" />
      </div>
    </div>
  );
}
