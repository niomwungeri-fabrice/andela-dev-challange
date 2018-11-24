/* Code modified from a file obtained from https://github.com/olawalejarvis/reflection_app_server */
import moment from 'moment';
import uuidv4 from 'uuid/v4';
import db from '../db';
import Parcel from '../model/parcel';

const Parcels = {
  // Create a parcel delivery order
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
  // Fetch all parcel delivery orders
  async getAll(req, res) {
    const findAllQuery = 'SELECT * FROM parcels';
    try {
      const { rows, rowCount } = await db.query(findAllQuery);
      return res.status(200).send({ rows, rowCount });
    } catch (error) {
      return res.status(400).send(error);
    }
  },
  // Fetch all parcel delivery orders by a specific user
  async parcelByUser(req, res) {
    const parcelByUserQuery = 'SELECT * FROM parcels where owner_id = $1';
    try {
      const { rows, rowCount } = await db.query(parcelByUserQuery, [req.params.userId]);
      return res.status(200).send({ rows, rowCount });
    } catch (error) {
      return res.status(400).send(error);
    }
  },
  // Fetch a specific parcel delivery order
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
  // Cancel the specific parcel delivery order
  async cancel(req, res) {
    const findOneQuery = 'SELECT * FROM parcels WHERE id = $1';
    const updateOneQuery = `UPDATE parcels
      SET status=$1,modified_date=$2
      WHERE id=$3 returning *`;
    try {
      const { rows } = await db.query(findOneQuery, [req.params.parcelId]);
      if (!rows[0]) {
        return res.status(404).send({ message: 'parcel not found' });
      }
      const newParcel = new Parcel(rows[0].id, rows[0].location, rows[0].destination,
        rows[0].length, rows[0].width, rows[0].height, rows[0].ownerId, rows[0].status,
        rows[0].created_date, moment(new Date()));
      const updateValues = [
        'Canceled',
        moment(new Date()),
        rows[0].id,
      ];
      const response = await db.query(updateOneQuery, updateValues);
      return res.status(200).send(response.rows[0]);
    } catch (err) {
      return res.status(400).send(err);
    }
  },
  // Change the present location of a specific parcel delivery order
  async presentLocation(req, res) {
    return res.status(200).send({ message: 'presentLocation' });
  },
  // Change the location ofa specific parcel delivery order -
  // only for the user who created it
  async destination(req, res) {
    return res.status(200).send({ message: 'destination' });
  },
  // Change the status of a specific parcel delivery order -
  // This endpoint should be accessible by the Admin only
  async status(req, res) {
    return res.status().send({ message: 'status' });
  },
};

export default Parcels;
