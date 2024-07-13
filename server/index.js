import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';

import connectDB from './mongodb/connect.js';
 
dotenv.config(); 

const app = express();
app.use(cors());
app.use(express.json({ limit: '50mb' }));

app.get('/', async (req, res) => {
  res.send('Hello World!');
});

const startServer = () => {
  try {
    connectDB(process.env.MONGO_URL);
    console.log('Connected to MongoDB');

    const port = process.env.PORT || 8080;
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
  
}

startServer();      