import { Role } from '../enums/role.enum';
import {Awards} from "./awards.interface";

export interface User {
  id?: string;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password?: string;
  profileImageUrl?: string;
  role?: Role;
  active?: boolean;
  locked?: boolean;
  awards: Awards[];
}
