import { ProfileUser } from "./profileUser.interface";

export interface ListUser {
  username?:string;
  email?:string;
  password?:string;
  passwordConfirm?:string;
  profile?:ProfileUser
}