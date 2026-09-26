// ─── Pantalla 3: Mercado ──────────────────────────────────────────────────────
import Layout from '../components/Layout';
import MetricCard from '../components/MetricCard';
import WarningBanner from '../components/WarningBanner';
import EmptyState from '../components/EmptyState';
import { useWizard } from '../context/WizardContext';
import { mockMarketFull, mockMarketLow } from '../data/mock';

const SCENARIO: 'full' | 'low' | 'none' = 'full';

export default function Step3Market() {
  const { state, setMarketData, nextStep, goTo } = useWizard();
  const candidate = state.selectedCandidate;
  const market = SCENARIO === 'low' ? mockMarketLow : mockMarketFull;

  function handleContinue() {
    const data = SCENARIO === 'low' ? mockMarketLow : mockMarketFull;
    setMarketData(data, SCENARIO === 'none' ? 'none' : SCENARIO === 'low' ? 'low' : 'full');
    nextStep();
  }

  // ── Sin compras ────────────────────────────────────────────────────────────
  if (SCENARIO === 'none') {
    return (
      <Layout step={3}>
        <div className="space-y-6 animate-fade-slide-up">
          <div>
            <p className="section-label">Paso 3 de 5</p>
            <h1 className="page-title">Análisis de mercado</h1>
          </div>
          <div className="card overflow-hidden">
            <EmptyState icon="📭" title="Sin compras registradas"
              description="No hay adjudicaciones registradas para este código en el periodo 2023-2025. No es posible emitir un veredicto." />
          </div>
          <WarningBanner variant="info">
            Esto puede deberse a que el bien no ha sido adquirido por entidades públicas en el período analizado.
          </WarningBanner>
          <div className="flex justify-between">
            <button onClick={() => goTo(2)} className="btn-secondary">← Cambiar código</button>
            <button onClick={() => goTo(1)} className="btn-ghost">Empezar de nuevo</button>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout step={3}>
      <div className="space-y-7 animate-fade-slide-up">

        {/* ── Encabezado ──────────────────────────────────────────────── */}
        <div>
          <p className="section-label">Paso 3 de 5</p>
          <h1 className="page-title">Análisis de mercado</h1>
          <div className="flex items-center gap-2 mt-2">
            <span className="font-mono text-xs bg-slate-100 text-slate-600 px-2 py-1 rounded-lg">{candidate?.code}</span>
            <span className="text-gray-400">·</span>
            <span className="text-sm text-gray-600">{candidate?.name}</span>
          </div>
        </div>

        {/* Alerta evidencia baja */}
        {SCENARIO === 'low' && (
          <WarningBanner variant="warning">
            <strong>Evidencia limitada:</strong> Solo {market.adjudicationsCount} adjudicaciones encontradas.
            El veredicto tendrá confianza <strong>baja</strong>.
          </WarningBanner>
        )}

        {/* ── Rango de precios ─────────────────────────────────────────── */}
        <section>
          <p className="section-label">💰 Rango de precios unitarios</p>
          <div className="grid grid-cols-3 gap-3 mb-3">
            <MetricCard label="P25" value={`S/ ${market.p25.toFixed(2)}`} sub={`por ${market.unit}`} />
            <MetricCard label="Mediana" value={`S/ ${market.median.toFixed(2)}`} sub={`por ${market.unit}`} highlight />
            <MetricCard label="P75" value={`S/ ${market.p75.toFixed(2)}`} sub={`por ${market.unit}`} />
          </div>

          {/* Barra visual de rangos */}
          <div className="card p-4">
            <p className="text-xs text-gray-500 mb-3">Distribución del rango de precios</p>
            <div className="relative h-8 flex rounded-xl overflow-hidden text-xs font-semibold">
              <div className="flex-1 bg-emerald-100 flex items-center justify-center text-emerald-700 border-r border-white">
                Competitivo
              </div>
              <div className="flex-1 bg-amber-100 flex items-center justify-center text-amber-700 border-r border-white">
                Con cautela
              </div>
              <div className="flex-1 bg-red-100 flex items-center justify-center text-red-700">
                Alto costo
              </div>
            </div>
            <div className="flex justify-between text-xs text-gray-400 mt-1.5 px-1">
              <span>{'< '}S/ {market.p25.toFixed(2)}</span>
              <span>S/ {market.p25.toFixed(2)} — {market.p75.toFixed(2)}</span>
              <span>{'> '}S/ {market.p75.toFixed(2)}</span>
            </div>
          </div>

          <p className="text-xs text-gray-400 mt-2 text-right">
            {market.adjudicationsCount} adjudicaciones · {market.period}
          </p>
        </section>

        {/* ── Competencia ──────────────────────────────────────────────── */}
        <section>
          <p className="section-label">🏆 Competencia en el mercado</p>
          <div className="grid grid-cols-3 gap-3 mb-3">
            <MetricCard label="Postores (mediana)" value={market.medianBidders} sub="por proceso" />
            <MetricCard label="Postor único" value={`${market.singleBidderPct}%`} sub="de procesos" />
            <MetricCard label="La Libertad" value={market.libertadAdjudications} sub="adjudicaciones" />
          </div>

          <div className={`rounded-2xl p-4 text-sm border ${market.singleBidderPct < 20
            ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
            : 'bg-amber-50 border-amber-200 text-amber-800'}`}>
            {market.singleBidderPct < 20
              ? '📊 Mercado competitivo: la mayoría de procesos tienen varios postores.'
              : '📊 Alta concentración: muchos procesos tienen un solo postor.'}
          </div>
        </section>

        {/* ── Nav ───────────────────────────────────────────────────────── */}
        <div className="flex justify-between pt-2">
          <button onClick={() => goTo(2)} className="btn-secondary">← Cambiar código</button>
          <button onClick={handleContinue} className="btn-primary">
            Ingresar mi costo
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </Layout>
  );
}
