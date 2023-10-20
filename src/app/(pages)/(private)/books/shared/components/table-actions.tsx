"use client";

import { Button } from "primereact/button";
import { ConfirmDialog } from "primereact/confirmdialog";
import { useState } from "react";

import { BookType } from "@/app/shared/types/book.type";

type TableActionsProps = {
  item: BookType;
  onRemove: (itemId: number) => void;
  onEdit: (item: BookType) => void;
};
export default function TableActions({
  item,
  onRemove,
  onEdit,
}: TableActionsProps) {
  const [removeModal, setRemoveModal] = useState(false);

  const handleRemoveItem = (result: boolean) => {
    if (result) {
      onRemove(item.id);
    }
    setRemoveModal(false);
  };
  return (
    <div className="flex gap-5">
      <Button
        type="button"
        icon="pi pi-pencil"
        rounded
        className="bg-blue-400 hover:bg-blue-500 text-white"
        tooltip="Edit"
        onClick={() => onEdit(item)}
      ></Button>
      <Button
        type="button"
        icon="pi pi-times"
        rounded
        className="bg-red-400 hover:bg-red-500 text-white"
        tooltip="Remove"
        severity="danger"
        onClick={() => setRemoveModal(true)}
      ></Button>
      {removeModal ? (
        <ConfirmDialog
          onHide={() => setRemoveModal(false)}
          header="Remove book"
          message="Do you want to remove this book?"
          visible={removeModal}
          draggable={false}
          style={{ width: "25vw" }}
          icon="pi pi-ban"
          footer={
            <div className="flex gap-2 justify-end">
              <Button
                type="button"
                label="No"
                className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 w-24"
                onClick={() => handleRemoveItem(false)}
              ></Button>
              <Button
                type="button"
                label="Yes"
                className="bg-red-400 hover:bg-red-500 text-white px-4 py-2 w-24"
                severity="danger"
                onClick={() => handleRemoveItem(true)}
              ></Button>
            </div>
          }
        />
      ) : null}
    </div>
  );
}
