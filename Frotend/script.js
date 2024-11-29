document.addEventListener('DOMContentLoaded', function() {
    // Elementos de los formularios
    const formEstudiante = document.getElementById('formEstudiante');
    const btnCargarEstudiantes = document.getElementById('btnCargarEstudiantes');
    const formAsignatura = document.getElementById('formAsignatura');
    const formProfesor = document.getElementById('formProfesor');
    const btnCargarProfesores = document.getElementById('btnCargarProfesores');
    const btnCargarAsignaturas = document.getElementById('btnCargarAsignaturas');
    
    const listaEstudiantes = document.getElementById('listaEstudiantes');
    const listaProfesores = document.getElementById('listaProfesores');
    const listaAsignaturas = document.getElementById('listaAsignaturas');

   // Función para registrar estudiante
formEstudiante.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const nombre = document.getElementById('nombre').value;
    const apellido = document.getElementById('apellido').value;
    const email = document.getElementById('email').value;
    
    const data = { nombre, apellido, email };
    
    fetch('http://localhost:3001/estudiantes', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Error en el servidor al registrar el estudiante');
        }
        return response.json();
    })
    .then(data => {
        alert('Estudiante registrado exitosamente');
        formEstudiante.reset();
    })
    .catch((error) => {
        console.error('Error:', error);
        alert('Hubo un error al registrar al estudiante.');
    });
});

    // Función para cargar estudiantes
    btnCargarEstudiantes.addEventListener('click', function() {
        obtenerEstudiantes();
    });

    // Función para obtener estudiantes
    function obtenerEstudiantes() {
        fetch('http://localhost:3001/estudiantes')
            .then(response => response.json())
            .then(data => {
                listaEstudiantes.innerHTML = '';
                data.forEach(estudiante => {
                    const li = document.createElement('li');
                    li.textContent = `ID: ${estudiante.id}, Nombre: ${estudiante.nombre} ${estudiante.apellido}, Email: ${estudiante.email}`;
                    listaEstudiantes.appendChild(li);
                });
            })
            .catch((error) => {
                console.error('Error:', error);
                alert('Hubo un error al obtener los estudiantes.');
            });
    }

 // Función para registrar profesor
formProfesor.addEventListener('submit', function(e) {
    e.preventDefault();
  
    const nombreProfesor = document.getElementById('nombreProfesor').value;
    const emailProfesor = document.getElementById('emailProfesor').value;
  
    const data = { nombre: nombreProfesor, email: emailProfesor };
  
    fetch('http://localhost:3001/profesores', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    .then(response => response.json())
    .then(data => {
      alert(data.message);  // Mostrar mensaje de éxito
      formProfesor.reset();
    })
    .catch((error) => {
      console.error('Error:', error);
      alert('Hubo un error al registrar al profesor');
    });
  });
  

    // Función para cargar profesores
    btnCargarProfesores.addEventListener('click', function() {
        obtenerProfesores();
    });

    function obtenerProfesores() {
        fetch('http://localhost:3001/profesores')
            .then(response => response.json())
            .then(data => {
                listaProfesores.innerHTML = '';
                data.forEach(profesor => {
                    const li = document.createElement('li');
                    li.textContent = `${profesor.nombre} ${profesor.apellido}`;
                    listaProfesores.appendChild(li);
                });
            })
            .catch((error) => {
                console.error('Error:', error);
                alert('Hubo un error al obtener los profesores.');
            });
    }
    
// Función para registrar asignatura
formAsignatura.addEventListener('submit', function(e) {
    e.preventDefault();
  
    const nombreAsignatura = document.getElementById('nombreAsignatura').value;
    const descripcionAsignatura = document.getElementById('descripcionAsignatura').value;
  
    const data = { nombre: nombreAsignatura, descripcion: descripcionAsignatura };
  
    fetch('http://localhost:3001/asignaturas', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    .then(response => response.json())
    .then(data => {
      alert(data.message);  // Mostrar mensaje de éxito
      formAsignatura.reset();
    })
    .catch((error) => {
      console.error('Error:', error);
      alert('Hubo un error al registrar la asignatura');
    });
  });  

    // Función para cargar asignaturas
    btnCargarAsignaturas.addEventListener('click', function() {
        obtenerAsignaturas();
    });

    function obtenerAsignaturas() {
        fetch('http://localhost:3001/asignaturas')
            .then(response => response.json())
            .then(data => {
                listaAsignaturas.innerHTML = '';
                data.forEach(asignatura => {
                    const li = document.createElement('li');
                    li.textContent = `${asignatura.nombre}`;
                    listaAsignaturas.appendChild(li);
                });
            })
            .catch((error) => {
                console.error('Error:', error);
                alert('Hubo un error al obtener las asignaturas.');
            });
    }
});


