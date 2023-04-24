const createTokenUser = (user) => {
  return {
    name: user.name,
    user_id: user._id,
  };
};

export default createTokenUser;
