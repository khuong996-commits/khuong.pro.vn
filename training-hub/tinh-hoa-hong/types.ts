
export interface TransactionSummary {
  totalValue: number;
  commissionRate: number;
  hotBonus: number;
  totalExpenses: number;
  bloodCut: number;
  companyCut: number;
  finalCommission: number;
}

export interface SplitDetail {
  name: string;
  role: string;
  percentage: number;
  amount: number;
  calculation?: string;
}

export interface CalculationSteps {
  step1: string;
  step2: string;
  step3: string;
}

export interface CalculationResult {
  summary: TransactionSummary;
  splitDetails: SplitDetail[];
  calculationSteps: CalculationSteps;
  notes?: string;
}