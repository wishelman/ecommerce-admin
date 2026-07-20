import { Routes, Route } from 'react-router-dom';
import MainLayout from '../components/layout/MainLayout';
import Dashboard from '../pages/Dashboard/Dashboard';
import ProductList from '../pages/Products/ProductList';
import AddProduct from '../pages/Products/AddProduct';
import EditProduct from '../pages/Products/EditProduct';
import CategoryList from '../pages/Categories/CategoryList';
import PrintProduct from '../pages/Reports/PrintProduct';
import ActivityLog from '../pages/Activity/ActivityLog';
import NotFound from '../pages/NotFound/NotFound';

export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/products" element={<ProductList />} />
        <Route path="/products/add" element={<AddProduct />} />
        <Route path="/products/edit/:id" element={<EditProduct />} />
        <Route path="/categories" element={<CategoryList />} />
        <Route path="/reports" element={<PrintProduct />} />
        <Route path="/activities" element={<ActivityLog />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
