// app/(public)/contact/page.tsx
export const metadata = { title: "Liên hệ" };

export default function ContactPage() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-12">
      <h1 className="text-3xl font-bold">Liên hệ</h1>
      <p className="text-gray-600 mt-2">Câu hỏi, hợp tác hay góp ý? Hãy nhắn cho chúng tôi.</p>

      <div className="mt-8 grid gap-8 md:grid-cols-2">
        <form className="rounded-2xl border p-6 space-y-4">
          <div>
            <label className="text-sm text-gray-700">Họ tên</label>
            <input className="mt-1 w-full rounded-lg border px-3 py-2" placeholder="Tên của bạn" />
          </div>
          <div>
            <label className="text-sm text-gray-700">Email</label>
            <input type="email" className="mt-1 w-full rounded-lg border px-3 py-2" placeholder="ban@example.com" />
          </div>
          <div>
            <label className="text-sm text-gray-700">Nội dung</label>
            <textarea className="mt-1 w-full rounded-lg border px-3 py-2 min-h-28" placeholder="Bạn cần hỗ trợ gì?" />
          </div>
          <button type="button" className="rounded-lg bg-black text-white px-4 py-2">Gửi</button>
          <p className="text-xs text-gray-500">Form tĩnh. Kết nối API sau.</p>
        </form>

        <div className="rounded-2xl border p-6">
          <div className="font-medium">Kênh khác</div>
          <ul className="mt-3 space-y-2 text-sm text-gray-700">
            <li>Email: <a className="hover:underline" href="mailto:htdung.vnn@gmail.com">htdung.vnn@gmail.com</a></li>
            <li>Điện thoại: <a className="hover:underline" href="tel:+84000000000">+84 37 916 8865</a></li>
            <li>Facebook: <a className="hover:underline" href="#">https://www.facebook.com/htdung.vnn/</a></li>
          </ul>
        </div>
      </div>
    </section>
  );
}