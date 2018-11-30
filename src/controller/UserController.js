/* Code modified from a file obtained from https://github.com/olawalejarvis/reflection_app_server */
import moment from 'moment';
import uuidv4 from 'uuid/v4';
import Helper from './HelperController';
import db from '../db';
import User from '../model/user';

const userRoles = {
  ADMIN: 'ADMIN',
  NORMAL: 'NORMAL',
};
const Users = {
  async signup(req, res) {
    const {
      email, username, firstName, lastName, password,
    } = req.body;

    const newUser = new User(uuidv4(), email, username, firstName, lastName, userRoles.NORMAL,
      Helper.hashPassword(password), moment(new Date()), moment(new Date()));

    const createQuery = 'INSERT INTO users(id, email, username, first_name, last_name, user_role, password, created_date, modified_date) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9) returning *';

    try {
      const { rows } = await db.query(createQuery, Object.values(newUser));
      const token = Helper.generateToken(rows[0].id);
      return res.status(201).send({
        message: 'Account Created Successfully', status: 201, data: rows[0], token,
      });
    } catch (error) {
      if (error.routine === '_bt_check_unique') {
        return res.status(409).send({ message: `User with this email '${req.body.email}' already exist`, status: 409 });
      }
      return res.status(400).send(error);
    }
  },
  // Login a user
  async login(req, res) {
    const text = 'SELECT * FROM users WHERE email = $1';
    try {
      const { rows } = await db.query(text, [req.body.email]);
      if (!rows[0]) {
        return res.status(404).send({ message: 'User does not exist' });
      }
      if (!Helper.comparePassword(rows[0].password, req.body.password)) {
        return res.status(400).send({ message: 'The credentials you provided is incorrect', status: 400 });
      }
      const token = Helper.generateToken(rows[0].id);

      return res.status(200).send({ message: 'Successfully logged in', status: 200, token });
    } catch (error) {
      return res.status(400).send({ message: error, status: 400 });
    }
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
    const deleteQuery = 'DELETE FROM users WHERE id=$1 returning *';

    try {
      const { rows } = await db.query(deleteQuery, [req.user.id]);
      if (!rows[0]) {
        return res.status(404).send({ message: 'user not found', status: 404 });
      }
      return res.status(204).send({ message: 'deleted', status: 204 });
    } catch (error) {
      return res.status(400).send({ message: error, status: 400 });
    }
  },
  async updateUser(req, res) {
    const selectOneQuery = 'SELECT * FROM users WHERE id=$1';
    const updateOneQuery = 'UPDATE users SET user_role=$1, modified_date=$2 WHERE id=$3';

    try {
      const { rows } = await db.query(selectOneQuery, [req.user.id]);
      if (!rows[0]) {
        return res.status(404).send({ message: 'user not found', status: 404 });
      }
      const updateValues = [
        req.body.userRole,
        moment(new Date()),
        rows[0].id,
      ];
      const response = await db.query(updateOneQuery, updateValues);
      return res.status(200).send({
        message: 'Success', status: 200, data: response.rows[0],
      });
    } catch (error) {
      return res.status(400).send({ message: error, status: 400 });
    }
  },
};

export default Users;
