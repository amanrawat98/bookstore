import mongoose from 'mongoose';

export const dbConnection = ()=> {
  const MONGO_CONNECTION = process.env.MONGO_CONNECTION;

  mongoose.connect(MONGO_CONNECTION).then((item=> {
    console.log('moongose');
  })).catch((error)=> {
    console.log(error);
  })
}