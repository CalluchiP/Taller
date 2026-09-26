// Layout moderno con sidebar de progreso lateral
import StepIndicator from './StepIndicator';

interface Props {
  step: number;
  children: React.ReactNode;
  /** Si true, usa layout de pantalla completa sin el panel lateral */
  fullWidth?: boolean;
}

export default function Layout({ step, children, fullWidth }: Props) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-slate-50 flex flex-col">

      {/* ── Top Bar ──────────────────────────────────────────────── */}
      <header className="sticky top-0 z-20 border-b border-white/80 bg-white/80 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-gradient-to-br from-blue-600 to-blue-800 rounded-xl flex items-center justify-center shadow-md shadow-blue-200">
              <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <div>
              <p className="font-bold text-gray-900 text-sm leading-none">LicitaFácil</p>
              <p className="text-xs text-gray-400 leading-none mt-0.5">Evaluador de licitaciones</p>
            </div>
          </div>

          {/* Stepper en el header (desktop) */}
          {!fullWidth && (
            <div className="hidden md:block">
              <StepIndicator currentStep={step} compact />
            </div>
          )}

          {/* Badge de estado */}
          <div className="flex items-center gap-2 text-xs text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-full">
            <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
            Datos 2023-2025
          </div>
        </div>
      </header>

      {/* ── Stepper móvil ────────────────────────────────────────── */}
      {!fullWidth && (
        <div className="md:hidden bg-white border-b border-gray-100 px-4 py-4">
          <StepIndicator currentStep={step} />
        </div>
      )}

      {/* ── Contenido principal ───────────────────────────────────── */}
      <main className={`flex-1 w-full ${fullWidth ? '' : 'max-w-3xl mx-auto'} px-4 md:px-6 py-8`}>
        {children}
      </main>

      {/* ── Footer ───────────────────────────────────────────────── */}
      <footer className="border-t border-gray-200/80 bg-white/60 backdrop-blur-sm py-4 px-6">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2 text-xs text-gray-400">
          <span>© 2026 LicitaFácil · Taller Integrador 1 — UPAO</span>
          <span>Datos OECE · Solo bienes con código CUBSO en soles</span>
        </div>
      </footer>

    </div>
  );
}
