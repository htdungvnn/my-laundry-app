// src/app/(customer)/layout.tsx
"use client";

import LogoutButton from "@/components/LogoutButton";
import { useAuthRedirect } from "@/lib/useAuthRedirect";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function CustomerLayout({ children }: { children: React.ReactNode }) {
  // guard: if NOT logged in -> /login
  useAuthRedirect({ when: "unauthenticated", redirectTo: "/login" });

  const pathname = usePathname();
  const nav = [
    { href: "/dashboard", label: "Tổng quan" },
    { href: "/orders", label: "Đơn hàng" },
    { href: "/order/new", label: "Tạo đơn" },
    { href: "/addresses", label: "Địa chỉ" },
    { href: "/wallet", label: "Ví" },
    { href: "/promos", label: "Khuyến mãi" },
    { href: "/profile", label: "Hồ sơ" },
  ];

  return (
    <div className="min-h-dvh grid md:grid-cols-[240px_1fr]">
      <aside className="border-r bg-gray-50">
        <div className="p-4">
          <Link href="/" className="font-semibold">Dịch vụ Giặt Là</Link>
        </div>
        <nav className="px-2 pb-4 space-y-1">
          {nav.map((i) => {
            const active = pathname === i.href;
            return (
              <Link
                key={i.href}
                href={i.href}
                className={`block rounded-lg px-3 py-2 text-sm ${
                  active ? "bg-black text-white" : "hover:bg-gray-100"
                }`}
              >
                {i.label}
              </Link>
            );
          })}
          <div className="px-2 pt-2">
            <LogoutButton className="w-full rounded-lg border px-3 py-2 text-sm" />
          </div>
        </nav>
      </aside>
      <main className="min-h-dvh">{children}</main>
    </div>
  );
}