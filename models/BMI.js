const mongoose = require('mongoose');

const BMISchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  weight: {
    type: Number,
    required: true,
  },
  height: {
    type: Number,
    required: true,
  },
  bmi: {
    type: Number,
    required: true,
  },
  bmiResult: {
    type: String,
    required: true,
  }
});

module.exports = mongoose.model('BMI', BMISchema);
