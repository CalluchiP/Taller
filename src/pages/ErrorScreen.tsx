// ─── Pantalla de Error genérico ───────────────────────────────────────────────
import { useWizard } from '../context/WizardContext';

export default function ErrorScreen() {
  const { reset } = useWizard();

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header mínimo */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-3xl mx-auto px-4 py-3 flex items-center gap-2">
          <div className="w-7 h-7 bg-primary-700 rounded flex items-center justify-center">
            <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          </div>
          <span className="font-semibold text-gray-900 text-sm">LicitaFácil</span>
        </div>
      </header>

      {/* Contenido centrado */}
      <main className="flex-1 flex items-center justify-center px-4">
        <div className="max-w-md w-full text-center space-y-6">
          {/* Ícono de error */}
          <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto">
            <svg className="w-10 h-10 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>

          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Error de servicio</h1>
            <p className="text-gray-500 text-sm leading-relaxed">
              El servicio no está disponible en este momento, posiblemente por límites de la API.
              Puede reintentar la consulta.
            </p>
          </div>

          <div className="card p-4 bg-amber-50 border-amber-200 text-left text-sm text-amber-800">
            <p className="font-medium mb-1">⚠️ Importante</p>
            <p>Los datos ingresados hasta este punto <strong>no se conservan</strong>. Al reintentar deberá ingresar nuevamente su descripción y costo.</p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={reset}
              className="btn-primary"
            >
              🔄 Reintentar desde el inicio
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
