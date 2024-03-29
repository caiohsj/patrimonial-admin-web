export interface CreateMaterialPossessionFormData {
  description: string;
  number: string;
  template_name: string;
  brand_name: string;
  date_of_aquisition: string;
  aquisition_value: string;
  cost_center_id: number | null;
  account_id: number | null;
  residual_value_of_discard: string;
  lifespan: number | null;
}
