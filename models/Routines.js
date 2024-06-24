const mongoose = require('mongoose');

const RoutineSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});

const Routine = mongoose.model('Routine', RoutineSchema);

module.exports = Routine;
