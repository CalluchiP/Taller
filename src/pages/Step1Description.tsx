// ─── Pantalla 1: Descripción del bien — Split Layout ─────────────────────────
import { useState } from 'react';
import Layout from '../components/Layout';
import { useWizard } from '../context/WizardContext';

export default function Step1Description() {
  const { state, setDescription, nextStep } = useWizard();
  const [value, setValue] = useState(state.description);
  const [touched, setTouched] = useState(false);

  const isEmpty  = touched && value.trim().length === 0;
  const isShort  = touched && value.trim().length > 0 && value.trim().length < 10;
  const hasError = isEmpty || isShort;

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setTouched(true);
    if (value.trim().length >= 10) {
      setDescription(value.trim());
      nextStep();
    }
  }

  return (
    <Layout step={1} fullWidth>
      {/* ── Split container ───────────────────────────────────────────── */}
      <div className="min-h-[calc(100vh-130px)] flex flex-col lg:flex-row">

        {/* ── Panel izquierdo: Imagen hero ─────────────────────────────── */}
        <div className="relative lg:w-1/2 min-h-64 lg:min-h-full overflow-hidden bg-blue-900">
          {/* Imagen */}
          <img
            src="/licitacion-hero.jpg"
            alt="Reunión de licitación pública"
            className="absolute inset-0 w-full h-full object-cover opacity-80"
          />
          {/* Overlay degradado */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900/70 via-blue-800/50 to-slate-900/80" />

          {/* Contenido sobre la imagen */}
          <div className="relative z-10 h-full flex flex-col justify-end p-8 lg:p-12">
            <div className="animate-fade-slide-up">
              <span className="inline-block bg-white/20 backdrop-blur-sm text-white text-xs font-semibold px-3 py-1 rounded-full border border-white/30 mb-4">
                🇵🇪 Mercado de licitaciones — Perú
              </span>
              <h2 className="text-3xl lg:text-4xl font-bold text-white leading-tight mb-3">
                ¿Es rentable vender al Estado?
              </h2>
              <p className="text-blue-100 text-sm leading-relaxed mb-6 max-w-sm">
                Analice el mercado de adjudicaciones públicas y reciba un veredicto basado en datos reales del OECE (2023-2025).
              </p>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-3">
                {[
                  { value: '+384', label: 'adjudicaciones' },
                  { value: '3',   label: 'agentes IA' },
                  { value: '95%', label: 'precisión ref.' },
                ].map(s => (
                  <div key={s.label} className="bg-white/10 backdrop-blur-sm rounded-xl p-3 border border-white/20 text-center">
                    <p className="text-xl font-bold text-white">{s.value}</p>
                    <p className="text-xs text-blue-200 mt-0.5">{s.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ── Panel derecho: Formulario ────────────────────────────────── */}
        <div className="lg:w-1/2 flex items-center justify-center p-8 lg:p-14 bg-white">
          <div className="w-full max-w-md animate-fade-slide-up delay-100">

            {/* Pasos mobile */}
            <div className="lg:hidden mb-6 p-4 bg-blue-50 rounded-2xl">
              <p className="text-xs font-semibold text-blue-600 mb-1">Paso 1 de 5</p>
              <div className="h-1.5 bg-blue-100 rounded-full">
                <div className="h-full w-[20%] bg-blue-600 rounded-full" />
              </div>
            </div>

            {/* Encabezado */}
            <div className="mb-8">
              <p className="section-label">Paso 1 de 5</p>
              <h1 className="page-title">¿Qué bien vende su empresa?</h1>
              <p className="page-subtitle text-sm">
                Descríbalo con sus propias palabras. Cuanto más detallada sea la descripción, más precisa será la clasificación en el catálogo estatal.
              </p>
            </div>

            <form onSubmit={handleSubmit} noValidate className="space-y-5">

              {/* Textarea */}
              <div>
                <label htmlFor="description" className="label">
                  Descripción del bien <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="description"
                  rows={5}
                  placeholder="Ej: Resmas de papel bond A4 de 75 g/m², para uso en impresoras láser y de inyección de tinta."
                  value={value}
                  onChange={e => { setValue(e.target.value); setTouched(false); }}
                  onBlur={() => setTouched(true)}
                  className={`input-field resize-none text-sm ${hasError ? 'input-error' : ''}`}
                />
                {/* Mensajes de validación */}
                {isEmpty && (
                  <p className="mt-2 text-sm text-red-600 flex items-center gap-1.5 animate-fade-in">
                    <svg className="w-4 h-4 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    Este campo es obligatorio.
                  </p>
                )}
                {isShort && !isEmpty && (
                  <p className="mt-2 text-sm text-amber-600 flex items-center gap-1.5 animate-fade-in">
                    <svg className="w-4 h-4 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    La descripción es muy corta. Agregue más detalles técnicos.
                  </p>
                )}
                <div className="flex justify-between mt-1.5">
                  <p className="text-xs text-gray-400">Mínimo 10 caracteres</p>
                  <p className={`text-xs font-medium transition-colors ${value.length >= 10 ? 'text-emerald-600' : 'text-gray-400'}`}>
                    {value.length} / 10+
                  </p>
                </div>
              </div>

              {/* Tips */}
              <div className="bg-blue-50 border border-blue-100 rounded-xl p-4">
                <p className="text-xs font-semibold text-blue-700 mb-2">💡 ¿Qué incluir en la descripción?</p>
                <ul className="space-y-1">
                  {[
                    'Nombre del producto o bien',
                    'Material o composición (ej. papel, acero, PVC)',
                    'Especificación técnica (gramaje, capacidad, dimensiones)',
                    'Uso típico del bien',
                  ].map(tip => (
                    <li key={tip} className="flex gap-2 text-xs text-blue-600">
                      <span className="text-blue-400 shrink-0">•</span> {tip}
                    </li>
                  ))}
                </ul>
              </div>

              {/* CTA */}
              <button type="submit" className="btn-primary w-full justify-center text-base py-3.5">
                Buscar código CUBSO
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>

              <p className="text-center text-xs text-gray-400">
                Sus datos no se guardan en ningún servidor.
              </p>
            </form>
          </div>
        </div>

      </div>
    </Layout>
  );
}
