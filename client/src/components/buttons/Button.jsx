import { FiEdit2, FiTrash2 } from 'react-icons/fi';

export default function Button({ children, onClick, variant = 'primary', type = 'button', className = '' }) {
  const styles = {
    primary: 'bg-primary text-white hover:bg-blue-700',
    danger: 'bg-red-500 text-white hover:bg-red-600',
    secondary: 'bg-slate-200 text-slate-700 hover:bg-slate-300'
  };
  return (
    <button
      type={type}
      onClick={onClick}
      className={`px-4 py-2 rounded text-sm font-medium ${styles[variant]} ${className}`}
    >
      {children}
    </button>
  );
}

export function EditButton({ onClick }) {
  return (
    <button onClick={onClick} className="text-blue-600 hover:text-blue-800 p-1" title="Edit">
      <FiEdit2 />
    </button>
  );
}

export function DeleteButton({ onClick }) {
  return (
    <button onClick={onClick} className="text-red-600 hover:text-red-800 p-1" title="Hapus">
      <FiTrash2 />
    </button>
  );
}
