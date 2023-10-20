import mongoose from 'mongoose';

export const connectToDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_CONNECTION_STRING || '', { retryWrites: true, w: 'majority' });
    console.log('Connected to mongoDB.');
  } catch (error) {
    console.log('Unable to connect to MongoDB.');
    console.error(error);
  }
};