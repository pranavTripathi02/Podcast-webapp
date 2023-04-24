import bcryptjs from 'bcryptjs';
require('dotenv').config();
const test = async () => {
        const salt = await bcryptjs.genSalt(10);
        console.log(salt)
  const var1 = await bcryptjs.hash(`${process.env.BCRYPT_STRING}`, salt);
  console.log(var1);
};
test();

