"use client";
import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabaseClient';

interface Order {
  id: string;
  service_type: string;
  pick_up_date: string;
  delivery_date: string;
  address: string;
  price: number;
  status: string;
}

export default function Orders() {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    const fetchOrders = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });
      if (data) setOrders(data as Order[]);
    };
    fetchOrders();
  }, []);

  return (
    <div>
      <h2>Đơn hàng của bạn</h2>
      <ul>
        {orders.map((o) => (
          <li key={o.id}>
            <b>{o.service_type}</b> | {o.pick_up_date} → {o.delivery_date} | <b>{o.status}</b> | {o.price}₫<br />
            Địa chỉ: {o.address}
          </li>
        ))}
      </ul>
    </div>
  );
}