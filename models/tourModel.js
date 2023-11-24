// eslint-disable-next-line import/no-extraneous-dependencies
const mongoose = require('mongoose');
// eslint-disable-next-line import/no-extraneous-dependencies
const slugify = require('slugify');

const tourSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'A tour must have a name!'], // this is called valdation
      unique: true,
      trime: true,
      maxlength: [40, ' A tour must have at least 40 characters!'],
      minlength: [10, ' A tour must have at least 10 characters!'],
    },
    slug: String,
    duration: {
      type: Number,
      required: [true, 'A tour must have a duration!'],
    },
    maxGroupSize: {
      type: Number,
      required: [true, 'A tour must have a group size!'],
    },
    difficulty: {
      type: String,
      required: [true, 'A tour must have a difficulty!'],
      enum: {
        values: ['easy', 'medium', 'difficulty'],
        message: 'Difficulty is either: east, medium, difficulty',
      },
    },
    ratingAverage: {
      type: Number,
      default: 4.5,
      min: [1, ' Rating must be above 1.0'],
      max: [5, 'Rating must be below 5.0'],
    },
    ratingQuantity: {
      type: Number,
      default: 0,
    },
    price: {
      type: Number,
      required: [true, 'A tour must have a price'],
    },
    priceDiscount: {
      type: Number,
      validator: function (val) {
        return val < this.price;
      },
      message: 'discount price ({value}) must be below regular price',
    },
    summary: {
      type: String,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    imageCover: {
      type: String,
      required: [true, 'A tour must have a image'],
    },
    images: [String],
    createdAt: {
      type: [Date],
      default: Date.now(),
      select: false,
    },
    startDates: [Date],
    secretTour: {
      type: Boolean,
      default: false,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

tourSchema.virtual('durationWeeks').get(function () {
  return this.duration / 7;
});

// Docs middleware: run before only .save() and .create()
tourSchema.pre('save', function (next) {
  // console.log(this); // is currently process documents
  this.slug = slugify(this.name, { lowercase: true });
  next();
});

// tourSchema.post('save', (doc, next) => {
//   console.log(doc);
//   next();
// });

// Query middlware;
// tourSchema.pre(/^find/, function (next) {
//   // the this keyword refers to the current query object being executed
//   this.find({ secretTour: { $ne: true } });
//   next();
// });
// tourSchema.post(/^find/, function (doc, next) {
//     console.log(doc);
//     next();
// });

// aggregation middleware
// tourSchema.pre('aggregate', function (next) {
//   this.pipeline().unshift({ $match: { secretTour: { $ne: true } } });
//   console.log(this.pipeline());
//   next();
// });
const Tour = mongoose.model('Tour', tourSchema);

module.exports = Tour;
