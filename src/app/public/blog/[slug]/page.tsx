// app/(public)/blog/[slug]/page.tsx
import { notFound } from "next/navigation";

type Post = { slug: string; title: string; date: string; content: string };

const POSTS: Post[] = [
  {
    slug: "meo-giat-giu-nhanh",
    title: "Mẹo giặt giũ: Khởi đầu nhanh",
    date: "2025-08-01",
    content:
      "Phân loại theo màu & chất liệu. Dùng lượng bột giặt vừa đủ. Không nhồi quá nhiều. Sấy nhiệt thấp để bảo vệ sợi vải.",
  },
  {
    slug: "quy-trinh-ve-sinh",
    title: "Quy trình vệ sinh của chúng tôi",
    date: "2025-07-12",
    content:
      "Chúng tôi kết hợp máy công nghiệp, chất tẩy được hiệu chuẩn và các bước QA nghiêm ngặt để luôn mang lại kết quả đồng nhất.",
  },
];

export function generateStaticParams() {
  return POSTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const post = POSTS.find((p) => p.slug === params.slug);
  return { title: post ? post.title : "Bài viết" };
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = POSTS.find((p) => p.slug === params.slug);
  if (!post) return notFound();

  return (
    <article className="mx-auto max-w-3xl px-4 py-12">
      <div className="text-sm text-gray-500">{new Date(post.date).toLocaleDateString("vi-VN")}</div>
      <h1 className="text-3xl font-bold mt-1">{post.title}</h1>
      <div className="prose prose-neutral mt-6">
        <p>{post.content}</p>
      </div>
    </article>
  );
}