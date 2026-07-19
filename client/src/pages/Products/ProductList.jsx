import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import Button, { EditButton, DeleteButton } from '../../components/buttons/Button';
import Loading from '../../components/loading/Loading';
import { getProducts, deleteProduct } from '../../services/productService';
import { FiPlus, FiSearch } from 'react-icons/fi';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000';

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  const load = () => {
    setLoading(true);
    getProducts()
      .then((res) => setProducts(res.data))
      .finally(() => setLoading(false));
  };

  useEffect(load, []);

  const handleDelete = async (id) => {
    const confirm = await Swal.fire({ title: 'Hapus produk?', icon: 'warning', showCancelButton: true, confirmButtonText: 'Hapus' });
    if (confirm.isConfirmed) {
      await deleteProduct(id);
      Swal.fire('Berhasil', 'Produk dihapus', 'success');
      load();
    }
  };

  const filtered = products.filter((p) =>
    p.product_name.toLowerCase().includes(search.toLowerCase()) ||
    (p.category_name && p.category_name.toLowerCase().includes(search.toLowerCase()))
  );

  if (loading) return <Loading />;

  return (
    <div>

      {/* Div atas — 2 card: Tambah + Cari */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <Link to="/products/add" className="bg-white rounded-lg shadow p-5 flex items-center gap-4 hover:shadow-md transition">
          <div className="bg-blue-500 text-white p-3 rounded-lg text-2xl"><FiPlus /></div>
          <div>
            <div className="text-lg font-semibold text-slate-800">Tambah Produk</div>
            <div className="text-sm text-slate-500">Tambahkan produk baru ke daftar</div>
          </div>
        </Link>
        <div className="bg-white rounded-lg shadow p-5 flex items-center gap-4">
          <div className="bg-emerald-500 text-white p-3 rounded-lg text-2xl"><FiSearch /></div>
          <input
            type="text"
            placeholder="Cari nama produk atau kategori..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 text-base text-slate-700 outline-none placeholder:text-slate-400"
          />
        </div>
      </div>

      {/* Tabel Produk */}
      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="w-full text-left">
          <thead className="bg-slate-100 text-slate-600">
            <tr>
              <th className="px-5 py-3 font-semibold text-base">Nama Produk</th>
              <th className="px-5 py-3 font-semibold text-base">Harga</th>
              <th className="px-5 py-3 font-semibold text-base">Qty</th>
              <th className="px-5 py-3 font-semibold text-base">Kategori</th>
              <th className="px-5 py-3 font-semibold text-base">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filtered.map((p) => (
              <tr key={p.id} className="hover:bg-slate-50">
                <td className="px-5 py-3">
                  <div className="flex items-center gap-3">
                    {p.image ? (
                      <img src={`${API_URL}${p.image}`} alt="" className="h-10 w-10 object-cover rounded" />
                    ) : (
                      <div className="h-10 w-10 bg-slate-200 rounded flex items-center justify-center text-slate-400 text-sm">-</div>
                    )}
                    <span className="text-base text-slate-800 font-medium">{p.product_name}</span>
                  </div>
                </td>
                <td className="px-5 py-3 text-base text-slate-700">Rp {Number(p.price).toLocaleString('id-ID')}</td>
                <td className="px-5 py-3 text-base text-slate-700">{p.stock}</td>
                <td className="px-5 py-3 text-base text-slate-700">
                  <span className="bg-slate-100 px-2 py-1 rounded text-sm">{p.category_name || '-'}</span>
                </td>
                <td className="px-5 py-3 flex gap-2">
                  <Link to={`/products/edit/${p.id}`}><EditButton /></Link>
                  <DeleteButton onClick={() => handleDelete(p.id)} />
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr><td colSpan={5} className="px-5 py-6 text-center text-base text-slate-400">Tidak ada produk ditemukan</td></tr>
            )}
          </tbody>
        </table>
      </div>

    </div>
  );
}
