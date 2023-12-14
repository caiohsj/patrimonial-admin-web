export interface MaterialPossession {
  id: number;
  number: string;
  description: string;
  date_of_aquisition: string;
  aquisition_value: number;
  brand_name: string;
  template_name: string;
  cost_center_id: number;
  cost_center_description: string;
  account_id: number;
  account_description: string;
  residual_value_of_discard: number;
  lifespan: number;
  images_urls: Array<string>;
}
