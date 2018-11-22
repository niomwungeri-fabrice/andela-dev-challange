import moment from 'moment';
import uuidv4 from 'uuid/v4';
import db from '../db';
import Parcel from '../model/parcel';

const Parcels = {
  async create(req, res) {
    const {
      location, destination, length, width, height, ownerId, status,
    } = req.body;
    const newParcel = new Parcel(uuidv4(), location, destination, length, width, height,
      ownerId, status, moment(new Date()), moment(new Date()));

    const createQuery = `INSERT INTO
      parcels(id, location, destination, length, width, height, owner_id, status, created_date, modified_date)
      VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
      returning *`;
    try {
      const { rows } = await db.query(createQuery, Object.values(newParcel));
      return res.status(201).send(rows[0]);
    } catch (error) {
      return res.status(400).send(error);
    }
  },

  async getAll(req, res) {
    const findAllQuery = 'SELECT * FROM parcels';
    try {
      const { rows, rowCount } = await db.query(findAllQuery);
      return res.status(200).send({ rows, rowCount });
    } catch (error) {
      return res.status(400).send(error);
    }
  },
  async parcelByUser(req, res) {
    const parcelByUserQuery = 'SELECT * FROM parcels where owner_id = $1';
    try {
      const { rows, rowCount } = await db.query(parcelByUserQuery, [req.params.userId]);
      return res.status(200).send({ rows, rowCount });
    } catch (error) {
      return res.status(400).send(error);
    }
  },

  async getOne(req, res) {
    const text = 'SELECT * FROM parcels WHERE id = $1';
    try {
      const { rows } = await db.query(text, [req.params.parcelId]);
      if (!rows[0]) {
        return res.status(404).send({ message: 'parcels not found' });
      }
      return res.status(200).send(rows[0]);
    } catch (error) {
      return res.status(400).send(error);
    }
  },
  async cancel(req, res) {
    const updateOneQuery = 'UPDATE parcels SET status=$1 WHERE id=$5';
    try {
      const { rows } = await db.query(updateOneQuery, [req.params.parcelId]);
      if (!rows[0]) {
        return res.status(404).send({ message: 'parcels not found' });
      }
      return res.status(200).send(rows[0]);
    } catch (error) {
      return res.status(400).send(error);
    }
  },
  async presentLocation(req, res) {
    return res.status(200).send({ message: 'presentLocation' });
  },
  async destination(req, res) {
    return res.status(200).send({ message: 'destination' });
  },
  async status(req, res) {
    return res.status().send({ message: 'status' });
  },
};

export default Parcels;
