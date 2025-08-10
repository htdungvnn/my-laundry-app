// src/app/(customer)/wallet/page.tsx
"use client";

import { supabase } from "@/lib/supabaseClient";
import { useEffect, useState } from "react";

export default function WalletPage() {
  const [balance, setBalance] = useState<number | null>(null);
  const [history, setHistory] = useState<any[]>([]);

  useEffect(() => {
    const run = async () => {
      const { data: sess } = await supabase.auth.getSession();
      const userId = sess.session?.user?.id;

      const { data: bal } = await supabase.from("wallet_balances").select("amount").eq("user_id", userId).single();
      setBalance(bal?.amount ?? 0);

      const { data: txs } = await supabase
        .from("payments")
        .select("id, amount, status, gateway, created_at")
        .eq("user_id", userId)
        .order("created_at", { ascending: false })
        .limit(50);
      setHistory(txs ?? []);
    };
    run();
  }, []);

  return (
    <section className="mx-auto max-w-4xl px-4 py-8">
      <h1 className="text-2xl font-bold">Ví của tôi</h1>
      <div className="mt-4 rounded-2xl border p-6">
        <div className="text-sm text-gray-600">Số dư hiện tại</div>
        <div className="text-3xl font-semibold">{balance === null ? "…" : `${balance.toLocaleString()}₫`}</div>
      </div>

      <h2 className="mt-8 text-lg font-semibold">Lịch sử giao dịch</h2>
      <div className="mt-3 rounded-2xl border overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-3 py-2 text-left">Số tiền</th>
              <th className="px-3 py-2 text-left">Cổng</th>
              <th className="px-3 py-2 text-left">Trạng thái</th>
              <th className="px-3 py-2 text-left">Thời gian</th>
            </tr>
          </thead>
          <tbody>
            {history.map(h => (
              <tr key={h.id} className="border-t">
                <td className="px-3 py-2">{(h.amount ?? 0).toLocaleString()}₫</td>
                <td className="px-3 py-2">{h.gateway}</td>
                <td className="px-3 py-2">{viPaymentStatus(h.status)}</td>
                <td className="px-3 py-2">{new Date(h.created_at).toLocaleString("vi-VN")}</td>
              </tr>
            ))}
            {!history.length && <tr><td className="px-3 py-3" colSpan={4}>Chưa có giao dịch.</td></tr>}
          </tbody>
        </table>
      </div>
    </section>
  );
}

function viPaymentStatus(s: string) {
  const map: Record<string, string> = {
    init: "Khởi tạo",
    pending: "Đang xử lý",
    authorized: "Đã uỷ quyền",
    paid: "Đã thanh toán",
    failed: "Thất bại",
    refunded: "Đã hoàn",
  };
  return map[s] ?? s;
}