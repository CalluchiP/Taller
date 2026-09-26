import type { ConfidenceLevel } from '../types';

interface Props {
  level: ConfidenceLevel;
}

const config: Record<ConfidenceLevel, { label: string; classes: string }> = {
  alta:  { label: 'Confianza Alta',  classes: 'bg-emerald-100 text-emerald-800 border-emerald-300' },
  media: { label: 'Confianza Media', classes: 'bg-amber-100 text-amber-800 border-amber-300' },
  baja:  { label: 'Confianza Baja',  classes: 'bg-gray-100 text-gray-600 border-gray-300' },
};

export default function ConfidenceBadge({ level }: Props) {
  const { label, classes } = config[level];
  return (
    <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold border ${classes}`}>
      <span className="relative flex h-2 w-2">
        <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-50 ${
          level === 'alta' ? 'bg-emerald-500' : level === 'media' ? 'bg-amber-500' : 'bg-gray-400'
        }`} />
        <span className={`relative inline-flex rounded-full h-2 w-2 ${
          level === 'alta' ? 'bg-emerald-600' : level === 'media' ? 'bg-amber-600' : 'bg-gray-500'
        }`} />
      </span>
      {label}
    </span>
  );
}
