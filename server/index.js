import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';

import connectDB from './mongodb/connect.js';
import postRoutes from './routes/postRoutes.js';
import dalleRoutes from './routes/dalleRoutes.js'; 
import countRoutes from './routes/countRoutes.js';
 
dotenv.config(); 

const app = express();

app.use(cors());
app.use(express.json({ limit: '50mb' }));

app.use('/api/v1/post', postRoutes);
app.use('/api/v1/dalle', dalleRoutes);
app.use('/api/v1/count', countRoutes);

app.get('/', async (req, res) => {
  res.send('Hello World!');
});

const startServer = () => {
  try {
    connectDB(process.env.MONGODB_URL);
    console.log('Connected to MongoDB');

    const port = process.env.PORT;
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
  
}

startServer();      