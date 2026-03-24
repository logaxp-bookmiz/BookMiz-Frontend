export interface IRegister {
  email: string;
  firstname: string;
  lastname: string;
  phoneNumber: string;
  password: string;
}

export interface ILogin {
  email: string;
  password: string;
}

export interface IVerifyEmail {
  email: string;
  code: string;
}