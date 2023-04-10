import type { Branch } from './branch';
export interface Place {
  id: number;
  description: string;
  branch: Branch;
}
