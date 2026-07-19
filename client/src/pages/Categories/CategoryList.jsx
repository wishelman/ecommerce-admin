import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import Button, { EditButton, DeleteButton } from '../../components/buttons/Button';
import Loading from '../../components/loading/Loading';
import Modal from '../../components/modal/Modal';
import InputField from '../../components/forms/InputField';
import { getCategories, createCategory, updateCategory, deleteCategory } from '../../services/categoryService';
import { FiPlus, FiSearch, FiTag } from 'react-icons/fi';

export default function CategoryList() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [search, setSearch] = useState('');
  const { register, handleSubmit, reset } = useForm();

  const load = () => {
    setLoading(true);
    getCategories().then((res) => setCategories(res.data)).finally(() => setLoading(false));
  };
  useEffect(load, []);

  const openAdd = () => { setEditing(null); reset({ category_name: '', description: '' }); setModalOpen(true); };
  const openEdit = (c) => { setEditing(c); reset({ category_name: c.category_name, description: c.description || '' }); setModalOpen(true); };

  const onSubmit = async (data) => {
    try {
      if (editing) await updateCategory(editing.id, data);
      else await createCategory(data);
      Swal.fire('Berhasil', 'Kategori disimpan', 'success');
      setModalOpen(false);
      load();
    } catch (err) {
      Swal.fire('Gagal', err.response?.data?.message || 'Gagal', 'error');
    }
  };

  const handleDelete = async (id) => {
    const c = await Swal.fire({ title: 'Hapus kategori?', icon: 'warning', showCancelButton: true, confirmButtonText: 'Hapus' });
    if (c.isConfirmed) {
      await deleteCategory(id);
      load();
    }
  };

  const filtered = categories.filter((c) =>
    c.category_name.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) return <Loading />;

  return (
    <div>

      {/* Div atas — 2 card: Tambah + Cari */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <button onClick={openAdd} className="bg-white rounded-lg shadow p-5 flex items-center gap-4 hover:shadow-md transition text-left cursor-pointer">
          <div className="bg-blue-500 text-white p-3 rounded-lg text-2xl"><FiPlus /></div>
          <div>
            <div className="text-lg font-semibold text-slate-800">Tambah Kategori</div>
            <div className="text-sm text-slate-500">Tambahkan kategori baru</div>
          </div>
        </button>
        <div className="bg-white rounded-lg shadow p-5 flex items-center gap-4">
          <div className="bg-emerald-500 text-white p-3 rounded-lg text-2xl"><FiSearch /></div>
          <input
            type="text"
            placeholder="Cari nama kategori..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 text-base text-slate-700 outline-none placeholder:text-slate-400"
          />
        </div>
      </div>

      {/* Tabel Kategori */}
      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="w-full text-left">
          <thead className="bg-slate-100 text-slate-600">
            <tr>
              <th className="px-5 py-3 font-semibold text-base w-16">No</th>
              <th className="px-5 py-3 font-semibold text-base">Nama Kategori</th>
              <th className="px-5 py-3 font-semibold text-base">Jumlah Produk</th>
              <th className="px-5 py-3 font-semibold text-base">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filtered.map((c, i) => (
              <tr key={c.id} className="hover:bg-slate-50">
                <td className="px-5 py-3 text-base text-slate-500">{i + 1}</td>
                <td className="px-5 py-3">
                  <div className="flex items-center gap-2">
                    <FiTag className="text-slate-400" />
                    <span className="text-base text-slate-800 font-medium">{c.category_name}</span>
                  </div>
                </td>
                <td className="px-5 py-3">
                  <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
                    {c.product_count || 0} produk
                  </span>
                </td>
                <td className="px-5 py-3 flex gap-2">
                  <EditButton onClick={() => openEdit(c)} />
                  <DeleteButton onClick={() => handleDelete(c.id)} />
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr><td colSpan={4} className="px-5 py-6 text-center text-base text-slate-400">Tidak ada kategori ditemukan</td></tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal Tambah/Edit */}
      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title={editing ? 'Edit Kategori' : 'Tambah Kategori'}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <InputField label="Nama Kategori" placeholder="Masukkan nama kategori" {...register('category_name', { required: true })} />
          <div className="mb-5">
            <label className="block text-base font-medium text-slate-700 mb-1.5">Deskripsi</label>
            <textarea {...register('description')} placeholder="Deskripsi singkat kategori..." rows={3} className="w-full border border-slate-300 rounded-lg px-4 py-3 text-base text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition resize-none"></textarea>
          </div>
          <div className="flex gap-3 pt-2">
            <Button type="submit" className="px-6 py-3 text-base">Simpan</Button>
            <Button variant="secondary" onClick={() => setModalOpen(false)} type="button" className="px-6 py-3 text-base">Batal</Button>
          </div>
        </form>
      </Modal>

    </div>
  );
}
