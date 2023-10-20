"use client";

import { useCallback, useEffect, useState } from "react";
import { Dialog } from "primereact/dialog";
import { Checkbox, CheckboxChangeEvent } from "primereact/checkbox";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

import Button from "@/app/shared/components/ui/button/Button";
import jsonToBase64 from "@/app/shared/utils/json-to-base-64.util";
import { BookStatusType } from "@/app/shared/types/book-status.type";
import { base64ToJson } from "@/app/shared/utils/base-64-to-json.util";
import { QueryCriteria } from "@/app/shared/services/base-crud.service";

interface IFormInput {}

type FiltersProps = {
  onCreate: () => void;
  bookStatuses: BookStatusType[];
  page: string;
  currentQuery?: string;
};
export default function Filters({
  onCreate,
  page,
  bookStatuses,
  currentQuery,
}: FiltersProps) {
  const router = useRouter();
  const [statusSelected, setStatusSelected] = useState<Array<any>>([]);
  const { control, handleSubmit } = useForm({});

  const [visible, setVisible] = useState<boolean>(false);

  const applyFilters = (statuses: Array<number>) => {
    const filter = {
      propertyName: "bookStatusId",
      type: "in",
      value: statuses,
    };
    const filterHash = jsonToBase64({ filters: [filter] });
    router.push(
      statuses.length > 0 ? `/${page}?query=${filterHash}` : `/${page}`
    );
  };

  const handleRemoveFilter = (statusId: number) => {
    const filters = statusSelected.filter((item) => item.id !== statusId);
    setStatusSelected(filters);
    applyFilters(filters.map((el) => el.id));
  };

  const onSubmit: SubmitHandler<IFormInput> = async (form) => {
    applyFilters(statusSelected.map((el) => el.id));
    setVisible(false);
  };
  const handleChecked = (e: CheckboxChangeEvent) => {
    if (e.checked) {
      const filter = bookStatuses.filter((el) => el.id === e.value);
      setStatusSelected([...statusSelected, ...filter]);
    } else {
      setStatusSelected(statusSelected.filter((item) => item.id !== e.value));
    }
  };

  const setFilters = useCallback(
    (filters: string) => {
      try {
        const result = base64ToJson<QueryCriteria>(filters);
        const filterIndex = result.filters.findIndex(
          (el) => el.propertyName === "bookStatusId"
        );
        if (filterIndex !== -1) {
          setStatusSelected(
            bookStatuses.filter((el) =>
              result.filters[filterIndex].value.includes(el.id)
            )
          );
        }
      } catch (error) {}
    },
    [setStatusSelected, bookStatuses]
  );

  useEffect(() => {
    if (currentQuery) {
      setFilters(currentQuery);
    }
  }, [setFilters, currentQuery]);

  return (
    <div className="flex w-full justify-end items-end gap-2 flex-col">
      <div className="flex gap-2">
        <Button
          label="filters"
          icon="pi pi-sliders-h"
          className="bg-blue-500 hover:bg-blue-600 active:bg-blue-700 text-white px-4 py-2 rounded-lg"
          onClick={() => setVisible(true)}
        />
        <Button
          label="Create"
          icon="pi pi-plus"
          severity="secondary"
          className="bg-gray-500 hover:bg-gray-600 active:bg-gray-700 text-white px-4 py-2 rounded-lg"
          onClick={() => onCreate()}
        />
      </div>

      {!visible || statusSelected.length === 0 ? (
        <div className="filters w-full flex gap-4">
          {statusSelected.map((status) => (
            <Button
              key={status.id}
              label={`Status: ${status.name}`}
              icon="pi pi-times"
              className="border-gray-200 border-2 text-gray-600 hover:text-white text-sm hover:bg-gray-600 active:bg-gray-700 px-4 py-2 rounded-lg"
              onClick={() => handleRemoveFilter(status.id)}
            />
          ))}
        </div>
      ) : null}
      <div className="card flex justify-content-center">
        <Dialog
          draggable={false}
          closeOnEscape
          dismissableMask
          header="Filter by"
          visible={visible}
          style={{ width: "25vw" }}
          onHide={() => setVisible(false)}
        >
          <form className="" onSubmit={handleSubmit(onSubmit)}>
            <h2 className="font-semibold uppercase mb-3">Status</h2>

            {bookStatuses.map((status) => (
              <div className="flex items-center mb-2" key={status.id}>
                <Controller
                  control={control}
                  name="status"
                  render={() => (
                    <Checkbox
                      inputId={status.id.toString()}
                      value={status.id}
                      className="border-2 w-6 h-6 rounded"
                      checked={statusSelected.some((el) => el.id === status.id)}
                      onChange={handleChecked}
                    />
                  )}
                />

                <label
                  htmlFor={status.id.toString()}
                  className="ml-2 cursor-pointer"
                >
                  {status.name}
                </label>
              </div>
            ))}
            <div className="flex items-center w-full mt-6">
              <Button
                type="submit"
                label="Apply filters"
                className="bg-blue-500 hover:bg-blue-600 active:bg-blue-700 text-white px-4 py-2 rounded-lg w-full font-semibold"
              />
            </div>
          </form>
        </Dialog>
      </div>
    </div>
  );
}
