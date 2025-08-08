"use client";
import { useState } from 'react';
import { supabase } from '../../lib/supabaseClient';

export default function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    const { error } = await supabase.auth.signUp({ email, password });
    if (error) alert(error.message);
    else alert('Vui lòng kiểm tra email để xác nhận!');
  };

  return (
    <form onSubmit={handleSignup}>
      <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" required />
      <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Mật khẩu" required />
      <button type="submit">Đăng ký</button>
    </form>
  );
}