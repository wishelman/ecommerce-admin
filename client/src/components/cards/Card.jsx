export default function Card({ title, value, icon: Icon, color = 'bg-primary' }) {
  return (
    <div className="bg-white rounded-lg shadow p-5 flex items-center gap-4">
      <div className={`${color} text-white p-3 rounded-lg text-2xl`}>
        {Icon && <Icon />}
      </div>
      <div>
        <div className="text-sm text-slate-500">{title}</div>
        <div className="text-2xl font-bold text-slate-800">{value}</div>
      </div>
    </div>
  );
}
