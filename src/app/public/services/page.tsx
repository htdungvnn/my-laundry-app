// app/(public)/services/page.tsx
export const metadata = { title: "Dịch vụ" };

const services = [
  { title: "Giặt & Gấp", desc: "Phù hợp đồ hằng ngày. Phân loại, giặt, sấy, gấp gọn." },
  { title: "Giặt khô", desc: "Trang phục cao cấp/nhạy cảm, xử lý bằng dung môi chuyên dụng." },
  { title: "Ủi/ép", desc: "Phẳng phiu cho áo sơ mi, quần tây và nhiều hơn." },
  { title: "Xử lý vết bẩn", desc: "Tiền xử lý nhắm mục tiêu cho vết bẩn cứng đầu." },
  { title: "Nhận & giao tận nơi", desc: "Tận cửa trong khu vực phục vụ." },
];

export default function ServicesPage() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-12">
      <h1 className="text-3xl font-bold">Dịch vụ của chúng tôi</h1>
      <p className="text-gray-600 mt-2">Cho người bận rộn: đáng tin cậy, tiết kiệm và nhanh.</p>
      <div className="grid gap-6 md:grid-cols-2 mt-8">
        {services.map((s) => (
          <div key={s.title} className="rounded-2xl border p-6">
            <div className="font-semibold">{s.title}</div>
            <p className="text-gray-600 text-sm mt-1">{s.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}