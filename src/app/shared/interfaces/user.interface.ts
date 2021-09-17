import { Awards } from './awards.interface';
import { Roles } from './roles.interface';

export interface User {
  id: string;
  name: string;
  surname: string;
  username: string;
  email: string;
  password?: string;
  picture: string;
  roles: Roles[];
  awards: Awards[];
  notes?: [];
}
