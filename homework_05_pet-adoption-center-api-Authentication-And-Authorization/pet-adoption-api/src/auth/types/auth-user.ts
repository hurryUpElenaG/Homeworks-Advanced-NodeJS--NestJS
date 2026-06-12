import type { UserRole } from '../../user/enums/user-role.enum';

export interface AuthUser {
  id: string;
  username: string; 
  role: UserRole;
}
