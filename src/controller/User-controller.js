/* Code modified from a file obtained from https://github.com/olawalejarvis/reflection_app_server */
import moment from 'moment';
import uuidv4 from 'uuid/v4';
import Helper from './Helper-controller';
import db from '../db';
import User from '../model/user';

const Users = {
  async signup(req, res) {
    const {
      email, username, firstName, lastName, userRole, password,
    } = req.body;
    let result = {};
    const newUser = new User(uuidv4(), email, username, firstName, lastName, userRole,
      Helper.hashPassword(password), moment(new Date()), moment(new Date()));
    if (Helper.isValidateEmpty(req.body.email, req.body.password)) {
      result = res.status(400).send({ message: 'Email and Password are required', status: 400 });
    }
    if (!Helper.isValidEmail(req.body.email)) { return res.status(400).send({ message: 'Please enter a valid email address', status: 400 }); }
    if (req.body.routine === '_bt_check_unique') { return res.status(400).send({ message: 'User already exist', status: 400 }); }
    const createQuery = 'INSERT INTO users(id, email, username, first_name, last_name, user_role, password, created_date, modified_date) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9) returning *';
    try {
      const { rows } = await db.query(createQuery, Object.values(newUser));
      const token = Helper.generateToken(rows[0].id);
      result = res.status(201).send({
        message: 'Account Created Successfully', status: 201, data: rows[0], token,
      });
    } catch (error) {
      result = res.status(400).send(error);
    }
    return result;
  },
  // Login a user
  async login(req, res) {
    let result = {};
    if (Helper.isValidateEmpty(req.body.email, req.body.password)) {
      result = res.status(400).send({ message: 'Email and Password are required', status: 400 });
    }
    if (!Helper.isValidEmail(req.body.email)) {
      result = res.status(400).send({ message: 'Please enter a valid email address', status: 400 });
    }
    const text = 'SELECT * FROM users WHERE email = $1';
    try {
      const { rows } = await db.query(text, [req.body.email]);
      if (!rows[0]) {
        result = res.status(400).send({ message: 'The credentials you provided is incorrect', status: 400 });
      }
      const token = Helper.generateToken(rows[0].id);
      result = res.status(200).send({ message: 'Successfully logged in', token });
    } catch (error) {
      result = res.status(400).send(error);
    }
    return result;
  },
  async userByEmail(req, res) {
    const text = 'SELECT * FROM users WHERE email = $1';
    try {
      const { rows, rowCount } = await db.query(text, [req.params.userId]);
      return res.status(200).send({
        message: 'Success', status: 200, rowCount, data: rows[0],
      });
    } catch (error) {
      return res.status(400).send(error);
    }
  },
  async delete(req, res) {
    const deleteQuery = 'DELETE FROM users WHERE email = $1 returning *';
    try {
      const { rows } = await db.query(deleteQuery, [req.params.userId]);
      if (!rows[0]) {
        return res.status(404).send({ message: 'user not found', status: 404 });
      }
      return res.status(204).send({ message: 'deleted', status: 204 });
    } catch (error) {
      return res.status(400).send({ message: error, status: 400 });
    }
  },
};

export default Users;
