/* eslint-disable consistent-return */
/* Code modified from a file obtained from https://github.com/olawalejarvis/reflection_app_server */
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const Helper = {
  // function copied from https://www.w3resource.com/javascript/form/email-validation.php
  isValidEmail(email) {
    // eslint-disable-next-line no-useless-escape
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      return true;
    }
    return false;
  },
  hashPassword(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8));
  },

  comparePassword(hashPassword, password) {
    return bcrypt.compareSync(password, hashPassword);
  },
  userValidator(req, res, next) {
    if (Helper.isValidatEmpty(req.body.email, req.body.password)) {
      return res.status(400).send({ message: 'Email and Password are required', status: 400 });
    }
    if (!Helper.isValidEmail(req.body.email)) {
      return res.status(400).send({ message: 'Please enter a valid email address', status: 400 });
    }
    next();
  },
  parcelValidor(req, res, next) {
    const {
      location, destination, presentLocation, weight, receiverPhone,
    } = req.body;
    if (typeof weight !== 'number' || weight <= 0) {
      return res.status(400).send({
        message: 'Weight must be a number and greater than zero', status: 400,
      });
    }
    if (typeof location !== 'string' || typeof destination !== 'string'
    || typeof presentLocation !== 'string' || typeof receiverPhone !== 'string') {
      return res.status(400).send({
        message: 'location, destination, presentation location, phone must be strings', status: 400,
      });
    }
    if (location.length <= 3 || destination.length <= 3
    || presentLocation.length <= 3 || receiverPhone.length < 9) {
      return res.status(400).send({
        message: 'location, destination, presentation location must be greater than 3 digits and phone number greater than 9', status: 400,
      });
    }
    next();
  },
  isValidatEmpty(input) {
    if (!input) {
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
