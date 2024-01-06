import type { Role } from './role';

export interface User {
  id: number;
  name: string;
  email: string;
  avatar: string;
  role: Role;
  approved: boolean;
}
