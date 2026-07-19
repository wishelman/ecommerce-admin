import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import { login as loginApi } from '../../services/authService';
import { useAuth } from '../../context/AuthContext';

export default function Login() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const res = await loginApi(data);
      login(res.data.token, res.data.admin);
      Swal.fire('Berhasil', 'Login berhasil', 'success');
      navigate('/');
    } catch (err) {
      Swal.fire('Gagal', err.response?.data?.message || 'Login gagal', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-bold text-center mb-6 text-slate-700">Admin Login</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label className="block text-sm text-slate-600 mb-1">Username</label>
            <input
              {...register('username', { required: 'Username wajib' })}
              className="w-full border rounded px-3 py-2 text-sm focus:ring-2 focus:ring-primary focus:outline-none"
            />
            {errors.username && <p className="text-red-500 text-xs mt-1">{errors.username.message}</p>}
          </div>
          <div className="mb-6">
            <label className="block text-sm text-slate-600 mb-1">Password</label>
            <input
              type="password"
              {...register('password', { required: 'Password wajib' })}
              className="w-full border rounded px-3 py-2 text-sm focus:ring-2 focus:ring-primary focus:outline-none"
            />
            {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary text-white py-2 rounded hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? 'Memproses...' : 'Login'}
          </button>
        </form>
        <p className="text-xs text-center text-slate-400 mt-4">Default: admin / admin123</p>
      </div>
    </div>
  );
}
