// app/(auth)/layout.tsx
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: { default: "Đăng nhập", template: "%s | Dịch vụ Giặt Là" },
  description: "Xác thực tài khoản để đặt lịch giặt là.",
};

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-dvh grid place-items-center bg-gray-50">
      <div className="w-full max-w-md rounded-2xl border bg-white p-6 shadow-sm">
        <Link href="/" className="inline-block text-sm text-gray-500 hover:underline">
          ← Về trang chủ
        </Link>
        <div className="mt-2">{children}</div>
        <p className="mt-6 text-center text-xs text-gray-500">
          © {new Date().getFullYear()} Dịch vụ Giặt Là
        </p>
      </div>
    </div>
  );
}