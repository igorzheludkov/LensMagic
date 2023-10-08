import { IUserCreds } from 'app/types/IAuth';
import { IUser } from 'app/types/IProfile';

export interface IUserReg {
  creds: IUserCreds;
  profile: IUser;
}
