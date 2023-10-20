"use client";

import { Toast } from "primereact/toast";
import { createContext, createRef, useRef } from "react";

type Props = {
  children?: React.ReactNode;
};

export const ToastContextProvider = ({ children }: Props) => {
  const toastRef = useRef<Toast>(null);

  return (
    <ToastContext.Provider value={{ toastRef }}>
      {children}
      <Toast baseZIndex={3005} ref={toastRef} />
    </ToastContext.Provider>
  );
};

export const ToastContext = createContext({
  toastRef: createRef<Toast>(),
});
