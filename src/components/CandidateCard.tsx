import type { CubsoCandidate } from '../types';

interface Props {
  candidate: CubsoCandidate;
  selected?: boolean;
  onSelect: () => void;
  rank: number; // 1, 2, 3
}

const RANK_COLORS = ['border-blue-400 bg-blue-50', 'border-slate-300 bg-slate-50', 'border-gray-200 bg-white'];
const RANK_LABELS = ['Mejor coincidencia', 'Segunda opción', 'Tercera opción'];
const RANK_BADGE  = ['bg-blue-600 text-white', 'bg-slate-500 text-white', 'bg-gray-300 text-gray-700'];

export default function CandidateCard({ candidate, selected, onSelect, rank }: Props) {
  const pct = Math.round(candidate.probability * 100);
  const barColor = pct >= 75 ? 'bg-emerald-500' : pct >= 50 ? 'bg-amber-400' : 'bg-gray-300';

  return (
    <button
      onClick={onSelect}
      className={`w-full text-left rounded-2xl border-2 p-5 transition-all duration-200 group
        ${selected
          ? 'border-blue-500 bg-blue-50 shadow-lg shadow-blue-100 scale-[1.01]'
          : `${RANK_COLORS[rank - 1]} hover:border-blue-300 hover:shadow-md hover:scale-[1.005]`}`}
    >
      <div className="flex items-start gap-4">
        {/* Rank badge */}
        <div className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${selected ? 'bg-blue-600 text-white' : RANK_BADGE[rank - 1]}`}>
          {selected ? '✓' : rank}
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 mb-1">
            <p className="font-bold text-gray-900 leading-snug">{candidate.name}</p>
            <span className={`shrink-0 text-xs font-bold ${pct >= 75 ? 'text-emerald-700' : pct >= 50 ? 'text-amber-700' : 'text-gray-500'}`}>
              {pct}%
            </span>
          </div>

          <div className="flex items-center gap-3 mb-3">
            <span className="text-xs font-mono text-gray-400">{candidate.code}</span>
            <span className="text-gray-300">·</span>
            <span className="text-xs bg-white border border-gray-200 text-gray-600 px-2 py-0.5 rounded-full">
              Unidad: <strong>{candidate.unit}</strong>
            </span>
          </div>

          {/* Barra de probabilidad */}
          <div>
            <div className="flex justify-between text-xs text-gray-400 mb-1">
              <span>{RANK_LABELS[rank - 1]}</span>
            </div>
            <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-700 ${barColor}`}
                style={{ width: `${pct}%` }}
              />
            </div>
          </div>
        </div>
      </div>
    </button>
  );
}
