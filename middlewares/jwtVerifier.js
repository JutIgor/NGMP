import jwt from 'jsonwebtoken';
import { secretKey } from '../controllers/auth/config';

const jwtVerifier = (req, res, next) => {
  const { token } = req.headers;

  try {
    jwt.verify(token, secretKey);
  }
  catch (err) {
    return res.status(401).end();
  }

  next();
};

export default jwtVerifier;