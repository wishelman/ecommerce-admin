export default function Table({ headers, children }) {
  return (
    <div className="overflow-x-auto bg-white rounded-lg shadow">
      <table className="w-full text-sm text-left">
        <thead className="bg-slate-100 text-slate-600">
          <tr>
            {headers.map((h, i) => (
              <th key={i} className="px-4 py-3 font-semibold">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">{children}</tbody>
      </table>
    </div>
  );
}
