import type { Role } from '../interfaces/models/role';
import type { User as UserInterface } from '../interfaces/models/user';

export class User implements UserInterface {
  id: number;
  name: string;
  email: string;
  avatar_url: string;
  role: Role;
  approved: boolean;

  constructor(
    id: number,
    name: string,
    email: string,
    avatar_url: string,
    role: Role,
    approved: boolean
  ) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.avatar_url = avatar_url;
    this.role = role;
    this.approved = approved;
  }
}
