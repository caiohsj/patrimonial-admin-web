import type { EconomicDepreciation } from './EconomicDepreciation';
import type { TaxDepreciation } from './TaxDepreciation';

export interface Index {
  id: number;
  number: string;
  description: string;
  date_of_aquisition: string;
  aquisition_value: number;
  place_description: string;
  branch_description: string;
  brand_name: string | null;
  template_name: string | null;
  cost_center_description: string | null;
  account_description: string | null;
  residual_value_of_discard: number;
  lifespan: number;
  approved: boolean;
  deprecated: boolean;
  economic_depreciation: EconomicDepreciation | null;
  tax_depreciation: TaxDepreciation | null;
}
