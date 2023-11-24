// eslint-disable-next-line import/no-extraneous-dependencies
const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });
const Tour = require('../../models/tourModel');

const db = process.env.DATABASE.replace('<PASSWORD>', process.env.PASSWORD);
mongoose
  .connect(db, {
    // useNewUrlParser: true,
    // useCreateIndex: true,
    // useFindAndMidify: false,
  })
  .then(() => console.log('DB connect success fully!'));

//   read json file
const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/tours-simple.json`, 'utf-8'),
);

// import data to db

const importData = async () => {
  try {
    await Tour.create(tours);
    console.log('Data load successfully!');
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

// Delete data from db

const deleteData = async () => {
  try {
    await Tour.deleteMany();
    console.log('data deleted successfully!');
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

if (process.argv[2] === '--import') {
  importData();
} else if (process.argv[2] === '--delete') {
  deleteData();
}
