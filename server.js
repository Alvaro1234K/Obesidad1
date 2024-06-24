const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const userRoutes = require('./routes/userRoutes');
const bmiRoutes = require('./routes/bmiRoutes');
const routineRoutes = require('./routes/routineRouters'); 

const app = express();
const PORT = process.env.PORT || 5000;

// Conexión a MongoDB
mongoose.connect('mongodb://localhost:27017/obesidad', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Conexión a MongoDB establecida'))
.catch(err => console.error('Error al conectar MongoDB:', err));

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Rutas
app.use('/api/users', userRoutes);
app.use('/api/bmi', bmiRoutes); 
app.use('/api/routines', routineRoutes);

// Servir archivos estáticos (React build)
app.use(express.static(path.join(__dirname, 'build')));

// Manejo de errores 404
app.use((req, res, next) => {
  res.status(404).send('Página no encontrada');
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor Express escuchando en puerto ${PORT}`);
});
