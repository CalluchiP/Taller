// ─── Pantalla 2: Selección de código CUBSO ───────────────────────────────────
import { useState } from 'react';
import Layout from '../components/Layout';
import CandidateCard from '../components/CandidateCard';
import EmptyState from '../components/EmptyState';
import WarningBanner from '../components/WarningBanner';
import { useWizard } from '../context/WizardContext';
import { mockCandidates } from '../data/mock';
import type { CubsoCandidate } from '../types';

const SHOW_EMPTY = false;

export default function Step2CodeSelection() {
  const { state, setSelectedCandidate, nextStep, goTo } = useWizard();
  const [selected, setSelected] = useState<CubsoCandidate | null>(state.selectedCandidate);
  const [touched, setTouched] = useState(false);

  const candidates = SHOW_EMPTY ? [] : mockCandidates;

  function handleConfirm() {
    setTouched(true);
    if (selected) {
      setSelectedCandidate(selected);
      nextStep();
    }
  }

  return (
    <Layout step={2}>
      <div className="space-y-6 animate-fade-slide-up">

        {/* ── Encabezado ───────────────────────────────────────────── */}
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="section-label">Paso 2 de 5</p>
            <h1 className="page-title">Seleccione el código del bien</h1>
            <p className="page-subtitle text-sm">
              Basándonos en su descripción, el sistema encontró estos candidatos del catálogo CUBSO. Confirme el que mejor represente lo que vende.
            </p>
          </div>
        </div>

        {/* ── Chip de descripción ──────────────────────────────────── */}
        <div className="flex items-center gap-3 bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3">
          <span className="text-xl">📝</span>
          <div className="min-w-0">
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide">Su descripción</p>
            <p className="text-sm text-gray-700 truncate italic">"{state.description || 'Resmas de papel bond A4 75 g/m²...'}"</p>
          </div>
          <button onClick={() => goTo(1)} className="shrink-0 text-xs text-blue-600 hover:underline">Editar</button>
        </div>

        {/* ── Estado vacío ─────────────────────────────────────────── */}
        {candidates.length === 0 ? (
          <div className="card overflow-hidden animate-fade-in">
            <EmptyState
              icon="🔎"
              title="Sin evidencia suficiente"
              description="No encontramos ningún código CUBSO válido para su descripción. Intente reformular con más detalles técnicos."
            />
            <div className="px-6 pb-8 flex justify-center">
              <button onClick={() => goTo(1)} className="btn-primary">Volver a describir</button>
            </div>
          </div>
        ) : (
          <>
            {/* ── Lista ──────────────────────────────────────────────── */}
            <div className="space-y-3">
              {candidates.map((c, i) => (
                <div key={c.code} className="animate-fade-slide-up" style={{ animationDelay: `${i * 80}ms` }}>
                  <CandidateCard
                    candidate={c}
                    selected={selected?.code === c.code}
                    onSelect={() => setSelected(c)}
                    rank={(i + 1) as 1 | 2 | 3}
                  />
                </div>
              ))}
            </div>

            {touched && !selected && (
              <WarningBanner variant="warning">
                Debe seleccionar un código para continuar.
              </WarningBanner>
            )}

            {/* ── Acciones ─────────────────────────────────────────── */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button onClick={() => { setSelectedCandidate(null); goTo(1); }} className="btn-secondary sm:flex-1">
                Ninguno me corresponde
              </button>
              <button
                onClick={handleConfirm}
                disabled={!selected}
                className="btn-primary sm:flex-1 justify-center"
              >
                Confirmar y ver mercado
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </>
        )}
      </div>
    </Layout>
  );
}
