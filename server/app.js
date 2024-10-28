import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';

import connectDB from './mongodb/connect.js';
import postRoutes from './routes/postRoutes.js';
import dalleRoutes from './routes/dalleRoutes.js'; 
import userRoutes from './routes/userRoutes.js';
import searchRoutes from './routes/searchRoutes.js';

import middleware from './utils/middleware.js'
import logger from './utils/logger.js';
import config from './utils/config.js';
 
dotenv.config(); 

try {
  connectDB(config.MONGODB_URI);
  logger.info('Connected to MongoDB' + config.MONGODB_URI);
}
catch (error) { 
  logger.error('Error connecting to MongoDB:', error.message);
}

const app = express();

app.use(cors(
  {
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 204,
  }
));
app.use(express.json({ limit: '50mb' }));

app.use(middleware.tokenExtractor);

app.use(middleware.requestLogger);

app.use('/api/v1/post', middleware.userExtractor, postRoutes);
app.use('/api/v1/dalle', dalleRoutes);
app.use('/api/v1/user', userRoutes);
app.use('/api/v1/search', searchRoutes);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);


export default app;
