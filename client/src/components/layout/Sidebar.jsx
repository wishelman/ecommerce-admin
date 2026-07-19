import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { FiBox, FiTag, FiActivity, FiFileText, FiLogOut, FiHome, FiPlus, FiPrinter } from 'react-icons/fi';

const links = [
  { to: '/', label: 'Dashboard', icon: FiHome },
  { to: '/products', label: 'Produk', icon: FiBox },
  { to: '/products/add', label: 'Tambah Produk', icon: FiPlus },
  { to: '/categories', label: 'Kategori', icon: FiTag },
  { to: '/reports', label: 'Cetak Produk', icon: FiPrinter },
  { to: '/activities', label: 'Aktivitas', icon: FiActivity }
];

export default function Sidebar() {
  const { logout, admin } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <aside className="w-60 bg-sidebar text-gray-200 min-h-screen flex flex-col">
      <div className="p-4 text-xl font-bold text-white border-b border-slate-700">
        E-Commerce Admin
      </div>
      <nav className="flex-1 p-3 space-y-1">
        {links.map((l) => (
          <NavLink
            key={l.to}
            to={l.to}
            end={l.to === '/' || l.to === '/products'}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2 rounded hover:bg-slate-700 ${
                isActive ? 'bg-primary' : ''
              }`
            }
          >
            <l.icon />
            {l.label}
          </NavLink>
        ))}
      </nav>
      <div className="p-3 border-t border-slate-700">
        <div className="text-sm mb-2 px-3">{admin?.fullname || admin?.username}</div>
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 w-full px-3 py-2 rounded hover:bg-red-600 text-left"
        >
          <FiLogOut /> Logout
        </button>
      </div>
    </aside>
  );
}
