// StepIndicator — soporta modo compacto (header) y modo normal (móvil)
interface Props {
  currentStep: number; // 1-5
  compact?: boolean;
}

const STEPS = [
  { n: 1, label: 'Descripción', icon: '📝' },
  { n: 2, label: 'Código',      icon: '🔎' },
  { n: 3, label: 'Mercado',     icon: '📊' },
  { n: 4, label: 'Costo',       icon: '💰' },
  { n: 5, label: 'Veredicto',   icon: '✅' },
];

export default function StepIndicator({ currentStep, compact }: Props) {
  if (compact) {
    // Versión compacta para el header
    return (
      <div className="flex items-center gap-1">
        {STEPS.map((step, idx) => {
          const done   = currentStep > step.n;
          const active = currentStep === step.n;
          return (
            <div key={step.n} className="flex items-center">
              <div
                title={step.label}
                className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold border-2 transition-all
                  ${done   ? 'bg-blue-600 border-blue-600 text-white'
                  : active ? 'bg-white border-blue-600 text-blue-600'
                  :          'bg-white border-gray-200 text-gray-400'}`}
              >
                {done ? '✓' : step.n}
              </div>
              {idx < STEPS.length - 1 && (
                <div className={`w-5 h-0.5 mx-0.5 rounded transition-colors ${done ? 'bg-blue-500' : 'bg-gray-200'}`} />
              )}
            </div>
          );
        })}
      </div>
    );
  }

  // Versión completa
  return (
    <nav aria-label="Progreso" className="w-full">
      <ol className="flex items-center">
        {STEPS.map((step, idx) => {
          const done   = currentStep > step.n;
          const active = currentStep === step.n;
          return (
            <li key={step.n} className="flex items-center flex-1 last:flex-none">
              <div className="flex flex-col items-center gap-1 shrink-0">
                <div
                  className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold border-2 transition-all duration-300
                    ${done   ? 'bg-blue-600 border-blue-600 text-white shadow-md shadow-blue-200'
                    : active ? 'bg-white border-blue-600 text-blue-600 shadow-md shadow-blue-100 scale-110'
                    :          'bg-white border-gray-200 text-gray-400'}`}
                >
                  {done ? (
                    <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  ) : step.n}
                </div>
                <span className={`text-xs font-semibold transition-colors ${active ? 'text-blue-600' : done ? 'text-blue-500' : 'text-gray-400'}`}>
                  {step.label}
                </span>
              </div>
              {idx < STEPS.length - 1 && (
                <div className={`flex-1 h-0.5 mt-[-16px] mx-1 rounded transition-all duration-500 ${done ? 'bg-blue-500' : 'bg-gray-200'}`} />
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
