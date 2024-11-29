const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '180618',
  database: 'sistema_educativo'
});

db.connect((err) => {
  if (err) {
    console.error('Error de conexión a la base de datos: ' + err.stack);
    return;
  }
  console.log('Conectado a la base de datos con el ID ' + db.threadId);
});

// Registrar estudiante
app.post('/estudiantes', (req, res) => {
  const { nombre, apellido, email } = req.body;
  const query = 'INSERT INTO estudiantes (nombre, apellido, email) VALUES (?, ?, ?)';
  db.query(query, [nombre, apellido, email], (err, result) => {
    if (err) {
      console.error('Error al registrar estudiante:', err); // Agregar log de error
      res.status(500).send('Error al registrar estudiante');
    } else {
      res.status(201).json({ message: 'Estudiante registrado con éxito' }); // Respuesta de éxito en JSON
    }
  });
});

// Obtener todos los estudiantes
app.get('/estudiantes', (req, res) => {
  const query = 'SELECT * FROM estudiantes';
  db.query(query, (err, results) => {
    if (err) {
      res.status(500).send('Error al consultar estudiantes: ' + err);
    } else {
      res.status(200).json(results);
    }
  });
});

// Consultar un estudiante por su ID
app.get('/estudiantes/:id', (req, res) => {
  const { id } = req.params;
  const query = 'SELECT * FROM estudiantes WHERE id = ?';
  db.query(query, [id], (err, result) => {
    if (err) {
      res.status(500).send('Error al consultar estudiante: ' + err);
    } else {
      res.status(200).json(result);
    }
  });
});

// Actualizar estudiante
app.put('/estudiantes/:id', (req, res) => {
  const { id } = req.params;
  const { nombre, apellido, email } = req.body;
  const query = 'UPDATE estudiantes SET nombre = ?, apellido = ?, email = ? WHERE id = ?';
  db.query(query, [nombre, apellido, email, id], (err, result) => {
    if (err) {
      res.status(500).send('Error al actualizar estudiante: ' + err);
    } else {
      res.status(200).send('Estudiante actualizado con éxito');
    }
  });
});

// Eliminar estudiante
app.delete('/estudiantes/:id', (req, res) => {
  const { id } = req.params;
  const query = 'DELETE FROM estudiantes WHERE id = ?';
  db.query(query, [id], (err, result) => {
    if (err) {
      res.status(500).send('Error al eliminar estudiante: ' + err);
    } else {
      res.status(200).send('Estudiante eliminado con éxito');
    }
  });
});

// Registrar profesor
app.post('/profesores', (req, res) => {
  const { nombre, email } = req.body;
  const query = 'INSERT INTO profesores (nombre, email) VALUES (?, ?)';
  db.query(query, [nombre, email], (err, result) => {
    if (err) {
      console.error('Error al registrar profesor:', err);
      res.status(500).send('Error al registrar profesor');
    } else {
      res.status(201).json({ message: 'Profesor registrado con éxito' });
    }
  });
});


// Consultar un profesor por su ID
app.get('/profesores/:id', (req, res) => {
  const { id } = req.params;
  const query = 'SELECT * FROM profesores WHERE id = ?';
  db.query(query, [id], (err, result) => {
    if (err) {
      res.status(500).send('Error al consultar profesor: ' + err);
    } else {
      res.status(200).json(result);
    }
  });
});

// Actualizar un profesor
app.put('/profesores/:id', (req, res) => {
  const { id } = req.params;
  const { nombre, apellido, email } = req.body;
  const query = 'UPDATE profesores SET nombre = ?, apellido = ?, email = ? WHERE id = ?';
  db.query(query, [nombre, apellido, email, id], (err, result) => {
    if (err) {
      res.status(500).send('Error al actualizar profesor: ' + err);
    } else {
      res.status(200).send('Profesor actualizado con éxito');
    }
  });
});

// Eliminar un profesor
app.delete('/profesores/:id', (req, res) => {
  const { id } = req.params;
  const query = 'DELETE FROM profesores WHERE id = ?';
  db.query(query, [id], (err, result) => {
    if (err) {
      res.status(500).send('Error al eliminar profesor: ' + err);
    } else {
      res.status(200).send('Profesor eliminado con éxito');
    }
  });
});

// Registrar asignatura
app.post('/asignaturas', (req, res) => {
  const { nombre, descripcion } = req.body;
  const query = 'INSERT INTO asignaturas (nombre, descripcion) VALUES (?, ?)';
  db.query(query, [nombre, descripcion], (err, result) => {
    if (err) {
      console.error('Error al registrar asignatura:', err);
      res.status(500).send('Error al registrar asignatura');
    } else {
      res.status(201).json({ message: 'Asignatura registrada con éxito' });
    }
  });
});


// Consultar una asignatura por su ID
app.get('/asignaturas/:id', (req, res) => {
  const { id } = req.params;
  const query = 'SELECT * FROM asignaturas WHERE id = ?';
  db.query(query, [id], (err, result) => {
    if (err) {
      res.status(500).send('Error al consultar asignatura: ' + err);
    } else {
      res.status(200).json(result);
    }
  });
});

// Actualizar una asignatura
app.put('/asignaturas/:id', (req, res) => {
  const { id } = req.params;
  const { nombre, descripcion } = req.body;
  const query = 'UPDATE asignaturas SET nombre = ?, descripcion = ? WHERE id = ?';
  db.query(query, [nombre, descripcion, id], (err, result) => {
    if (err) {
      res.status(500).send('Error al actualizar asignatura: ' + err);
    } else {
      res.status(200).send('Asignatura actualizada con éxito');
    }
  });
});

// Eliminar una asignatura
app.delete('/asignaturas/:id', (req, res) => {
  const { id } = req.params;
  const query = 'DELETE FROM asignaturas WHERE id = ?';

  db.query(query, [id], (err, result) => {
    if (err) {
      console.error('Error al eliminar la asignatura:', err);
      return res.status(500).send('Hubo un error al eliminar la asignatura.');
    }

    // Verificar si se eliminó alguna fila
    if (result.affectedRows === 0) {
      return res.status(404).send('Asignatura no encontrada.');
    }

    // Responder con éxito
    res.status(200).send('Asignatura eliminada correctamente.');
  });
});

// Registrar asignatura impartida por profesor
app.post('/profesores_asignaturas', (req, res) => {
  const { profesor_id, asignatura_id, grupo, horario } = req.body;
  const query = 'INSERT INTO profesores_asignaturas (profesor_id, asignatura_id, grupo, horario) VALUES (?, ?, ?, ?)';
  db.query(query, [profesor_id, asignatura_id, grupo, horario], (err, result) => {
    if (err) {
      res.status(500).send('Error al registrar asignatura impartida por profesor: ' + err);
    } else {
      res.status(201).send('Asignatura impartida por profesor registrada con éxito');
    }
  });
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});


