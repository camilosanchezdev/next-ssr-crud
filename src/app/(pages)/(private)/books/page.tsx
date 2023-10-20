import { getServerSession } from "next-auth/next";

import { BookType } from "@/app/shared/types/book.type";
import Table from "./shared/components/table";
import { BaseApi } from "@/app/shared/services/base-crud.service";
import { authOptions } from "../../../api/auth/[...nextauth]/options";
import { BookStatusType } from "@/app/shared/types/book-status.type";
import { BookCategoryType } from "@/app/shared/types/book-category.type";

export const ITEMS_PER_PAGE = 5;

export default async function Books({
  searchParams,
}: {
  searchParams?: { [key: string]: string | undefined };
}) {
  const session = await getServerSession(authOptions);
  const { list } = BaseApi("books", session);
  const { all: getBookStatuses } = BaseApi("book-statuses", session);
  const { all: getBookCategories } = BaseApi("book-categories", session);

  const page = searchParams ? searchParams["p"] : undefined;
  const query = searchParams ? searchParams["query"] : undefined;

  const start = page ? Number(page) * ITEMS_PER_PAGE - ITEMS_PER_PAGE : 0;
  const length = ITEMS_PER_PAGE;

  const bookStatusesData = getBookStatuses<BookStatusType[]>();
  const bookCategoriesData = getBookCategories<BookCategoryType[]>();
  const booksData = list<BookType[]>({
    start,
    length,
    query,
  });

  const [books, bookStatuses, bookCategories] = await Promise.all([
    booksData,
    bookStatusesData,
    bookCategoriesData,
  ]);

  return (
    <div className="px-6 py-12 text-gray-700">
      <h1 className="text-3xl font-semibold">Books</h1>

      <div className="my-8">
        <Table
          page="books"
          data={books}
          bookStatuses={bookStatuses}
          bookCategories={bookCategories}
          currentQuery={query}
        />
      </div>
    </div>
  );
}
