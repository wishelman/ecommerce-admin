import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import InputField from '../../components/forms/InputField';
import Button from '../../components/buttons/Button';
import Loading from '../../components/loading/Loading';
import { getProduct, updateProduct } from '../../services/productService';
import { getCategories } from '../../services/categoryService';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000';

export default function EditProduct() {
  const { id } = useParams();
  const { register, handleSubmit, reset } = useForm();
  const [categories, setCategories] = useState([]);
  const [product, setProduct] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    Promise.all([getProduct(id), getCategories()]).then(([p, c]) => {
      setProduct(p.data);
      setCategories(c.data);
      reset({
        product_name: p.data.product_name,
        category_id: p.data.category_id || '',
        description: p.data.description,
        price: p.data.price,
        stock: p.data.stock
      });
      setLoading(false);
    });
  }, [id]);

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
      await updateProduct(id, fd);
      Swal.fire('Berhasil', 'Produk diupdate', 'success');
      navigate('/products');
    } catch (err) {
      Swal.fire('Gagal', err.response?.data?.message || 'Gagal', 'error');
    }
  };

  if (loading) return <Loading />;

  return (
    <div className="max-w-xl">
      <h2 className="text-xl font-bold text-slate-700 mb-4">Edit Produk</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-6 rounded-lg shadow space-y-1">
        <InputField label="Nama Produk" {...register('product_name', { required: true })} />
        <div className="mb-4">
          <label className="block text-sm text-slate-600 mb-1">Kategori</label>
          <select {...register('category_id')} className="w-full border rounded px-3 py-2 text-sm">
            <option value="">-- Pilih --</option>
            {categories.map((c) => <option key={c.id} value={c.id}>{c.category_name}</option>)}
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-sm text-slate-600 mb-1">Deskripsi</label>
          <textarea {...register('description')} className="w-full border rounded px-3 py-2 text-sm" rows={3}></textarea>
        </div>
        <InputField label="Harga" type="number" {...register('price')} />
        <InputField label="Stok" type="number" {...register('stock')} />
        <div className="mb-4">
          <label className="block text-sm text-slate-600 mb-1">Gambar</label>
          {product?.image && !preview && (
            <img src={`${API_URL}${product.image}`} alt="" className="h-24 mb-2 rounded" />
          )}
          <input type="file" accept="image/*" {...register('image')} onChange={onFile} className="w-full text-sm" />
          {preview && <img src={preview} alt="" className="h-24 mt-2 rounded" />}
        </div>
        <div className="flex gap-2 pt-2">
          <Button type="submit">Update</Button>
          <Button variant="secondary" onClick={() => navigate('/products')} type="button">Batal</Button>
        </div>
      </form>
    </div>
  );
}
