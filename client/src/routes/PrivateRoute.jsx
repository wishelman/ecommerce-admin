import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function PrivateRoute() {
  const { admin, loading } = useAuth();
  if (loading) return <div className="p-10 text-center">Loading...</div>;
  if (!admin) return <Navigate to="/login" replace />;
  return <Outlet />;
}
