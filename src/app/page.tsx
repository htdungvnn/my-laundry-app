import Link from 'next/link';

export default function Home() {
  return (
    <div>
      <h1>Website Giặt Là Demo</h1>
      <ul>
        <li><Link href="/signup">Đăng ký</Link></li>
        <li><Link href="/login">Đăng nhập</Link></li>
        <li><Link href="/create-order">Tạo đơn mới</Link></li>
        <li><Link href="/orders">Xem đơn hàng</Link></li>
      </ul>
    </div>
  );
}