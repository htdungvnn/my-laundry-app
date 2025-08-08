"use client";

import { useState } from 'react';
import { supabase } from '../../lib/supabaseClient';

export default function CreateOrder() {
  const [service, setService] = useState('');
  const [pickDate, setPickDate] = useState('');
  const [deliveryDate, setDeliveryDate] = useState('');
  const [address, setAddress] = useState('');
  const [price, setPrice] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
      alert('Vui lòng đăng nhập lại!');
      return;
    }
    const { error } = await supabase.from('orders').insert([
      {
        user_id: user.id,
        service_type: service,
        pick_up_date: pickDate,
        delivery_date: deliveryDate,
        address,
        price: Number(price),
        status: 'pending',
      },
    ]);
    if (error) alert(error.message);
    else alert('Tạo đơn thành công!');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input value={service} onChange={e => setService(e.target.value)} placeholder="Loại dịch vụ" required />
      <input type="date" value={pickDate} onChange={e => setPickDate(e.target.value)} required />
      <input type="date" value={deliveryDate} onChange={e => setDeliveryDate(e.target.value)} required />
      <input value={address} onChange={e => setAddress(e.target.value)} placeholder="Địa chỉ" required />
      <input value={price} onChange={e => setPrice(e.target.value)} placeholder="Giá" type="number" required />
      <button type="submit">Tạo đơn</button>
    </form>
  );
}