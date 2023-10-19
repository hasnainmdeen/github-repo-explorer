import mongoose from 'mongoose';
import config from './config';

export const connectToDatabase = async () => {
  try {
    await mongoose.connect(config.mongo.url, { retryWrites: true, w: 'majority' });
    console.log('Connected to mongoDB.');
  } catch (error) {
    console.log('Unable to connect to MongoDB.');
    console.error(error);
  }
};
