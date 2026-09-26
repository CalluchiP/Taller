import { WizardProvider, useWizard } from './context/WizardContext';
import Step1Description from './pages/Step1Description';
import Step2CodeSelection from './pages/Step2CodeSelection';
import Step3Market from './pages/Step3Market';
import Step4Cost from './pages/Step4Cost';
import Step5Verdict from './pages/Step5Verdict';
import ErrorScreen from './pages/ErrorScreen';

// ─── Router interno basado en el estado del wizard ────────────────────────────
function WizardRouter() {
  const { state } = useWizard();

  if (state.errorScreen) return <ErrorScreen />;

  switch (state.step) {
    case 1: return <Step1Description />;
    case 2: return <Step2CodeSelection />;
    case 3: return <Step3Market />;
    case 4: return <Step4Cost />;
    case 5: return <Step5Verdict />;
    default: return <Step1Description />;
  }
}

export default function App() {
  return (
    <WizardProvider>
      <WizardRouter />
    </WizardProvider>
  );
}
