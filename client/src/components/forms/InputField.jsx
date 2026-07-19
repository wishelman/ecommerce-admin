export default function InputField({ label, error, icon: Icon, ...props }) {
  return (
    <div className="mb-5">
      <label className="block text-base font-medium text-slate-700 mb-1.5">{label}</label>
      <div className="relative">
        {Icon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
            <Icon />
          </div>
        )}
        <input
          {...props}
          className={`w-full border border-slate-300 rounded-lg px-4 py-3 text-base text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition ${Icon ? 'pl-10' : ''}`}
        />
      </div>
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
}
