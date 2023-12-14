import type { EconomicDepreciation } from './EconomicDepreciation';
import type { TaxDepreciation } from './TaxDepreciation';

export interface Show {
  id: number;
  number: string;
  description: string;
  age: number;
  deprecated: boolean;
  date_of_aquisition: string;
  aquisition_value: number;
  brand_name: string;
  template_name: string;
  cost_center_description: string;
  account_description: string;
  residual_value_of_discard: number;
  lifespan: number;
  place_description: string;
  branch_description: string;
  images_urls: Array<string>;
  economic_depreciation: EconomicDepreciation | null;
  tax_depreciation: TaxDepreciation | null;
  cost_center_id: number;
  account_id: number;
}
