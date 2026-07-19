import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-slate-600">
      <h1 className="text-4xl font-bold mb-2">404</h1>
      <p className="mb-4">Halaman tidak ditemukan</p>
      <Link to="/" className="text-primary">Kembali ke Dashboard</Link>
    </div>
  );
}
