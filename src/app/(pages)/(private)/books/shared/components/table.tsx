"use client";

import React, { useState } from "react";
import { DataTable, DataTablePageEvent } from "primereact/datatable";
import { Column } from "primereact/column";
import { Tag } from "primereact/tag";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

import { BookType } from "@/app/shared/types/book.type";
import {
  BaseApi,
  ListPageResponse,
} from "@/app/shared/services/base-crud.service";
import { ITEMS_PER_PAGE } from "../../page";
import TableActions from "./table-actions";
import { BaseResponse } from "@/app/shared/types/base-response.type";
import Form from "./form";
import { useToast } from "@/app/shared/hooks/toast.hook";
import { BookStatusType } from "@/app/shared/types/book-status.type";
import { BookCategoryType } from "@/app/shared/types/book-category.type";
import { CreateUpdateBookType } from "../types/create-update-book.type";
import Filters from "@/app/(pages)/(private)/books/shared/components/filters";

type TableProps = {
  page: string;
  data: ListPageResponse<BookType[]>;
  currentQuery?: string;
  bookStatuses: BookStatusType[];
  bookCategories: BookCategoryType[];
};
export default function Table({
  page,
  data,
  bookStatuses,
  bookCategories,
  currentQuery,
}: TableProps) {
  const { showSuccess } = useToast();
  const [itemSelected, setItemSelected] = useState<BookType | null>(null);
  const session = useSession();

  const { remove, create, update } = BaseApi("books", session?.data);
  const router = useRouter();
  const [editModal, setEditModal] = useState(false);

  const getSeverity = (item: BookType) => {
    switch (item.bookStatusId) {
      case 1:
        return "success";

      case 2:
        return "warning";

      case 3:
        return "danger";

      default:
        return null;
    }
  };
  const getStatusName = (item: BookType) => {
    const status = bookStatuses.find((el) => el.id === item.bookStatusId);
    return status?.name ?? null;
  };
  const handleRemoveItem = async (userId: number) => {
    await remove<BaseResponse>(userId);
    router.refresh();
  };
  const handleCreate = async (payload: CreateUpdateBookType) => {
    const res = await create<CreateUpdateBookType, BaseResponse>(payload);
    if (res.success) {
      setEditModal(false);
      showSuccess("Created successfully");
      router.push(page);
    }
  };
  const handleUpdate = async (id: number, payload: CreateUpdateBookType) => {
    const res = await update<CreateUpdateBookType, BaseResponse>(payload, id);
    if (res.success) {
      router.refresh();
      setEditModal(false);
      showSuccess("Updated successfully");
    }
  };
  const statusBodyTemplate = (item: BookType) => {
    return <Tag value={getStatusName(item)} severity={getSeverity(item)}></Tag>;
  };
  const categoryBodyTemplate = (item: BookType) => {
    const category = bookCategories.find((el) => el.id === item.bookCategoryId);
    return category?.name ?? "";
  };
  const actionsTemplate = (item: BookType) => {
    return (
      <TableActions
        item={item}
        onRemove={handleRemoveItem}
        onEdit={handleEdit}
      />
    );
  };
  const handleEdit = (item: BookType) => {
    setItemSelected(item);
    setEditModal(true);
  };

  const onPage = (event: DataTablePageEvent) => {
    const newPage = Number(event.first) / ITEMS_PER_PAGE + 1;
    router.replace(
      currentQuery
        ? `/${page}?p=${newPage}&query=${currentQuery}`
        : `/${page}?p=${newPage}`,
      {}
    );
  };
  const handleOpenCreateModal = () => {
    setItemSelected(null);
    setEditModal(true);
  };
  return (
    <>
      <Filters
        onCreate={handleOpenCreateModal}
        bookStatuses={bookStatuses}
        currentQuery={currentQuery}
        page={page}
      />
      <DataTable
        lazy
        value={data.data}
        tableStyle={{ width: "100%" }}
        paginator
        rows={5}
        first={data.start}
        onPage={onPage}
        loading={false}
        totalRecords={data.length}
        emptyMessage="No results found."
      >
        <Column field="id" header="Id"></Column>
        <Column field="title" header="Title"></Column>
        <Column field="author" header="Author"></Column>
        <Column header="Category" body={categoryBodyTemplate}></Column>
        <Column header="Status" body={statusBodyTemplate}></Column>

        <Column
          headerStyle={{ width: "15rem", textAlign: "center" }}
          bodyStyle={{
            textAlign: "center",
            overflow: "visible",
          }}
          body={actionsTemplate}
        />
      </DataTable>

      {editModal ? (
        <Form
          visible={editModal}
          setVisible={(val) => setEditModal(val)}
          onCreate={handleCreate}
          onUpdate={handleUpdate}
          item={itemSelected}
          bookStatuses={bookStatuses}
          bookCategories={bookCategories}
        />
      ) : null}
    </>
  );
}
