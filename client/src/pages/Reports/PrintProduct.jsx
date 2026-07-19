import { useEffect, useState } from 'react';
import Loading from '../../components/loading/Loading';
import { getProducts } from '../../services/productService';
import { FiPrinter, FiFileText } from 'react-icons/fi';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

export default function PrintProduct() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProducts().then((res) => setProducts(res.data)).finally(() => setLoading(false));
  }, []);

  const handlePrint = () => window.print();

  const handlePDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text('TOKO ONLINE ADMIN', 14, 15);
    doc.setFontSize(12);
    doc.text('Daftar Produk & Harga Produk', 14, 23);

    autoTable(doc, {
      startY: 30,
      head: [['No', 'Nama Produk', 'Kategori', 'Harga', 'Stok']],
      body: products.map((p, i) => [
        i + 1,
        p.product_name,
        p.category_name || '-',
        `Rp ${Number(p.price).toLocaleString('id-ID')}`,
        p.stock
      ]),
      styles: { fontSize: 10 },
      headStyles: { fillColor: [37, 99, 235] }
    });

    doc.save('daftar-produk.pdf');
  };

  if (loading) return <Loading />;

  return (
    <div>

      {/* Header — tampil di layar & di print */}
      <div className="mb-6 text-center">
        <h1 className="text-2xl font-bold text-slate-800 tracking-wide">TOKO ONLINE ADMIN</h1>
        <p className="text-lg text-slate-600 mt-1">Daftar Produk & Harga Produk</p>
      </div>

      {/* Tabel */}
      <div className="overflow-x-auto bg-white rounded-lg shadow print:shadow-none">
        <table className="w-full text-left">
          <thead className="bg-slate-100 text-slate-600">
            <tr>
              <th className="px-5 py-3 font-semibold text-base w-16">No</th>
              <th className="px-5 py-3 font-semibold text-base">Nama Produk</th>
              <th className="px-5 py-3 font-semibold text-base">Kategori</th>
              <th className="px-5 py-3 font-semibold text-base">Harga</th>
              <th className="px-5 py-3 font-semibold text-base">Stok</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {products.map((p, i) => (
              <tr key={p.id} className="hover:bg-slate-50">
                <td className="px-5 py-3 text-base text-slate-500">{i + 1}</td>
                <td className="px-5 py-3 text-base text-slate-800 font-medium">{p.product_name}</td>
                <td className="px-5 py-3 text-base text-slate-700">
                  <span className="bg-slate-100 px-2 py-1 rounded text-sm">{p.category_name || '-'}</span>
                </td>
                <td className="px-5 py-3 text-base text-slate-700">Rp {Number(p.price).toLocaleString('id-ID')}</td>
                <td className="px-5 py-3 text-base text-slate-700">{p.stock}</td>
              </tr>
            ))}
            {products.length === 0 && (
              <tr><td colSpan={5} className="px-5 py-6 text-center text-base text-slate-400">Tidak ada data</td></tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Tombol Print & Export PDF —sembunyi saat print */}
      <div className="flex gap-3 mt-6 print:hidden">
        <button onClick={handlePrint} className="flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-lg text-base font-medium hover:bg-blue-700 transition">
          <FiPrinter /> Print
        </button>
        <button onClick={handlePDF} className="flex items-center gap-2 bg-red-500 text-white px-6 py-3 rounded-lg text-base font-medium hover:bg-red-600 transition">
          <FiFileText /> Export PDF
        </button>
      </div>

    </div>
  );
}
