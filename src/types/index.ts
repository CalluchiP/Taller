// ─── Candidatos CUBSO ────────────────────────────────────────────────────────
export interface CubsoCandidate {
  code: string;
  name: string;
  unit: string;
  probability: number; // 0-1
}

// ─── Datos de mercado ────────────────────────────────────────────────────────
export interface MarketData {
  p25: number;
  median: number;
  p75: number;
  unit: string;
  adjudicationsCount: number;
  period: string;
  // Competencia
  medianBidders: number;
  singleBidderPct: number; // porcentaje 0-100
  libertadAdjudications: number;
}

// ─── Tipos de evidencia ───────────────────────────────────────────────────────
export type EvidenceLevel = 'full' | 'low' | 'none';

// ─── Veredicto ────────────────────────────────────────────────────────────────
export type VerdictType = 'participar' | 'cautela' | 'no_participar' | 'sin_evidencia';
export type ConfidenceLevel = 'alta' | 'media' | 'baja';

export interface Verdict {
  verdict: VerdictType;
  confidence: ConfidenceLevel;
  hasRNPWarning: boolean;
}

// ─── Estado global del wizard ─────────────────────────────────────────────────
export interface WizardState {
  step: number;
  description: string;
  selectedCandidate: CubsoCandidate | null;
  marketData: MarketData | null;
  evidenceLevel: EvidenceLevel;
  cost: number | null;
  hasRNP: boolean | null;
  verdict: Verdict | null;
  errorScreen: boolean;
}
