import { UserType } from '../types';

const createTokenUser = (user: UserType) => {
  let roles = Object.values(user.user_roles);
  roles = roles.filter((role) => role && role !== null);
  return {
    name: user.user_name,
    user_email: user.user_email,
    user_id: user._id,
    user_roles: roles,
  };
};

export default createTokenUser;
