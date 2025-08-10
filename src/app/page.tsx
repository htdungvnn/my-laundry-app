// app/(public)/page.tsx
import Link from "next/link";

export default function LandingPage() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-16">
      <div className="grid gap-10 md:grid-cols-2 md:items-center">
        <div>
          <h1 className="text-4xl font-bold tracking-tight">
            Giặt sấy & giặt khô, nhận và giao tận cửa nhà bạn
          </h1>
          <p className="mt-4 text-gray-600">
            Đặt lịch trong vài phút. Chúng tôi nhận đồ, giặt sạch, gấp gọn và giao lại trong 24–48 giờ.
          </p>
          <div className="mt-6 flex gap-3">
            <Link href="/public/pricing" className="rounded-xl bg-black text-white px-5 py-3">Xem bảng giá</Link>
            <Link href="/public/services" className="rounded-xl border px-5 py-3">Dịch vụ</Link>
          </div>
          <p className="mt-4 text-xs text-gray-500">Hiện phục vụ một số quận tại TP.HCM.</p>
        </div>
        <div className="aspect-video rounded-2xl bg-gray-100" />
      </div>

      <div className="mt-16 grid gap-6 md:grid-cols-3">
        {[
          { title: "Nhanh chóng", desc: "Hoàn tất 24–48 giờ cho hầu hết đơn." },
          { title: "Minh bạch giá", desc: "Biết giá trước khi đặt. Không phụ phí bất ngờ." },
          { title: "Thân thiện môi trường", desc: "Máy giặt hiệu suất cao & chất tẩy rửa an toàn." },
        ].map((f) => (
          <div key={f.title} className="rounded-2xl border p-6">
            <div className="font-semibold">{f.title}</div>
            <p className="text-gray-600 text-sm mt-1">{f.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}