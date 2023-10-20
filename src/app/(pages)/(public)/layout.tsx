import { NextAuthProvider } from "@/app/shared/providers/auth.provider";
import ReduxProvider from "../../shared/providers/redux.provider";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <NextAuthProvider>
      <ReduxProvider>
        <div className="min-h-screen">{children}</div>
      </ReduxProvider>
    </NextAuthProvider>
  );
}
