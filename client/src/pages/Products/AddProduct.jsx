import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import InputField from '../../components/forms/InputField';
import Button from '../../components/buttons/Button';
import { createProduct } from '../../services/productService';
import { getCategories } from '../../services/categoryService';
import { FiPackage, FiDollarSign, FiLayers, FiImage } from 'react-icons/fi';

export default function AddProduct() {
  const { register, handleSubmit } = useForm();
  const [categories, setCategories] = useState([]);
  const [preview, setPreview] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    getCategories().then((res) => setCategories(res.data));
  }, []);

  const onFile = (e) => {
    const file = e.target.files[0];
    if (file) setPreview(URL.createObjectURL(file));
  };

  const onSubmit = async (data) => {
    const fd = new FormData();
    fd.append('product_name', data.product_name);
    fd.append('category_id', data.category_id || '');
    fd.append('description', data.description || '');
    fd.append('price', data.price || 0);
    fd.append('stock', data.stock || 0);
    if (data.image && data.image[0]) fd.append('image', data.image[0]);
    try {
      await createProduct(fd);
      Swal.fire('Berhasil', 'Produk ditambahkan', 'success');
      navigate('/products');
    } catch (err) {
      Swal.fire('Gagal', err.response?.data?.message || 'Gagal', 'error');
    }
  };

  return (
    <div className="max-w-2xl">
      <h2 className="text-2xl font-bold text-slate-700 mb-6">Tambah Produk</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-8 rounded-lg shadow space-y-2">
        <InputField label="Nama Produk" placeholder="Masukkan nama produk" icon={FiPackage} {...register('product_name', { required: true })} />

        <div className="mb-5">
          <label className="block text-base font-medium text-slate-700 mb-1.5">Kategori</label>
          <select {...register('category_id')} className="w-full border border-slate-300 rounded-lg px-4 py-3 text-base text-slate-800 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition appearance-none bg-white">
            <option value="">-- Pilih Kategori --</option>
            {categories.map((c) => <option key={c.id} value={c.id}>{c.category_name}</option>)}
          </select>
        </div>

        <div className="mb-5">
          <label className="block text-base font-medium text-slate-700 mb-1.5">Deskripsi</label>
          <textarea {...register('description')} placeholder="Deskripsi singkat produk..." rows={4} className="w-full border border-slate-300 rounded-lg px-4 py-3 text-base text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition resize-none"></textarea>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <InputField label="Harga" type="number" placeholder="0" icon={FiDollarSign} {...register('price')} />
          <InputField label="Stok" type="number" placeholder="0" icon={FiLayers} {...register('stock')} />
        </div>

        <div className="mb-5">
          <label className="block text-base font-medium text-slate-700 mb-1.5">Gambar</label>
          <label className="flex items-center justify-center w-full h-32 border-2 border-dashed border-slate-300 rounded-lg cursor-pointer hover:border-primary hover:bg-blue-50 transition">
            {preview ? (
              <img src={preview} alt="" className="h-28 object-contain rounded" />
            ) : (
              <div className="text-center">
                <FiImage className="mx-auto text-2xl text-slate-400 mb-1" />
                <span className="text-base text-slate-500">Klik untuk upload gambar</span>
              </div>
            )}
            <input type="file" accept="image/*" {...register('image')} onChange={onFile} className="hidden" />
          </label>
        </div>

        <div className="flex gap-3 pt-4">
          <Button type="submit" className="px-6 py-3 text-base">Simpan</Button>
          <Button variant="secondary" onClick={() => navigate('/products')} type="button" className="px-6 py-3 text-base">Batal</Button>
        </div>
      </form>
    </div>
  );
}
