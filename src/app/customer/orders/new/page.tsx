// src/app/(customer)/order/new/page.tsx
"use client";

import { supabase } from "@/lib/supabaseClient";
import { useEffect, useState } from "react";

type Service = { id: string; name: string; unit: string; price: number; eta: string };

export default function OrderNewPage() {
  const [step, setStep] = useState(1);
  const [services, setServices] = useState<Service[]>([]);
  const [cart, setCart] = useState<{ service_id: string; qty: number; price: number }[]>([]);
  const [addressId, setAddressId] = useState<string | null>(null);
  const [note, setNote] = useState("");

  useEffect(() => {
    const run = async () => {
      // load active services (public read)
      const { data } = await supabase
        .from("services")
        .select("id, name, unit, price, eta")
        .eq("active", true)
        .order("name");
      setServices((data ?? []) as Service[]);
    };
    run();
  }, []);

  function addToCart(s: Service) {
    setCart((prev) => {
      const found = prev.find(x => x.service_id === s.id);
      if (found) return prev.map(x => x.service_id === s.id ? { ...x, qty: x.qty + 1 } : x);
      return [...prev, { service_id: s.id, qty: 1, price: s.price }];
    });
  }

  async function confirmOrder() {
    const { data: sess } = await supabase.auth.getSession();
    const userId = sess.session?.user?.id;
    if (!userId) return alert("Bạn cần đăng nhập.");

    if (!cart.length) return alert("Chưa chọn dịch vụ.");
    if (!addressId) return alert("Chưa chọn địa chỉ.");

    // Create draft order -> items
    const { data: order, error } = await supabase
      .from("orders")
      .insert({
        customer_id: userId, // theo BE của bạn
        status: "draft",
        note,
        total_amount: cart.reduce((s, i) => s + i.qty * (i.price ?? 0), 0),
      })
      .select()
      .single();

    if (error) return alert(error.message);

    const itemsPayload = cart.map(i => ({
      order_id: order.id,
      service_id: i.service_id,
      qty: i.qty,
      price: i.price,
      amount: i.qty * i.price,
    }));

    const { error: itErr } = await supabase.from("order_items").insert(itemsPayload);
    if (itErr) return alert(itErr.message);

    // Next step: redirect to detail to thanh toán / xác nhận
    window.location.href = `/order/${order.code ?? order.id}`;
  }

  return (
    <section className="mx-auto max-w-4xl px-4 py-8">
      <h1 className="text-2xl font-bold">Tạo đơn mới</h1>
      <p className="text-gray-600 mt-1">Chọn dịch vụ, địa chỉ và xác nhận.</p>

      <div className="mt-6 flex items-center gap-2 text-sm">
        <Step n={1} label="Dịch vụ" active={step === 1} onClick={() => setStep(1)} />
        <span>—</span>
        <Step n={2} label="Địa chỉ" active={step === 2} onClick={() => setStep(2)} />
        <span>—</span>
        <Step n={3} label="Xác nhận" active={step === 3} onClick={() => setStep(3)} />
      </div>

      {step === 1 && (
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {services.map(s => (
            <div key={s.id} className="rounded-2xl border p-4">
              <div className="font-medium">{s.name}</div>
              <div className="text-sm text-gray-600">{s.unit} — {s.price.toLocaleString()}₫</div>
              <div className="text-xs text-gray-500">ETA: {s.eta}</div>
              <button onClick={() => addToCart(s)} className="mt-3 rounded-lg border px-3 py-1.5 text-sm">Thêm</button>
            </div>
          ))}
          {!services.length && <div>Chưa có dịch vụ hoạt động.</div>}
          <div className="md:col-span-2 mt-2">
            <div className="text-sm font-medium">Giỏ dịch vụ</div>
            <ul className="mt-2 space-y-1 text-sm">
              {cart.map(i => {
                const s = services.find(x => x.id === i.service_id);
                return <li key={i.service_id} className="flex justify-between rounded border px-3 py-2">
                  <span>{s?.name} × {i.qty}</span>
                  <span>{(i.qty * i.price).toLocaleString()}₫</span>
                </li>;
              })}
            </ul>
            <div className="mt-3 flex gap-2">
              <button className="rounded-lg border px-3 py-1.5 text-sm" onClick={() => setStep(2)}>Tiếp tục</button>
            </div>
          </div>
        </div>
      )}

      {step === 2 && <SelectAddress onSelected={(id) => { setAddressId(id); setStep(3); }} />}

      {step === 3 && (
        <div className="mt-6 space-y-4">
          <div className="rounded-2xl border p-4">
            <div className="font-medium">Ghi chú cho cửa hàng</div>
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              className="mt-2 w-full rounded-lg border px-3 py-2 min-h-28"
              placeholder="Ví dụ: quần kaki vết bẩn ở gối…"
            />
          </div>
          <div className="flex gap-2">
            <button onClick={confirmOrder} className="rounded-lg bg-black px-4 py-2 text-white">Xác nhận tạo đơn</button>
            <button onClick={() => setStep(2)} className="rounded-lg border px-4 py-2">Quay lại</button>
          </div>
        </div>
      )}
    </section>
  );
}

function Step({ n, label, active, onClick }: { n: number; label: string; active: boolean; onClick(): void }) {
  return (
    <button onClick={onClick} className={`rounded-full px-3 py-1 ${active ? "bg-black text-white" : "border"}`}>
      {n}. {label}
    </button>
  );
}

function SelectAddress({ onSelected }: { onSelected(id: string): void }) {
  const [items, setItems] = useState<any[]>([]);
  useEffect(() => {
    const run = async () => {
      const { data: sess } = await supabase.auth.getSession();
      const userId = sess.session?.user?.id;
      const { data } = await supabase.from("addresses").select("*").eq("user_id", userId).order("is_default", { ascending: false });
      setItems(data ?? []);
    };
    run();
  }, []);
  return (
    <div className="mt-6">
      <div className="text-sm font-medium">Chọn địa chỉ nhận đồ</div>
      <div className="mt-3 grid gap-3 md:grid-cols-2">
        {items.map(a => (
          <button key={a.id} onClick={() => onSelected(a.id)} className="rounded-2xl border p-4 text-left hover:bg-gray-50">
            <div className="font-medium">{a.line1}</div>
            <div className="text-sm text-gray-600">{[a.ward, a.district, a.city].filter(Boolean).join(", ")}</div>
            {a.is_default && <div className="mt-1 inline-block rounded bg-green-100 px-2 py-0.5 text-xs text-green-700">Mặc định</div>}
          </button>
        ))}
        {!items.length && <div>Bạn chưa có địa chỉ. <a className="underline" href="/addresses/new">Thêm địa chỉ</a></div>}
      </div>
    </div>
  );
}