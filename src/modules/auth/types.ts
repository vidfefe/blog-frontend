export interface User {
  id: string;
  fullname: string;
  email: string;
  avatarUrl: string;
  token?: string;
}

export interface AuthCredentials {
  token: string;
  user: User;
}