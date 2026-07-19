export default function Loading({ label = 'Memuat...' }) {
  return (
    <div className="flex justify-center items-center py-10 text-slate-500">
      <div className="animate-spin h-6 w-6 border-4 border-primary border-t-transparent rounded-full mr-3" />
      {label}
    </div>
  );
}
