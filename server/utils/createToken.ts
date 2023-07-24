import { UserType } from '../types';

const createTokenUser = (user: UserType) => {
  return {
    name: user.user_name,
    user_email: user.user_email,
    user_id: user._id,
    user_roles: user.user_roles,
  };
};

export default createTokenUser;
