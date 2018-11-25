/* Code modified from a file obtained from https://github.com/olawalejarvis/reflection_app_server */
import moment from 'moment';
import uuidv4 from 'uuid/v4';
import Helper from './Helper-controller';
import db from '../db';
import User from '../model/user';

const Users = {
  // Register a user
  async signup(req, res) {
    const {
      email, username, firstName, lastName, userRole, password,
    } = req.body;
    const newUser = new User(uuidv4(), email, username, firstName, lastName, userRole,
      Helper.hashPassword(password), moment(new Date()), moment(new Date()));
    if (!req.body.email || !req.body.password) {
      return res.status(400).send({
        message: 'Email and Password are required', status: 400,
      });
    }
    if (!Helper.isValidEmail(req.body.email)) {
      return res.status(400).send({
        message: 'Please enter a valid email address', status: 400,
      });
    }
    if (req.body.routine === '_bt_check_unique') {
      return res.status(400).send({ message: 'User already exist', status: 400 });
    }
    const createQuery = `INSERT INTO
      users(id, email, username, first_name, last_name, user_role, password, created_date, modified_date)
      VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9)
      returning *`;
    try {
      const { rows } = await db.query(createQuery, Object.values(newUser));
      return res.status(201).send({ message: 'Account Created Successfully', data: rows[0], status: 201 });
    } catch (error) {
      return res.status(400).send(error);
    }
  },
  // Login a user
  async signin(req, res) {
    if (!req.body.email || !req.body.password) {
      console.log(req.body.email);
      return res.status(400).send({ message: 'Email and Password are required', status: 400 });
    }
    if (!Helper.isValidEmail(req.body.email)) {
      console.log(req.body.email, req.body.password);
      return res.status(400).send({ message: 'Please enter a valid email address', status: 400 });
    }
    const text = 'SELECT * FROM users WHERE email = $1';
    try {
      const { rows } = await db.query(text, [req.body.email]);
      if (!rows[0]) {
        return res.status(400).send({ message: 'The credentials you provided is incorrect', status: 400 });
      }
      console.log(req.body.email);
      // const token = Helper.generateToken(rows[0].id);
      return res.status(200).send({ message: 'Successfully logged in' });
    } catch (error) {
      console.log(error);
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
  async allUser(req, res) {
    const text = 'SELECT * FROM users WHERE email = $1';
    try {
      const { rows } = await db.query(text, [req.params.userId]);
      return res.status(200).send(rows[0]);
    } catch (error) {
      console.log(error.stack);
      return res.status(400).send(error);
    }
  },
};

export default Users;
