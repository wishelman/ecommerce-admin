import { useAuth } from '../../context/AuthContext';

export default function Navbar() {
  const { admin } = useAuth();
  return (
    <header className="bg-white shadow px-6 py-4 flex justify-between items-center">
      <h1 className="text-lg font-semibold text-slate-700">Admin Panel</h1>
      <div className="text-sm text-slate-600">{admin?.email}</div>
    </header>
  );
}
