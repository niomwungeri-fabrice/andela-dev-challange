/* Code modified from a file obtained from https://github.com/olawalejarvis/reflection_app_server */
import jwt from 'jsonwebtoken';
import db from '../db';

const Auth = {
  async verifyToken(req, res, next) {
    const token = req.headers['x-access-token'];
    let results = {};
    if (!token) {
      results = res.status(400).send({ message: 'Token is not provided' });
    }
    try {
      const decoded = await jwt.verify(token, process.env.SECRET);
      const text = 'SELECT * FROM users WHERE email = $1';
      const { rows } = await db.query(text, [decoded.email]);
      if (!rows[0]) {
        results = res.status(400).send({ message: 'The token you provided is invalid' });
      }
      req.user = { id: decoded.email };
      next();
    } catch (error) {
      results = res.status(400).send(error);
    }
    return results;
  },
};

export default Auth;
