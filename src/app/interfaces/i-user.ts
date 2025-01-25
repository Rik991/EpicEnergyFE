export interface iUser {
  id: number;
  username: string;
  password: string;
  email: string;
  nome: string;
  cognome: string;
  avatar: string;
  roles: Role[];
}

export enum Role {
  ROLE_USER = 'ROLE_USER',
  ROLE_ADMIN = 'ROLE_ADMIN',
}
