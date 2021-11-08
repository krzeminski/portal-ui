import { User } from '../interfaces/user.interface';
import { Role } from '../enums/role.enum';

export const user: User = {
  id: '1',
  firstName: '',
  lastName: '',
  username: '',
  email: '',
  profileImageUrl: 'url',
  role: Role.USER,
  awards: [],
};
