import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import Button from '../../components/buttons/Button';
import Loading from '../../components/loading/Loading';
import { getActivities, clearActivities } from '../../services/activityService';
import { FiActivity, FiClock, FiTrash2 } from 'react-icons/fi';

export default function ActivityLog() {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);

  const load = () => {
    setLoading(true);
    getActivities().then((res) => setActivities(res.data)).finally(() => setLoading(false));
  };
  useEffect(load, []);

  const handleClear = async () => {
    const c = await Swal.fire({ title: 'Bersihkan semua log?', icon: 'warning', showCancelButton: true, confirmButtonText: 'Bersihkan' });
    if (c.isConfirmed) {
      await clearActivities();
      load();
    }
  };

  if (loading) return <Loading />;

  return (
    <div>

      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-slate-700">Log Aktivitas</h2>
          <p className="text-base text-slate-500 mt-1">Riwayat aktivitas admin di sistem</p>
        </div>
        <Button variant="danger" onClick={handleClear} className="flex items-center gap-2 px-5 py-3 text-base">
          <FiTrash2 /> Bersihkan
        </Button>
      </div>

      {/* Daftar Aktivitas */}
      {activities.length === 0 ? (
        <div className="bg-white rounded-lg shadow p-10 text-center">
          <FiActivity className="mx-auto text-4xl text-slate-300 mb-3" />
          <p className="text-lg text-slate-400">Belum ada aktivitas</p>
        </div>
      ) : (
        <div className="space-y-3">
          {activities.map((a) => (
            <div key={a.id} className="bg-white rounded-lg shadow p-5 flex items-start gap-4 hover:shadow-md transition">
              <div className="bg-blue-100 text-blue-600 p-3 rounded-full text-xl mt-0.5 flex-shrink-0">
                <FiActivity />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-base font-semibold text-slate-800">{a.admin_name || 'Admin'}</span>
                </div>
                <p className="text-base text-slate-600">{a.activity}</p>
                <div className="flex items-center gap-1.5 mt-2 text-sm text-slate-400">
                  <FiClock className="text-sm" />
                  {new Date(a.created_at).toLocaleString('id-ID', { dateStyle: 'long', timeStyle: 'short' })}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
}
