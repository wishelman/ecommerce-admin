import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FiBox, FiTag, FiLayers, FiDollarSign, FiTrendingUp, FiAlertTriangle, FiClock } from 'react-icons/fi';
import { useAuth } from '../../context/AuthContext';
import Loading from '../../components/loading/Loading';
import { getSummary } from '../../services/reportService';

export default function Dashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const { admin } = useAuth();

  useEffect(() => {
    getSummary()
      .then((res) => setData(res.data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <Loading />;
  if (!data) return <Loading label="Data tidak tersedia" />;

  const top = data.topSelling || [];
  const low = data.lowSelling || [];
  const lastActivity = data.recentActivities?.[0];

  return (
    <div className="space-y-6">

      {/* Div 1 - Welcome */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-400 rounded-lg p-6 text-white">
        <h2 className="text-2xl font-bold">Selamat Datang, {admin?.fullname || admin?.username}!</h2>
        <p className="text-blue-100 mt-1">Berikut ringkasan data e-commerce kamu hari ini.</p>
      </div>

      {/* Div 2 - 4 Card Statistik */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow p-5 flex items-center gap-4">
          <div className="bg-blue-500 text-white p-3 rounded-lg text-2xl"><FiBox /></div>
          <div>
            <div className="text-sm text-slate-500">Total Produk</div>
            <div className="text-2xl font-bold text-slate-800">{data.totalProducts}</div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-5 flex items-center gap-4">
          <div className="bg-emerald-500 text-white p-3 rounded-lg text-2xl"><FiTag /></div>
          <div>
            <div className="text-sm text-slate-500">Kategori</div>
            <div className="text-2xl font-bold text-slate-800">{data.totalCategories}</div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-5 flex items-center gap-4">
          <div className="bg-amber-500 text-white p-3 rounded-lg text-2xl"><FiLayers /></div>
          <div>
            <div className="text-sm text-slate-500">Total Stok</div>
            <div className="text-2xl font-bold text-slate-800">{data.totalStock}</div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-5 flex items-center gap-4">
          <div className="bg-purple-500 text-white p-3 rounded-lg text-2xl"><FiDollarSign /></div>
          <div>
            <div className="text-sm text-slate-500">Nilai Inventori</div>
            <div className="text-2xl font-bold text-slate-800">Rp {Number(data.totalValue).toLocaleString('id-ID')}</div>
          </div>
        </div>
      </div>

      {/* Div 3 - Produk Terlaku + Perlu Direview */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* Produk Terlaku */}
        <div className="bg-white rounded-lg shadow p-5">
          <div className="flex items-center gap-2 mb-4">
            <FiTrendingUp className="text-emerald-500 text-xl" />
            <h3 className="font-semibold text-slate-700">Produk Terlaku</h3>
          </div>
          {top.length > 0 ? (
            <div className="space-y-3">
              {top.map((item, i) => (
                <div key={item.id} className="flex items-center gap-3">
                  <div className="bg-emerald-100 text-emerald-700 font-bold w-8 h-8 flex items-center justify-center rounded-full text-sm">
                    {i + 1}
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-slate-800 text-sm">{item.product_name}</div>
                    <div className="text-xs text-slate-500">Rp {Number(item.price).toLocaleString('id-ID')}</div>
                  </div>
                  <div className="text-emerald-600 font-semibold text-sm">{item.sold} pcs</div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-slate-400 text-sm">Belum ada data</p>
          )}
        </div>

        {/* Produk Perlu Direview */}
        <div className="bg-white rounded-lg shadow p-5">
          <div className="flex items-center gap-2 mb-4">
            <FiAlertTriangle className="text-amber-500 text-xl" />
            <h3 className="font-semibold text-slate-700">Perlu Direview</h3>
          </div>
          {low.length > 0 ? (
            <div className="space-y-3">
              {low.map((item, i) => (
                <div key={item.id} className="flex items-center gap-3">
                  <div className="bg-amber-100 text-amber-700 font-bold w-8 h-8 flex items-center justify-center rounded-full text-sm">
                    {i + 1}
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-slate-800 text-sm">{item.product_name}</div>
                    <div className="text-xs text-slate-500">Rp {Number(item.price).toLocaleString('id-ID')}</div>
                  </div>
                  <div className="text-amber-600 font-semibold text-sm">{item.sold} pcs</div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-slate-400 text-sm">Belum ada data</p>
          )}
        </div>

      </div>

      {/* Div 4 - Aktivitas Terakhir */}
      <div className="bg-white rounded-lg shadow p-5">
        <div className="flex items-center gap-2 mb-4">
          <FiClock className="text-blue-500 text-xl" />
          <h3 className="font-semibold text-slate-700">Aktivitas Terakhir</h3>
        </div>
        {lastActivity ? (
          <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
            <div className="bg-blue-100 text-blue-600 p-2 rounded-full">
              <FiClock />
            </div>
            <div>
              <span className="font-medium text-slate-800">{lastActivity.admin_name || 'Admin'}</span>
              <span className="text-slate-600"> — {lastActivity.activity}</span>
              <div className="text-xs text-slate-400 mt-1">{new Date(lastActivity.created_at).toLocaleString('id-ID')}</div>
            </div>
          </div>
        ) : (
          <p className="text-slate-400 text-sm">Belum ada aktivitas</p>
        )}
        <Link to="/activities" className="text-primary text-sm mt-3 inline-block hover:underline">Lihat semua →</Link>
      </div>

    </div>
  );
}
