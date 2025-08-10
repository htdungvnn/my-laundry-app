// app/(public)/about/page.tsx
export const metadata = { title: "Về chúng tôi" };

export default function AboutPage() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-12">
      <h1 className="text-3xl font-bold">Về Dịch vụ Giặt Là</h1>
      <p className="text-gray-600 mt-2">
        Sứ mệnh của chúng tôi là giúp bạn không còn bận tâm chuyện giặt giũ. Đội ngũ địa phương,
        máy móc chuyên nghiệp, hóa chất thân thiện môi trường.
      </p>
      <div className="mt-8 grid gap-6 md:grid-cols-3">
        {[
          { k: "Thành lập", v: "2025" },
          { k: "Đơn đã hoàn tất", v: "10.000+" },
          { k: "Đánh giá trung bình", v: "4,8/5" },
        ].map((i) => (
          <div key={i.k} className="rounded-2xl border p-6">
            <div className="text-sm text-gray-600">{i.k}</div>
            <div className="text-2xl font-semibold">{i.v}</div>
          </div>
        ))}
      </div>
    </section>
  );
}