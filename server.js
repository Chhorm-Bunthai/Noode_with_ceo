// eslint-disable-next-line import/no-extraneous-dependencies
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });
const app = require('./app');

const db = process.env.DATABASE.replace('<PASSWORD>', process.env.PASSWORD);

mongoose
  .connect(db, {
    // useNewUrlParser: true,
    // useCreateIndex: true,
    // useFindAndMidify: false,
  })
  .then(() => console.log('DB connect success fully!'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`App listening on ${PORT}...`);
});
