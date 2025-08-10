// app/(public)/coverage/page.tsx
export const metadata = { title: "Khu vực" };

const zones = [
  { district: "Quận 1", eta: "24–48 giờ", minOrder: "100.000₫" },
  { district: "Quận 3", eta: "24–48 giờ", minOrder: "100.000₫" },
  { district: "Phú Nhuận", eta: "24–48 giờ", minOrder: "120.000₫" },
  { district: "Bình Thạnh", eta: "24–48 giờ", minOrder: "120.000₫" },
];

export default function CoveragePage() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-12">
      <h1 className="text-3xl font-bold">Khu vực phục vụ</h1>
      <p className="text-gray-600 mt-2">Chúng tôi đang mở rộng trên địa bàn TP.HCM.</p>
      <div className="mt-8 grid gap-4 md:grid-cols-2">
        {zones.map((z) => (
          <div key={z.district} className="rounded-2xl border p-6">
            <div className="font-semibold">{z.district}</div>
            <div className="text-sm text-gray-600 mt-1">Thời gian: {z.eta}</div>
            <div className="text-sm text-gray-600">Đơn tối thiểu: {z.minOrder}</div>
          </div>
        ))}
      </div>
      <div className="mt-8 rounded-2xl border p-6">
        <div className="font-medium">Chưa có khu vực của bạn?</div>
        <p className="text-sm text-gray-600 mt-1">Hãy cho chúng tôi biết quận/huyện để thông báo khi mở dịch vụ.</p>
      </div>
    </section>
  );
}