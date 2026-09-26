import React, { createContext, useContext, useState, useCallback } from 'react';
import type { WizardState, CubsoCandidate, MarketData, EvidenceLevel, Verdict } from '../types';

// ─── Estado inicial ────────────────────────────────────────────────────────────
const initialState: WizardState = {
  step: 1,
  description: '',
  selectedCandidate: null,
  marketData: null,
  evidenceLevel: 'full',
  cost: null,
  hasRNP: null,
  verdict: null,
  errorScreen: false,
};

// ─── Contexto ─────────────────────────────────────────────────────────────────
interface WizardContextValue {
  state: WizardState;
  setDescription: (v: string) => void;
  setSelectedCandidate: (c: CubsoCandidate | null) => void;
  setMarketData: (m: MarketData, level: EvidenceLevel) => void;
  setCost: (cost: number | null) => void;
  setHasRNP: (v: boolean) => void;
  setVerdict: (v: Verdict) => void;
  goTo: (step: number) => void;
  nextStep: () => void;
  reset: () => void;
  triggerError: () => void;
}

const WizardContext = createContext<WizardContextValue | undefined>(undefined);

export function WizardProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<WizardState>(initialState);

  const setDescription = useCallback((v: string) =>
    setState(s => ({ ...s, description: v })), []);

  const setSelectedCandidate = useCallback((c: CubsoCandidate | null) =>
    setState(s => ({ ...s, selectedCandidate: c })), []);

  const setMarketData = useCallback((m: MarketData, level: EvidenceLevel) =>
    setState(s => ({ ...s, marketData: m, evidenceLevel: level })), []);

  const setCost = useCallback((cost: number | null) =>
    setState(s => ({ ...s, cost })), []);

  const setHasRNP = useCallback((v: boolean) =>
    setState(s => ({ ...s, hasRNP: v })), []);

  const setVerdict = useCallback((v: Verdict) =>
    setState(s => ({ ...s, verdict: v })), []);

  const goTo = useCallback((step: number) =>
    setState(s => ({ ...s, step })), []);

  const nextStep = useCallback(() =>
    setState(s => ({ ...s, step: s.step + 1 })), []);

  const reset = useCallback(() => setState(initialState), []);

  const triggerError = useCallback(() =>
    setState(s => ({ ...s, errorScreen: true })), []);

  return (
    <WizardContext.Provider value={{
      state, setDescription, setSelectedCandidate, setMarketData,
      setCost, setHasRNP, setVerdict, goTo, nextStep, reset, triggerError,
    }}>
      {children}
    </WizardContext.Provider>
  );
}

export function useWizard() {
  const ctx = useContext(WizardContext);
  if (!ctx) throw new Error('useWizard must be used inside WizardProvider');
  return ctx;
}
