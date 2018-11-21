import moment from 'moment';
import uuidv4 from 'uuid/v4';
import db from '../db';
import Helper from './Helper';

const User = {
  async signup(req, res) {
    if (!req.body.email || !req.body.password) {
      return res.status(400).send({ message: 'Some values are missing' });
    }
    if (!Helper.isValidEmail(req.body.email)) {
      return res.status(400).send({ message: 'Please enter a valid email address' });
    }
    const hashPassword = Helper.hashPassword(req.body.password);
    const createQuery = `INSERT INTO
      users(id, email, username, first_name, last_name, password, created_date, modified_date)
      VALUES($1, $2, $3, $4, $5, $6, $7, $8)
      returning *`;
    const values = [
      uuidv4(),
      req.body.email,
      req.body.username,
      req.body.first_name,
      req.body.last_name,
      hashPassword,
      moment(new Date()),
      moment(new Date()),
    ];

    try {
      const { rows } = await db.query(createQuery, values);
      return res.status(201).send(rows[0].id);
    } catch (error) {
      return res.status(400).send(error);
    }
  },
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
};

export default User;
