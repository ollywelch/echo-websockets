export interface User {
  username: string;
}

export interface UserCreate extends User {
  password: string;
}
