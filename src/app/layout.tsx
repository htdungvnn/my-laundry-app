// app/(public)/layout.tsx
import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: { default: "Dịch vụ Giặt Là", template: "%s | Dịch vụ Giặt Là" },
  description: "Giặt sấy & giặt khô theo yêu cầu, nhận và giao tận nơi.",
};

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
     <html lang="vi">
      <body className="min-h-dvh flex flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}

function Header() {
  return (
    <header className="sticky top-0 z-40 border-b bg-white/70 backdrop-blur">
      <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
        <Link href="/" className="font-semibold tracking-tight text-xl">Dịch vụ Giặt Là</Link>
        <nav className="hidden md:flex items-center gap-6 text-sm">
          <Link href="/public/services" className="hover:underline">Dịch vụ</Link>
          <Link href="/public/pricing" className="hover:underline">Bảng giá</Link>
          <Link href="/public/coverage" className="hover:underline">Khu vực</Link>
          <Link href="/public/about" className="hover:underline">Về chúng tôi</Link>
          <Link href="/public/blog" className="hover:underline">Blog</Link>
          <Link href="/public/faq" className="hover:underline">Hỏi đáp</Link>
          <Link href="/public/contact" className="rounded-lg border px-3 py-1.5 hover:bg-gray-50">Liên hệ</Link>
        </nav>
        <div className="md:hidden">
          <Link href="/public/contact" className="rounded-lg border px-3 py-1.5 text-sm">Liên hệ</Link>
        </div>
      </div>
    </header>
  );
}

function Footer() {
  return (
    <footer className="border-t">
      <div className="mx-auto max-w-6xl px-4 py-10 grid gap-6 md:grid-cols-3 text-sm">
        <div>
          <div className="font-semibold">Dịch vụ Giặt Là</div>
          <p className="text-gray-600 mt-2">Quần áo thơm tho, không còn phiền toái.</p>
        </div>
        <div className="space-y-2">
          <div className="font-medium">Công ty</div>
          <ul className="text-gray-600 space-y-1">
            <li><Link href="/public/about" className="hover:underline">Về chúng tôi</Link></li>
            <li><Link href="/public/coverage" className="hover:underline">Khu vực phục vụ</Link></li>
            <li><Link href="/public/blog" className="hover:underline">Blog</Link></li>
            <li><Link href="/public/faq" className="hover:underline">Hỏi đáp</Link></li>
          </ul>
        </div>
        <div className="space-y-2">
          <div className="font-medium">Liên hệ</div>
          <ul className="text-gray-600 space-y-1">
            <li><a href="/publicmailto:htdung.vnn@gmail.com" className="hover:underline">htdung.vnn@gmail.com</a></li>
            <li><a href="/publictel:+843789168865" className="hover:underline">+84 37 916 8865</a></li>
          </ul>
        </div>
      </div>
      <div className="text-center text-xs text-gray-500 pb-6">© {new Date().getFullYear()} Dịch vụ Giặt Là</div>
    </footer>
  );
}