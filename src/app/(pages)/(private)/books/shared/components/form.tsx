"use client";

import { useEffect } from "react";
import { Dialog } from "primereact/dialog";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";

import Button from "@/app/shared/components/ui/button/Button";
import { BookType } from "@/app/shared/types/book.type";
import { BookStatusType } from "@/app/shared/types/book-status.type";
import { BookCategoryType } from "@/app/shared/types/book-category.type";
import { CreateUpdateBookType } from "../types/create-update-book.type";

type FormProps = {
  visible: boolean;
  item: BookType | null;
  bookStatuses: BookStatusType[];
  bookCategories: BookCategoryType[];
  setVisible: (val: boolean) => void;
  onCreate: (payload: CreateUpdateBookType) => void;
  onUpdate: (id: number, payload: CreateUpdateBookType) => void;
};
export default function Form({
  visible,
  item,
  bookStatuses,
  bookCategories,
  setVisible,
  onCreate,
  onUpdate,
}: FormProps) {
  const { control, reset, register, handleSubmit } =
    useForm<CreateUpdateBookType>({
      defaultValues: {
        title: "",
        author: "",
        bookCategoryId: undefined,
        bookStatusId: undefined,
      },
    });

  const onSubmit: SubmitHandler<CreateUpdateBookType> = async (form) => {
    if (!item) {
      onCreate(form);
    } else {
      onUpdate(item.id, form);
    }
  };
  useEffect(() => {
    if (item) {
      reset(item);
    }
  }, [item, reset]);

  return (
    <div className="flex w-full justify-end items-end gap-2 flex-col">
      <div className="card flex justify-content-center">
        <Dialog
          draggable={false}
          closeOnEscape
          header={item ? "Edit" : "Create"}
          visible={visible}
          style={{ width: "25vw" }}
          onHide={() => setVisible(false)}
        >
          <form className="" onSubmit={handleSubmit(onSubmit)}>
            <div className="w-full flex flex-col my-4">
              <InputText
                id="title"
                type="text"
                placeholder="Title"
                className="border-b focus:outline-0 w-full py-4 focus:border-gray-400 focus:shadow-none"
                {...register("title", { required: true })}
              />
            </div>
            <div className="w-full flex flex-col my-4">
              <InputText
                id="author"
                type="text"
                placeholder="Author"
                className="border-b focus:outline-0 w-full py-4 focus:border-gray-400 focus:shadow-none"
                {...register("author", { required: true })}
              />
            </div>
            <div className="card flex justify-content-center border-b pb-4">
              <Controller
                name="bookStatusId"
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange } }) => (
                  <Dropdown
                    value={value}
                    options={bookStatuses}
                    optionValue="id"
                    optionLabel="name"
                    className="w-full md:w-14rem"
                    placeholder="Select a status"
                    onChange={(e) => onChange(e.value)}
                  />
                )}
              />
            </div>
            <div className="card flex justify-content-center border-b py-4">
              <Controller
                name="bookCategoryId"
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange } }) => (
                  <Dropdown
                    value={value}
                    options={bookCategories}
                    optionValue="id"
                    optionLabel="name"
                    className="w-full md:w-14rem"
                    placeholder="Select a role"
                    onChange={(e) => onChange(e.value)}
                  />
                )}
              />
            </div>

            <div className="flex items-center w-full gap-4 pt-8">
              <Button
                type="button"
                label="Cancel"
                className="bg-gray-500 hover:bg-gray-600 active:bg-gray-700 text-white px-4 py-2 rounded-lg w-full font-semibold"
                onClick={() => setVisible(false)}
              />
              <Button
                type="submit"
                label="Save"
                className="bg-green-500 hover:bg-green-600 active:bg-green-700 text-white px-4 py-2 rounded-lg w-full font-semibold"
              />
            </div>
          </form>
        </Dialog>
      </div>
    </div>
  );
}
