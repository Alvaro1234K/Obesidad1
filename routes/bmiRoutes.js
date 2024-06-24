const express = require('express');
const router = express.Router();
const BMI = require('../models/BMI');

router.post('/save', async (req, res) => {
  const { email, weight, height, bmi, bmiResult } = req.body;

  try {
    const newBMI = new BMI({
      email,
      weight,
      height,
      bmi,
      bmiResult
    });

    await newBMI.save();
    res.status(201).json(newBMI);
  } catch (error) {
    res.status(400).json({ error: 'Error al guardar el IMC' });
  }
});

module.exports = router;
