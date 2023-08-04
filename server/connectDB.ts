import mongoose from 'mongoose';

export default (URL: string) => {
  mongoose
    .connect(URL)
    .then(() => {
      console.log('Connected to DB...');
    })
    .catch((err) => {
      console.error('Cannot connect to the DB :(\n', err);
    });
};
