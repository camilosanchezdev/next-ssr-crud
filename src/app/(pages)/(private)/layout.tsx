import Header from "@/app/shared/components/layout/header";
import Sidebar from "@/app/shared/components/layout/sidebar";
import ProtectedProvider from "@/app/shared/providers/protected.provider";
import { NextAuthProvider } from "@/app/shared/providers/auth.provider";
import { ToastContextProvider } from "../../shared/contexts/toast.context";
import ReduxProvider from "../../shared/providers/redux.provider";

type PrivateLayoutProps = {
  children: React.ReactNode;
};

export default function PrivateLayout({ children }: PrivateLayoutProps) {
  return (
    <NextAuthProvider>
      <ReduxProvider>
        <ProtectedProvider>
          <ToastContextProvider>
            <div className="min-h-screen grid grid-cols-12 bg-gray-100">
              <Sidebar />
              <div className="col-span-10">
                <Header />
                {children}
              </div>
            </div>
          </ToastContextProvider>
        </ProtectedProvider>
      </ReduxProvider>
    </NextAuthProvider>
  );
}
