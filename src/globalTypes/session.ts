export interface IUserLoginRequest {
  name: "string";
  password: "string";
}

export interface IChangePasswordRequest {
  securityAnswer: string;
  newPassword: string;
  confirmNewPassword?: string;
}
