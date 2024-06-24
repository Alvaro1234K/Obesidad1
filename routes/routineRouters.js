const express = require('express');
const router = express.Router();
const Routine = require('../models/Routines');


module.exports = router;


// Obtener todas las rutinas
router.get('/', async (req, res) => {
  try {
    const routines = await Routine.find();
    res.json(routines);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener las rutinas' });
  }
});

// Agregar una nueva rutina
router.post('/add', async (req, res) => {
  const { title, description } = req.body;

  try {
    const newRoutine = new Routine({ title, description });
    const savedRoutine = await newRoutine.save();
    res.status(201).json(savedRoutine);
  } catch (error) {
    res.status(500).json({ error: 'Error al agregar la rutina' });
  }
});

// Eliminar una rutina
router.delete('/:id', async (req, res) => {
  try {
    await Routine.findByIdAndDelete(req.params.id);
    res.json({ message: 'Rutina eliminada' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar la rutina' });
  }
});

// Actualizar una rutina
router.put('/:id', async (req, res) => {
  const { title, description } = req.body;

  try {
    const updatedRoutine = await Routine.findByIdAndUpdate(req.params.id, { title, description }, { new: true });
    res.json(updatedRoutine);
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar la rutina' });
  }
});

module.exports = router;
