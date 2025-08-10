// src/app/(customer)/dashboard/page.tsx
"use client";

import { supabase } from "@/lib/supabaseClient";
import { useEffect, useState } from "react";

export default function CustomerDashboardPage() {
  const [counts, setCounts] = useState<{ total?: number; active?: number }>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const run = async () => {
      setLoading(true);
      const { data: sess } = await supabase.auth.getSession();
      const userId = sess.session?.user?.id;
      if (!userId) return setLoading(false);

      // Demo: đếm đơn của user (giả sử orders có customer_user_id)
      const { data: totalRows } = await supabase
        .from("orders")
        .select("id", { count: "exact", head: true })
        .eq("customer_id", userId);

      const { data: activeRows } = await supabase
        .from("orders")
        .select("id", { count: "exact", head: true })
        .eq("customer_id", userId)
        .in("status", ["pending_payment", "paid", "assigned", "picked_up", "processing", "ready", "out_for_delivery"]);

      setCounts({ total: totalRows?.length ?? totalRows as any, active: activeRows?.length ?? activeRows as any });
      setLoading(false);
    };
    run();
  }, []);

  return (
    <section className="mx-auto max-w-5xl px-4 py-8">
      <h1 className="text-2xl font-bold">Tổng quan</h1>
      <p className="text-gray-600 mt-1">Tình trạng tài khoản & đơn hàng gần đây.</p>

      <div className="mt-6 grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl border p-6">
          <div className="text-sm text-gray-600">Tổng số đơn</div>
          <div className="text-3xl font-semibold">{loading ? "…" : counts.total ?? 0}</div>
        </div>
        <div className="rounded-2xl border p-6">
          <div className="text-sm text-gray-600">Đơn đang xử lý</div>
          <div className="text-3xl font-semibold">{loading ? "…" : counts.active ?? 0}</div>
        </div>
        <div className="rounded-2xl border p-6">
          <div className="text-sm text-gray-600">Số dư ví</div>
          <WalletBalance />
        </div>
      </div>
    </section>
  );
}

function WalletBalance() {
  const [balance, setBalance] = useState<number | null>(null);

  useEffect(() => {
    const run = async () => {
      const { data: sess } = await supabase.auth.getSession();
      const userId = sess.session?.user?.id;
      if (!userId) return setBalance(0);
      // Giả định có bảng wallet_balances { user_id, amount }
      const { data } = await supabase
        .from("wallet_balances")
        .select("amount")
        .eq("user_id", userId)
        .single();
      setBalance(data?.amount ?? 0);
    };
    run();
  }, []);

  return <div className="text-3xl font-semibold">{balance === null ? "…" : `${balance.toLocaleString()}₫`}</div>;
}