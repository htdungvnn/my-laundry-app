// app/(public)/blog/page.tsx
import Link from "next/link";

export const metadata = { title: "Blog" };

const posts = [
  { slug: "meo-giat-giu-nhanh", title: "Mẹo giặt giũ: Khởi đầu nhanh", excerpt: "Vài quy tắc đơn giản để quần áo luôn thơm tho.", date: "2025-08-01" },
  { slug: "quy-trinh-ve-sinh", title: "Quy trình vệ sinh của chúng tôi", excerpt: "Bên trong cơ sở giặt là và kiểm soát chất lượng.", date: "2025-07-12" },
];

export default function BlogIndexPage() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-12">
      <h1 className="text-3xl font-bold">Blog</h1>
      <div className="mt-8 grid gap-6 md:grid-cols-2">
        {posts.map((p) => (
          <Link key={p.slug} href={`/blog/${p.slug}`} className="rounded-2xl border p-6 hover:bg-gray-50">
            <div className="text-sm text-gray-500">{new Date(p.date).toLocaleDateString("vi-VN")}</div>
            <div className="mt-1 font-semibold">{p.title}</div>
            <p className="text-gray-600 text-sm mt-1">{p.excerpt}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}