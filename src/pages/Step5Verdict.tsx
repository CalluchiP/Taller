// ─── Pantalla 5: Veredicto ────────────────────────────────────────────────────
import { useState } from 'react';
import Layout from '../components/Layout';
import ConfidenceBadge from '../components/ConfidenceBadge';
import WarningBanner from '../components/WarningBanner';
import EmptyState from '../components/EmptyState';
import { useWizard } from '../context/WizardContext';
import { projectWarnings } from '../data/mock';
import type { VerdictType, ConfidenceLevel } from '../types';

const VERDICT_CONFIG: Record<VerdictType, {
  label: string; sublabel: string; emoji: string;
  gradient: string; textColor: string; borderColor: string;
}> = {
  participar: {
    label: 'Puede participar',
    sublabel: 'Su costo está por debajo del P25 del mercado. Tiene ventaja competitiva.',
    emoji: '🟢',
    gradient: 'from-emerald-500 to-emerald-700',
    textColor: 'text-emerald-700',
    borderColor: 'border-emerald-300',
  },
  cautela: {
    label: 'Participe con cautela',
    sublabel: 'Su costo está dentro del rango P25-P75. El margen es ajustado.',
    emoji: '🟡',
    gradient: 'from-amber-400 to-amber-600',
    textColor: 'text-amber-700',
    borderColor: 'border-amber-300',
  },
  no_participar: {
    label: 'No se recomienda participar',
    sublabel: 'Su costo supera el P75 del mercado. Sería difícil competir.',
    emoji: '🔴',
    gradient: 'from-red-500 to-red-700',
    textColor: 'text-red-700',
    borderColor: 'border-red-300',
  },
  sin_evidencia: {
    label: 'Sin evidencia suficiente',
    sublabel: 'No hay datos suficientes en el catálogo para emitir un veredicto.',
    emoji: '⚪',
    gradient: 'from-gray-400 to-gray-600',
    textColor: 'text-gray-600',
    borderColor: 'border-gray-300',
  },
};

export default function Step5Verdict() {
  const { state, reset, goTo } = useWizard();
  const [showWarnings, setShowWarnings] = useState(false);

  const verdict   = state.verdict;
  const candidate = state.selectedCandidate;
  const market    = state.marketData;
  const cost      = state.cost;

  const effectiveVerdict: VerdictType   = state.evidenceLevel === 'none' ? 'sin_evidencia' : verdict?.verdict ?? 'sin_evidencia';
  const effectiveConfidence: ConfidenceLevel = verdict?.confidence ?? 'baja';
  const cfg = VERDICT_CONFIG[effectiveVerdict];

  return (
    <Layout step={5}>
      <div className="space-y-6 animate-fade-slide-up">

        {/* ── Encabezado ──────────────────────────────────────────────── */}
        <div>
          <p className="section-label">Paso 5 de 5 · Resultado</p>
          <h1 className="page-title">Veredicto de participación</h1>
          <div className="flex items-center gap-2 mt-2">
            <span className="font-mono text-xs bg-slate-100 text-slate-600 px-2 py-1 rounded-lg">{candidate?.code}</span>
            <span className="text-gray-400">·</span>
            <span className="text-sm text-gray-600">{candidate?.name}</span>
          </div>
        </div>

        {/* ── Tarjeta principal ─────────────────────────────────────────── */}
        <div className={`relative overflow-hidden rounded-3xl bg-gradient-to-br ${cfg.gradient} p-8 text-center shadow-xl`}>
          {/* Círculos decorativos */}
          <div className="absolute top-0 right-0 w-48 h-48 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/4" />
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/4" />

          <div className="relative z-10">
            <div className="text-6xl mb-4 animate-fade-in">{cfg.emoji}</div>
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">{cfg.label}</h2>
            <p className="text-white/80 text-sm max-w-xs mx-auto mb-5">{cfg.sublabel}</p>
            {effectiveVerdict !== 'sin_evidencia' && (
              <div className="flex justify-center">
                <ConfidenceBadge level={effectiveConfidence} />
              </div>
            )}
          </div>
        </div>

        {/* Sin evidencia */}
        {effectiveVerdict === 'sin_evidencia' && (
          <EmptyState icon="📭" title="No hay evidencia suficiente"
            description="Intente con otro código CUBSO o reformule la descripción." />
        )}

        {/* ── Detalle numérico ─────────────────────────────────────────── */}
        {effectiveVerdict !== 'sin_evidencia' && market && cost !== null && (
          <div className="card p-5 animate-fade-slide-up delay-100">
            <p className="section-label">Detalle del análisis</p>
            <div className="space-y-2.5 text-sm">
              {/* Costo */}
              <div className={`flex justify-between items-center px-3 py-2.5 rounded-xl border ${cfg.borderColor} bg-white`}>
                <span className="font-semibold text-gray-700">Su costo declarado</span>
                <span className={`font-bold text-lg ${cfg.textColor}`}>S/ {cost.toFixed(2)} / {candidate?.unit}</span>
              </div>
              <hr className="border-gray-100" />
              {[
                { l: 'P25 del mercado', v: market.p25 },
                { l: 'Mediana del mercado', v: market.median },
                { l: 'P75 del mercado', v: market.p75 },
              ].map(row => (
                <div key={row.l} className="flex justify-between text-gray-600">
                  <span>{row.l}</span>
                  <span className="font-medium text-gray-800">S/ {row.v.toFixed(2)}</span>
                </div>
              ))}
              <hr className="border-gray-100" />
              <div className="flex justify-between text-gray-500 text-xs">
                <span>Adjudicaciones analizadas</span>
                <span>{market.adjudicationsCount} · {market.period}</span>
              </div>
            </div>
          </div>
        )}

        {/* ── Advertencia RNP ──────────────────────────────────────────── */}
        {verdict?.hasRNPWarning && (
          <WarningBanner variant="warning">
            <strong>No tiene RNP vigente.</strong> Para participar en procesos de selección es obligatorio contar con el Registro Nacional de Proveedores activo. Gestione su inscripción en el OECE antes de presentar propuestas.
          </WarningBanner>
        )}

        {/* ── Advertencias colapsables ─────────────────────────────────── */}
        <div className="card overflow-hidden animate-fade-slide-up delay-200">
          <button
            onClick={() => setShowWarnings(v => !v)}
            className="w-full flex items-center justify-between px-5 py-4 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
          >
            <span className="flex items-center gap-2">
              <span className="w-7 h-7 bg-amber-100 rounded-lg flex items-center justify-center text-sm">⚠️</span>
              Limitaciones del sistema
            </span>
            <svg className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${showWarnings ? 'rotate-180' : ''}`}
              fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          {showWarnings && (
            <div className="border-t border-gray-100 px-5 py-4 bg-gray-50 animate-fade-in">
              <ul className="space-y-2.5">
                {projectWarnings.map((w, i) => (
                  <li key={i} className="flex gap-2.5 text-xs text-gray-600">
                    <span className="shrink-0 mt-0.5 w-4 h-4 bg-amber-200 rounded-full flex items-center justify-center text-amber-800 font-bold">{i + 1}</span>
                    {w}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* ── Acciones ──────────────────────────────────────────────────── */}
        <div className="grid grid-cols-2 gap-3 pt-2">
          <button onClick={reset} className="btn-primary justify-center">
            🔄 Evaluar otro bien
          </button>
          <button onClick={() => goTo(4)} className="btn-secondary justify-center">
            ← Cambiar costo
          </button>
        </div>
      </div>
    </Layout>
  );
}
