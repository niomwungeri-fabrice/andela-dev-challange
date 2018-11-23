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
      return res.status(400).send({ message: 'Some values are missing' });
    }
    if (!Helper.isValidEmail(req.body.email)) {
      console.log('bad email format');
      return res.status(400).send({ message: 'Please enter a valid email address' });
    }
    if (req.body.routine === '_bt_check_unique') {
      console.log('bad email format');
      return res.status(400).send({ message: 'User already exist' });
    }
    const createQuery = `INSERT INTO
      users(id, email, username, first_name, last_name,user_role, password, created_date, modified_date)
      VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9)
      returning *`;
    try {
      const { rows } = await db.query(createQuery, Object.values(newUser));
      return res.status(201).send(rows[0].id);
    } catch (error) {
      return res.status(400).send(error);
    }
  },
  // Login a user
  async login(req, res) {
    if (!req.body.email || !req.body.password) {
      return res.status(400).send({ message: 'Some values are missing' });
    }
    if (!Helper.isValidEmail(req.body.email)) {
      return res.status(400).send({ message: 'Please enter a valid email address' });
    }
    const text = 'SELECT * FROM users WHERE email = $1';
    try {
      const { rows } = await db.query(text, [req.body.email]);
      if (!rows[0]) {
        return res.status(400).send({ message: 'The credentials you provided is incorrect' });
      }
      if (!Helper.comparePassword(rows[0].password, req.body.password)) {
        return res.status(400).send({ message: 'The credentials you provided is incorrect' });
      }
      const token = Helper.generateToken(rows[0].id);
      return res.status(200).send({ token });
    } catch (error) {
      return res.status(400).send(error);
    }
  },
  async delete(req, res) {
    const deleteQuery = 'DELETE FROM users WHERE email = $1 returning *';
    try {
      const { rows } = await db.query(deleteQuery, [req.params.userId]);
      if(!rows[0]) {
        return res.status(404).send({message: 'user not found'});
      }
      return res.status(204).send({ message: 'deleted' });
    } catch(error) {
      console.log(error.stack);
      return res.status(400).send(error);
    }
  }
};

export default Users;
