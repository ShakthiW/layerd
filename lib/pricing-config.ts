// ============================================================
// PRICING CONFIGURATION — Edit these values as costs change
// ============================================================

export const PRICING_CONFIG = {
  // Material cost per kilogram (LKR)
  materialCostPerKg: 3500,

  // Machine depreciation cost per print-hour (LKR)
  hourlyRate: 500,

  // Electricity cost per print-hour (LKR)
  electricityRate: 50,

  // Flat labor cost per job (LKR)
  laborCost: 300,

  // Failure margin — buffer for failed/defective prints (e.g. 0.10 = 10%)
  failureMargin: 0.1,

  // Profit margin (e.g. 0.35 = 35%)
  profitMargin: 0.35,
};

// Material multipliers — some materials cost more than the base
export const MATERIAL_MULTIPLIERS: Record<string, number> = {
  PLA: 1.0,
  PETG: 1.25,
  ABS: 1.15,
};

// Finish surcharges — flat surcharge added per job (LKR)
export const FINISH_SURCHARGES: Record<string, number> = {
  Standard: 0,
  Smoothed: 250,
  Painted: 600,
};

// Available materials for the UI
export const MATERIALS = [
  {
    id: "PLA",
    label: "PLA",
    description: "Most popular, great surface finish",
  },
  {
    id: "PETG",
    label: "PETG",
    description: "Stronger, heat & chemical resistant",
  },
  { id: "ABS", label: "ABS", description: "Tough & impact resistant" },
];

// Available finishes for the UI
export const FINISHES = [
  {
    id: "Standard",
    label: "Standard",
    description: "Straight off the printer",
  },
  {
    id: "Smoothed",
    label: "Smoothed",
    description: "Sanded & polished surface",
  },
  {
    id: "Painted",
    label: "Painted",
    description: "Hand-painted with your colour choice",
  },
];

// ============================================================
// PRICE CALCULATOR
// ============================================================

export interface PriceInput {
  weightGrams: number;
  printTimeHours: number;
  material: string;
  finish: string;
  quantity: number;
}

export interface PriceBreakdown {
  materialCost: number;
  machineTimeCost: number;
  electricityCost: number;
  laborCost: number;
  subtotal: number;
  failureBuffer: number;
  profitAmount: number;
  unitPrice: number;
  totalPrice: number;
}

export function calculatePrice(input: PriceInput): PriceBreakdown {
  const {
    materialCostPerKg,
    hourlyRate,
    electricityRate,
    laborCost,
    failureMargin,
    profitMargin,
  } = PRICING_CONFIG;

  const materialMultiplier = MATERIAL_MULTIPLIERS[input.material] ?? 1;
  const finishSurcharge = FINISH_SURCHARGES[input.finish] ?? 0;

  // Base costs
  const materialCost =
    (input.weightGrams / 1000) * materialCostPerKg * materialMultiplier;
  const machineTimeCost = input.printTimeHours * hourlyRate;
  const electricityCost = input.printTimeHours * electricityRate;

  // Subtotal before margins
  const subtotal =
    materialCost +
    machineTimeCost +
    electricityCost +
    laborCost +
    finishSurcharge;

  // Apply failure margin
  const afterFailure = subtotal * (1 + failureMargin);
  const failureBuffer = afterFailure - subtotal;

  // Apply profit margin
  const unitPrice = afterFailure * (1 + profitMargin);
  const profitAmount = unitPrice - afterFailure;

  // Total with quantity
  const totalPrice = unitPrice * input.quantity;

  return {
    materialCost: Math.round(materialCost),
    machineTimeCost: Math.round(machineTimeCost),
    electricityCost: Math.round(electricityCost),
    laborCost: Math.round(laborCost + finishSurcharge),
    subtotal: Math.round(subtotal),
    failureBuffer: Math.round(failureBuffer),
    profitAmount: Math.round(profitAmount),
    unitPrice: Math.round(unitPrice),
    totalPrice: Math.round(totalPrice),
  };
}
