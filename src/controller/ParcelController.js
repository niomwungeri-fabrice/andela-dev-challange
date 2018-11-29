/* Code modified from a file obtained from https://github.com/olawalejarvis/reflection_app_server */
import moment from 'moment';
import uuidv4 from 'uuid/v4';
import db from '../db';
import Parcel from '../model/parcel';

const Parcels = {
  // Create a parcel delivery order
  async create(req, res) {
    const {
      location, destination, presentLocation, weight, receiverPhone,
    } = req.body;
    const newParcel = new Parcel(uuidv4(), location, destination, presentLocation, weight,
      req.user.id, receiverPhone, 'Pending', moment(new Date()), moment(new Date()));
    const createQuery = `INSERT INTO
      parcels(id, location, destination ,present_location, weight, owner_id, receiver_phone, status, created_date, modified_date)
      VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
      returning *`;
    try {
      const { rowCount, rows } = await db.query(createQuery, Object.values(newParcel));
      return res.status(201).send({
        message: 'Parcel Created Successfully', status: 201, rowCount, data: rows[0],
      });
    } catch (error) {
      return res.status(400).send({ message: error, status: 400 });
    }
  },
  // Fetch all parcel delivery orders
  async getAll(req, res) {
    const findAllQuery = 'SELECT * FROM parcels';
    try {
      const { rows, rowCount } = await db.query(findAllQuery);
      return res.status(200).send({
        message: 'Success', status: 200, rowCount, data: rows,
      });
    } catch (error) {
      return res.status(400).send({
        message: error, status: 400,
      });
    }
  },
  // Fetch all parcel delivery orders by a specific user
  async parcelByUser(req, res) {
    const parcelByUserQuery = 'SELECT * FROM parcels WHERE owner_id = $1';
    try {
      const { rows, rowCount } = await db.query(parcelByUserQuery, [req.user.id]);
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
    const text = 'SELECT * FROM parcels WHERE id = $1 AND owner_id = $2';
    try {
      const { rows, rowCount } = await db.query(text, [req.params.parcelId, req.user.id]);
      if (!rows[0]) {
        return res.status(400).send({ message: 'parcels not found', status: 400 });
      }
      return res.status(200).send({
        message: 'Success', status: 200, rowCount, data: rows[0],
      });
    } catch (error) {
      if (error.routine === 'string_to_uuid') {
        return res.status(200).send({
          message: 'Invalid Id', status: 400,
        });
      }
      return res.status(400).send({
        message: error, status: 400,
      });
    }
  },
  // Cancel the specific parcel delivery order
  async cancel(req, res) {
    const findOneQuery = 'SELECT * FROM parcels WHERE id = $1 AND owner_id = $2';
    const updateOneQuery = `UPDATE parcels
      SET status=$1,modified_date=$2
      WHERE id=$3 AND owner_id = $4 returning *`;
    try {
      const { rows } = await db.query(findOneQuery, [req.params.parcelId, req.user.id]);
      if (rows[0]) {
        if (rows[0].status.toUpperCase() === 'delivered'.toUpperCase() || rows[0].status.toUpperCase() === 'Cancelled'.toUpperCase()) {
          return res.status(400).send({ message: 'Ooops, The parcel has been delived or concelled already, Cancel denied!', status: 400 });
        }
      }
      if (!rows[0]) {
        return res.status(400).send({ message: 'parcel not found', status: 400 });
      }
      const updateValues = [
        'Cancelled',
        moment(new Date()),
        rows[0].id,
        req.user.id,
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
    const findOneQuery = 'SELECT * FROM parcels WHERE id = $1 AND owner_id = $2';
    const updateOneQuery = `UPDATE parcels
      SET present_location=$1,modified_date=$2
      WHERE id=$3 AND owner_id = $4 returning *`;
    try {
      const { rows } = await db.query(findOneQuery, [req.params.parcelId, req.user.id]);
      if (!rows[0]) {
        return res.status(400).send({ message: 'Parcel not found', status: 400 });
      }
      const updateValues = [
        req.body.presentLocation,
        moment(new Date()),
        rows[0].id,
        req.user.id,
      ];
      const response = await db.query(updateOneQuery, updateValues);
      return res.status(200).send({
        message: 'Present location Updated', status: 200, data: response.rows[0],
      });
    } catch (err) {
      return res.status(400).send(err);
    }
  },
  async changeDestination(req, res) {
    const findOneQuery = 'SELECT * FROM parcels WHERE id = $1 AND owner_id = $2';
    const updateOneQuery = `UPDATE parcels
      SET destination=$1,modified_date=$2
      WHERE id=$3 AND owner_id = $4 returning *`;
    try {
      const { rows } = await db.query(findOneQuery, [req.params.parcelId, req.user.id]);
      if (!rows[0]) {
        return res.status(400).send({ message: 'Parcel not found', status: 400 });
      }
      const updateValues = [
        req.body.destination,
        moment(new Date()),
        rows[0].id,
        req.user.id,
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
    const findOneQuery = 'SELECT * FROM parcels WHERE id = $1 AND owner_id = $2';
    const updateOneQuery = `UPDATE parcels
      SET status=$1,modified_date=$2
      WHERE id=$3 AND owner_id = $4 returning *`;
    try {
      const { rows } = await db.query(findOneQuery, [req.params.parcelId, req.user.id]);
      if (!rows[0]) {
        return res.status(400).send({ message: 'Parcel not found', status: 400 });
      }
      const updateValues = [
        req.body.status,
        moment(new Date()),
        rows[0].id,
        req.user.id,
      ];
      const response = await db.query(updateOneQuery, updateValues);
      return res.status(200).send({
        message: 'Success', status: 200, data: response.rows[0],
      });
    } catch (err) {
      return res.status(400).send(err);
    }
  },
};

export default Parcels;
