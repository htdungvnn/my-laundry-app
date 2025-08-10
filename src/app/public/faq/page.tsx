// app/(public)/faq/page.tsx
export const metadata = { title: "Hỏi đáp" };

const faqs = [
  { q: "Nhận đồ diễn ra thế nào?", a: "Đặt khung giờ, đưa túi đồ cho shipper, theo dõi trạng thái online." },
  { q: "Thời gian xử lý?", a: "24–48 giờ cho giặt & gấp. Giặt khô có thể 48–72 giờ." },
  { q: "Thanh toán ra sao?", a: "Tiền mặt khi giao hàng hoặc thanh toán online (sắp có)." },
];

export default function FaqPage() {
  return (
    <section className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="text-3xl font-bold">Câu hỏi thường gặp</h1>
      <div className="mt-8 space-y-4">
        {faqs.map((f) => (
          <details key={f.q} className="rounded-2xl border p-4">
            <summary className="font-medium cursor-pointer">{f.q}</summary>
            <p className="text-gray-600 mt-2">{f.a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}