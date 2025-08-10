// app/(public)/pricing/page.tsx
export const metadata = { title: "Bảng giá" };

const tiers = [
  { name: "Giặt & Gấp", unit: "theo kg", price: "25.000₫", eta: "24–48 giờ" },
  { name: "Giặt khô", unit: "theo món", price: "từ 50.000₫", eta: "48–72 giờ" },
  { name: "Ủi/ép", unit: "theo món", price: "từ 10.000₫", eta: "24–48 giờ" },
];

export default function PricingPage() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-12">
      <h1 className="text-3xl font-bold">Bảng giá</h1>
      <p className="text-gray-600 mt-2">Giá rõ ràng. Thanh toán khi nhận hoặc online.</p>
      <div className="grid gap-6 md:grid-cols-3 mt-8">
        {tiers.map((t) => (
          <div key={t.name} className="rounded-2xl border p-6">
            <div className="text-lg font-semibold">{t.name}</div>
            <div className="mt-3 text-2xl font-bold">{t.price}</div>
            <div className="text-sm text-gray-500">{t.unit}</div>
            <div className="mt-4 text-sm">Thời gian: {t.eta}</div>
          </div>
        ))}
      </div>
      <p className="text-xs text-gray-500 mt-6">* Giá thực tế phụ thuộc chất liệu/tình trạng.</p>
    </section>
  );
}