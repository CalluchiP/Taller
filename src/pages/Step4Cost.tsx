// ─── Pantalla 4: Ingreso de costo ─────────────────────────────────────────────
import { useState } from 'react';
import Layout from '../components/Layout';
import WarningBanner from '../components/WarningBanner';
import { useWizard } from '../context/WizardContext';
import type { Verdict } from '../types';
import { mockMarketFull } from '../data/mock';

export default function Step4Cost() {
  const { state, setCost, setHasRNP, setVerdict, nextStep, goTo } = useWizard();
  const candidate = state.selectedCandidate;
  const market = state.marketData ?? mockMarketFull;

  const [costInput, setCostInput] = useState(state.cost !== null ? String(state.cost) : '');
  const [rnp, setRnp] = useState<'yes' | 'no' | null>(
    state.hasRNP === true ? 'yes' : state.hasRNP === false ? 'no' : null
  );
  const [touched, setTouched] = useState(false);

  const costNum = parseFloat(costInput.replace(',', '.'));
  const isValidCost = !isNaN(costNum) && costNum > 0;
  const showCostError = touched && (!costInput || !isValidCost);

  // Preview del veredicto en tiempo real
  const previewVerdict = isValidCost
    ? costNum < market.p25 ? 'participar'
    : costNum <= market.p75 ? 'cautela'
    : 'no_participar'
    : null;

  const PREVIEW_CONFIG = {
    participar:    { label: 'Podría participar', color: 'text-emerald-600 bg-emerald-50 border-emerald-200' },
    cautela:       { label: 'Participar con cautela', color: 'text-amber-600 bg-amber-50 border-amber-200' },
    no_participar: { label: 'No se recomienda participar', color: 'text-red-600 bg-red-50 border-red-200' },
  };

  function computeVerdict(): Verdict {
    let verdict: Verdict['verdict'] = costNum < market.p25 ? 'participar' : costNum <= market.p75 ? 'cautela' : 'no_participar';
    const confidence: Verdict['confidence'] = state.evidenceLevel === 'low' ? 'baja'
      : market.adjudicationsCount >= 100 ? 'alta' : 'media';
    return { verdict, confidence, hasRNPWarning: rnp === 'no' };
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setTouched(true);
    if (!isValidCost) return;
    setCost(costNum);
    setHasRNP(rnp === 'yes');
    setVerdict(computeVerdict());
    nextStep();
  }

  return (
    <Layout step={4}>
      <div className="space-y-6 animate-fade-slide-up">

        {/* ── Encabezado ──────────────────────────────────────────────── */}
        <div>
          <p className="section-label">Paso 4 de 5</p>
          <h1 className="page-title">Ingrese su costo unitario</h1>
          <p className="page-subtitle text-sm">
            Ingrese el costo mínimo rentable por <strong>{candidate?.unit ?? 'unidad'}</strong> para compararlo con el mercado.
          </p>
        </div>

        <form onSubmit={handleSubmit} noValidate className="space-y-6">

          {/* ── Campo de costo ──────────────────────────────────────── */}
          <div>
            <label htmlFor="cost" className="label">
              Costo unitario mínimo rentable <span className="text-red-500">*</span>
            </label>
            <div className="relative flex items-center">
              <span className="absolute left-4 text-gray-500 font-bold text-lg">S/</span>
              <input
                id="cost"
                type="number"
                min="0.01"
                step="0.01"
                placeholder="0.00"
                value={costInput}
                onChange={e => { setCostInput(e.target.value); setTouched(false); }}
                onBlur={() => setTouched(true)}
                className={`input-field pl-12 pr-28 text-xl font-bold ${showCostError ? 'input-error' : ''}`}
              />
              <span className="absolute right-4 text-sm text-gray-500 font-semibold bg-gray-100 px-2.5 py-1 rounded-lg">
                / {candidate?.unit ?? 'UNIDAD'}
              </span>
            </div>
            {showCostError && (
              <p className="mt-2 text-sm text-red-600 flex items-center gap-1.5 animate-fade-in">
                <svg className="w-4 h-4 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                Ingrese un número positivo válido.
              </p>
            )}

            {/* Preview en tiempo real */}
            {previewVerdict && (
              <div className={`mt-3 flex items-center gap-2 px-3 py-2 rounded-xl border text-xs font-semibold animate-fade-in ${PREVIEW_CONFIG[previewVerdict].color}`}>
                <span>Vista previa:</span>
                <span>{PREVIEW_CONFIG[previewVerdict].label}</span>
              </div>
            )}
          </div>

          {/* ── Qué incluir ──────────────────────────────────────────── */}
          <WarningBanner variant="info">
            <strong>¿Qué incluir en el costo?</strong>
            <div className="grid grid-cols-2 gap-1 mt-2">
              {['Costo de compra / producción', 'Flete y transporte', 'Almacenamiento y embalaje', 'IGV (si aplica)'].map(item => (
                <p key={item} className="flex gap-1.5 text-xs"><span className="text-blue-400">✓</span>{item}</p>
              ))}
            </div>
          </WarningBanner>

          {/* ── RNP ──────────────────────────────────────────────────── */}
          <div>
            <p className="label">¿Cuenta con RNP vigente?</p>
            <div className="grid grid-cols-2 gap-3">
              {(['yes', 'no'] as const).map(opt => (
                <button
                  key={opt}
                  type="button"
                  onClick={() => setRnp(opt)}
                  className={`py-3 px-4 rounded-2xl border-2 text-sm font-semibold transition-all duration-150 active:scale-95
                    ${rnp === opt
                      ? opt === 'yes'
                        ? 'border-emerald-500 bg-emerald-50 text-emerald-700 shadow-md shadow-emerald-100'
                        : 'border-amber-500 bg-amber-50 text-amber-700 shadow-md shadow-amber-100'
                      : 'border-gray-200 text-gray-500 hover:border-gray-300 hover:bg-gray-50'}`}
                >
                  {opt === 'yes' ? '✅ Sí, tengo RNP' : '⚠️ No tengo RNP'}
                </button>
              ))}
            </div>
            {rnp === 'no' && (
              <WarningBanner variant="warning" className="mt-3">
                Puede continuar, pero el veredicto incluirá una advertencia. El RNP es obligatorio para licitar.
              </WarningBanner>
            )}
          </div>

          {/* ── Referencia de mercado ─────────────────────────────────── */}
          <div className="card bg-gradient-to-r from-blue-600 to-blue-800 border-0 p-5 text-white">
            <p className="text-xs font-bold uppercase tracking-widest text-blue-200 mb-3">Referencia del mercado</p>
            <div className="grid grid-cols-3 gap-2 text-center">
              {[
                { l: 'P25', v: market.p25 },
                { l: 'Mediana', v: market.median },
                { l: 'P75', v: market.p75 },
              ].map(m => (
                <div key={m.l} className="bg-white/10 rounded-xl p-3">
                  <p className="text-xs text-blue-200">{m.l}</p>
                  <p className="font-bold text-lg">S/ {m.v.toFixed(2)}</p>
                  <p className="text-xs text-blue-300">/{candidate?.unit ?? 'RESMA'}</p>
                </div>
              ))}
            </div>
          </div>

          {/* ── Nav ──────────────────────────────────────────────────── */}
          <div className="flex justify-between pt-2">
            <button type="button" onClick={() => goTo(3)} className="btn-secondary">← Ver mercado</button>
            <button type="submit" className="btn-primary">
              Ver veredicto
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </form>
      </div>
    </Layout>
  );
}
