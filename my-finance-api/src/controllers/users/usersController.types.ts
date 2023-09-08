export interface UsersControllerBody {
  email: string;
  password: string;
  photoUrl: string;
  name: string;
}

export interface UsersShowParams {
  userId?: string;
}
