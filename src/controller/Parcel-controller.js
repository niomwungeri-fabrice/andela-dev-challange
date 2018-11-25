/* Code modified from a file obtained from https://github.com/olawalejarvis/reflection_app_server */
import moment from 'moment';
import uuidv4 from 'uuid/v4';
import db from '../db';
import Parcel from '../model/parcel';

const Parcels = {
  // Create a parcel delivery order
  async create(req, res) {
    const {
      location, destination, presentLocation, length, width, height, ownerId, status,
    } = req.body;

    const newParcel = new Parcel(uuidv4(), location, destination, presentLocation, length, width,
      height, ownerId, status, moment(new Date()), moment(new Date()));
    const createQuery = `INSERT INTO
      parcels(id, location, destination ,present_location, length, width, height, owner_id, status, created_date, modified_date)
      VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
      returning *`;
    try {
      const { rows, rowCount } = await db.query(createQuery, Object.values(newParcel));
      return res.status(201).send({
        message: 'Success', status: 201, rowCount, data: rows,
      });
    } catch (error) {
      return res.status(400).send({
        message: error, status: 400,
      });
    }
  },
  // Fetch all parcel delivery orders
  async getAll(req, res) {
    const findAllQuery = 'SELECT * FROM parcels';
    try {
      const { rows, rowCount } = await db.query(findAllQuery);
      return res.status(200).send({
        message: 'Success', status: 200, rowCount, data: rows[0],
      });
    } catch (error) {
      return res.status(400).send({
        message: error, status: 400,
      });
    }
  },
  // Fetch all parcel delivery orders by a specific user
  async parcelByUser(req, res) {
    const parcelByUserQuery = 'SELECT * FROM parcels where owner_id = $1';
    try {
      const { rows, rowCount } = await db.query(parcelByUserQuery, [req.params.userId]);
      return res.status(200).send({
        message: 'Success', status: 200, rowCount, data: rows[0],
      });
    } catch (error) {
      return res.status(400).send({
        message: error, status: 400,
      });
    }
  },
  // Fetch a specific parcel delivery order
  async getOne(req, res) {
    const text = 'SELECT * FROM parcels WHERE id = $1';
    try {
      const { rows, rowCount } = await db.query(text, [req.params.parcelId]);
      if (!rows[0]) {
        return res.status(404).send({ message: 'parcels not found', status: 404 });
      }
      return res.status(200).send({
        message: 'Success', status: 200, rowCount, data: rows[0],
      });
    } catch (error) {
      return res.status(400).send({
        message: error, status: 400,
      });
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
      const updateValues = [
        'Cancelled',
        moment(new Date()),
        rows[0].id,
      ];
      const response = await db.query(updateOneQuery, updateValues);
      return res.status(200).send({
        message: 'Success', status: 200, data: response.rows[0],
      });
    } catch (err) {
      return res.status(400).send(err);
    }
  },
  // Change the present location of a specific parcel delivery order
  async ChangePresentLocation(req, res) {
    const findOneQuery = 'SELECT * FROM parcels WHERE id = $1';
    const updateOneQuery = `UPDATE parcels
      SET present_location=$1,modified_date=$2
      WHERE id=$3 returning *`;
    try {
      const { rows } = await db.query(findOneQuery, [req.params.parcelId]);
      if (!rows[0]) {
        return res.status(404).send({ message: 'Parcel not found' });
      }
      const updateValues = [
        req.body.present_location,
        moment(new Date()),
        rows[0].id,
      ];
      const response = await db.query(updateOneQuery, updateValues);
      return res.status(200).send({
        message: 'Present location Updated', status: 200, data: response.rows[0],
      });
    } catch (err) {
      return res.status(400).send(err);
    }
  },
  // Change the location ofa specific parcel delivery order -
  // only for the user who created it
  async changeDestination(req, res) {
    const findOneQuery = 'SELECT * FROM parcels WHERE id = $1';
    const updateOneQuery = `UPDATE parcels
      SET destination=$1,modified_date=$2
      WHERE id=$3 returning *`;
    try {
      const { rows } = await db.query(findOneQuery, [req.params.parcelId]);
      if (!rows[0]) {
        return res.status(404).send({ message: 'Parcel not found' });
      }
      const updateValues = [
        req.body.destination,
        moment(new Date()),
        rows[0].id,
      ];
      const response = await db.query(updateOneQuery, updateValues);
      return res.status(200).send({
        message: 'Success', status: 200, data: response.rows[0],
      });
    } catch (err) {
      return res.status(400).send(err);
    }
  },
  async changeStatus(req, res) {
    const findOneQuery = 'SELECT * FROM parcels WHERE id = $1';
    const updateOneQuery = `UPDATE parcels
      SET status=$1,modified_date=$2
      WHERE id=$3 returning *`;
    try {
      const { rows } = await db.query(findOneQuery, [req.params.parcelId]);
      if (!rows[0]) {
        return res.status(404).send({ message: 'Parcel not found' });
      }
      const updateValues = [
        req.body.status,
        moment(new Date()),
        rows[0].id,
      ];
      const response = await db.query(updateOneQuery, updateValues);
      return res.status(200).send({
        message: 'Success', status: 200, data: response.rows[0],
      });
    } catch (err) {
      return res.status(400).send(err);
    }
  },
  async delete(req, res) {
    const deleteQuery = 'DELETE FROM parcels WHERE id = $1 returning *';
    try {
      const { rows } = await db.query(deleteQuery, [req.params.parcelId]);
      if (!rows[0]) {
        return res.status(404).send({ message: 'parcels not found', status: 404 });
      }
      return res.status(204).send({ message: 'deleted', status: 204 });
    } catch (error) {
      return res.status(400).send({ message: error, status: 400 });
    }
  },
};

export default Parcels;
