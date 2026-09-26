interface Props {
  label: string;
  value: string | number;
  sub?: string;
  highlight?: boolean;
  accent?: 'blue' | 'emerald' | 'amber' | 'red';
}

const ACCENT = {
  blue:    { card: 'bg-blue-600',    text: 'text-white', sub: 'text-blue-100',  label: 'text-blue-100' },
  emerald: { card: 'bg-emerald-500', text: 'text-white', sub: 'text-emerald-100', label: 'text-emerald-100' },
  amber:   { card: 'bg-amber-500',   text: 'text-white', sub: 'text-amber-100', label: 'text-amber-100' },
  red:     { card: 'bg-red-500',     text: 'text-white', sub: 'text-red-100',   label: 'text-red-100' },
};

export default function MetricCard({ label, value, sub, highlight, accent }: Props) {
  if (accent) {
    const a = ACCENT[accent];
    return (
      <div className={`rounded-2xl p-5 text-center shadow-lg ${a.card}`}>
        <p className={`text-xs font-semibold uppercase tracking-widest mb-2 ${a.label}`}>{label}</p>
        <p className={`text-3xl font-bold ${a.text}`}>{value}</p>
        {sub && <p className={`text-xs mt-1 ${a.sub}`}>{sub}</p>}
      </div>
    );
  }

  return (
    <div className={`card p-5 text-center transition-all duration-200 hover:shadow-md
      ${highlight ? 'ring-2 ring-blue-500 ring-offset-2' : ''}`}>
      <p className="section-label">{label}</p>
      <p className={`text-2xl font-bold ${highlight ? 'text-blue-700' : 'text-gray-900'}`}>{value}</p>
      {sub && <p className="text-xs text-gray-400 mt-1">{sub}</p>}
    </div>
  );
}
