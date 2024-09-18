import logger from './logger.js';
import jwt from 'jsonwebtoken';

const requestLogger = (req, res, next) => {
  logger.info('Method:', req.method);
  logger.info('Path:  ', req.path);
  logger.info('Body:  ', req.body);
  logger.info('Token:', req.token);
  logger.info('---');
  next();
}

const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: 'unknown endpoint' });
}

const errorHandler = (error, req, res, next) => {
  logger.error(error.message);

  if (error.name === 'CastError') {
    return res.status(400).send({ error: 'malformatted id' });
  } else if (error.name === 'ValidationError') {
    return res.status(400).json({ error: error.message });
  }

  next(error);
}

const tokenExtractor = (req, res, next) => {
  const authorization = req.get('authorization');
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    req.token = authorization.substring(7);
  } else {
    req.token = null;
  }
  logger.info('Token: after extract', req.token);
  next();
}

const userExtractor = (req, res, next) => {
  const token = req.token;
  if (!token) {
    return res.status(401).json({ error: 'token missing' });
  }

  const decodedToken = jwt.verify(token, process.env.SECRET);
  if (!decodedToken.id) {
    return res.status(401).json({ error: 'token invalid' });
  }

  req.user = decodedToken;
  next();
}

export default {
  requestLogger,
  unknownEndpoint,
  errorHandler, 
  tokenExtractor,
  userExtractor,
}