// src/app/(customer)/payment/return/page.tsx
"use client";

import { supabase } from "@/lib/supabaseClient";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function PaymentReturnPage() {
  const q = useSearchParams();
  const router = useRouter();
  const [msg, setMsg] = useState("Đang xác thực thanh toán…");

  useEffect(() => {
    const run = async () => {
      // Ví dụ với VNPAY/MoMo/ZaloPay: nhận query, verify server-side là tốt nhất.
      // Ở client demo: gọi RPC/endpoint để xác thực và cập nhật payment_status.
      const paymentCode = q.get("payment_code");
      const orderCode = q.get("order_code");

      // Gợi ý: gọi Supabase Edge Function hoặc bảng "payments" để check payload.
      if (!paymentCode || !orderCode) {
        setMsg("Thiếu tham số thanh toán. Vui lòng liên hệ hỗ trợ.");
        return;
      }

      // Demo: đánh dấu paid nếu có record pending (KHÔNG dùng production).
      const { data: pay } = await supabase
        .from("payments")
        .update({ status: "paid" })
        .eq("code", paymentCode)
        .eq("status", "pending")
        .select()
        .single();

      if (pay) {
        setMsg("Thanh toán thành công! Đang chuyển về chi tiết đơn…");
        setTimeout(() => router.replace(`/order/${orderCode}`), 1200);
      } else {
        setMsg("Không thể xác nhận thanh toán. Vui lòng kiểm tra lại.");
      }
    };
    run();
  }, [q, router]);

  return (
    <div className="min-h-dvh grid place-items-center">
      <div className="rounded-2xl border p-6">
        <div className="text-lg font-semibold">{msg}</div>
      </div>
    </div>
  );
}