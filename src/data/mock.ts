import type { CubsoCandidate, MarketData } from '../types';

// ─── Candidatos CUBSO mock ────────────────────────────────────────────────────
export const mockCandidates: CubsoCandidate[] = [
  {
    code: '4110150030',
    name: 'PAPEL BOND A4 75 g/m²',
    unit: 'RESMA',
    probability: 0.91,
  },
  {
    code: '4110150021',
    name: 'PAPEL BOND A4 80 g/m²',
    unit: 'RESMA',
    probability: 0.72,
  },
  {
    code: '4110150012',
    name: 'PAPEL BOND A4 60 g/m²',
    unit: 'RESMA',
    probability: 0.38,
  },
];

// ─── Datos de mercado mock (evidencia completa) ───────────────────────────────
export const mockMarketFull: MarketData = {
  p25: 9.50,
  median: 11.80,
  p75: 14.20,
  unit: 'RESMA',
  adjudicationsCount: 384,
  period: '2023 – 2025',
  medianBidders: 4,
  singleBidderPct: 12,
  libertadAdjudications: 47,
};

// ─── Datos de mercado mock (evidencia baja) ───────────────────────────────────
export const mockMarketLow: MarketData = {
  p25: 10.00,
  median: 12.50,
  p75: 15.00,
  unit: 'RESMA',
  adjudicationsCount: 8,
  period: '2023 – 2025',
  medianBidders: 2,
  singleBidderPct: 37,
  libertadAdjudications: 3,
};

// ─── Advertencias generales del proyecto ─────────────────────────────────────
export const projectWarnings: string[] = [
  'La capa gratuita de los LLM tiene límites de consultas; si el servicio falla, reintente en unos minutos.',
  'Solo se analizan adjudicaciones con código CUBSO registrado en moneda soles (2023-2025).',
  'El veredicto es referencial: su validez depende del costo unitario que usted mismo declara.',
  'Algunos códigos CUBSO presentan unidades de medida inconsistentes en el catálogo oficial.',
  'Los datos del año en curso están incompletos; el análisis llega hasta 2025.',
];
