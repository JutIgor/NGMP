import mongoose from 'mongoose';

import { firstLetterCaseValidator } from '../utils';

const citySchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    validate: {
      validator: firstLetterCaseValidator,
      message: '{VALUE} is not a valid city name!'
    },
  },
  country: {
    type: String,
    required: true,
    validate: {
      validator: firstLetterCaseValidator,
      message: '{VALUE} is not a valid country name!'
    },
  },
  capital: {
    type: Boolean,
    default: false,
  },
  location: {
    lat: {
      type: Number,
      default: 0,
    },
    long: {
      type: Number,
      default: 0,
    },
  },
});

const cities = mongoose.model('cities', citySchema);

export default cities;
