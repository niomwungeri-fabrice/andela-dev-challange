/* Code modified from a file obtained from https://github.com/olawalejarvis/reflection_app_server */
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const Helper = {
  hashPassword(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8));
  },
  comparePassword(hashPassword, password) {
    return bcrypt.compareSync(password, hashPassword);
  },
  // not working as expected
  isValidEmail(email) {
    return /\S+@\S+\.\S+/.test(email);
  },
  isValidateEmpty(email, password) {
    if (!email || !password) {
      return true;
    }
    return false;
  },
  generateToken(id) {
    const token = jwt.sign({
      userId: id,
    },
    process.env.SECRET, { expiresIn: '7d' });
    return token;
  },
};

export default Helper;
