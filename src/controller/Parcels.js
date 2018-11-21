import moment from 'moment';
import uuidv4 from 'uuid/v4';
import db from '../db';

const Parcels = {
  async create(req, res) {
    const createQuery = `INSERT INTO
      parcels(id, location, destination, length, width, height, owner_id, created_date, modified_date)
      VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9)
      returning *`;
    const values = [
      uuidv4(),
      req.body.location,
      req.body.destination,
      req.body.length,
      req.body.width,
      req.body.height,
      req.body.id,
      moment(new Date()),
      moment(new Date()),
    ];

    try {
      const { rows } = await db.query(createQuery, values);
      return res.status(201).send(rows[0]);
    } catch (error) {
      return res.status(400).send(error);
    }
  },

  async getAll(req, res) {
    const findAllQuery = 'SELECT * FROM reflections where owner_id = $1';
    try {
      const { rows, rowCount } = await db.query(findAllQuery, [req.user.id]);
      return res.status(200).send({ rows, rowCount });
    } catch (error) {
      return res.status(400).send(error);
    }
  },

  async getOne(req, res) {
    const text = 'SELECT * FROM reflections WHERE id = $1 AND owner_id = $2';
    try {
      const { rows } = await db.query(text, [req.params.id, req.user.id]);
      if (!rows[0]) {
        return res.status(404).send({ message: 'reflection not found' });
      }
      return res.status(200).send(rows[0]);
    } catch (error) {
      return res.status(400).send(error);
    }
  },
  async parcelByUser(req, res) {
    return res.status().send({ message: 'parcelByUser' });
  },
  async cancel(req, res) {
    return res.status().send({ message: 'cancel' });
  },
  async presentLocation(req, res) {
    return res.status().send({ message: 'presentLocation' });
  },
  async destination(req, res) {
    return res.status().send({ message: 'destination' });
  },
  async status(req, res) {
    return res.status().send({ message: 'status' });
  },
};

export default Parcels;
