import React, { Fragment, useState, useEffect } from 'react';
import Formulario from './Components/Formulario';
import Cita from './Components/Cita';

function App() {


  //citas en local storage
  let citasIniciales = JSON.parse(localStorage.getItem('citas'));
  if (!citasIniciales) {
    citasIniciales = [];

  }

  //arreglo de citas
  const [citas, guardarCita] = useState([citasIniciales]);

  //use effect para realizar ciertas operaciones cuando el state cambia
  useEffect(() => {
    if (citasIniciales) {
      localStorage.setItem('citas', JSON.stringify(citas));
    } else {
      localStorage.setItem('citas', JSON.stringify([]));
    }

  }, [citas, citasIniciales]);

  //funcion que toma las citas actuales y add nueva
  const crearCita = cita => {
    guardarCita([
      ...citas,
      cita
    ]);
  }

  //funcion que elimina una cita por su id
  const eliminarCita = id => {
    const nuevasCitas = citas.filter(cita => cita.id !== id);
    guardarCita(nuevasCitas);
  }

  //mensaje condicional
  const titulo = citas.length === 0 ? 'No hay citas' : 'Administra tus citas';

  return (
    <Fragment>
      <h1>Administrador de pacientes</h1>
      <div className="container">
        <div className="row">
          <div className="one-half column">
            <Formulario
              crearCita={crearCita}
            />
          </div>
          <div className="one-half column">
            <h2>{titulo}</h2>
            {citas.map(cita => (
              <Cita
                key={cita.id}
                cita={cita}
                eliminarCita={eliminarCita}
              />
            ))}
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default App;
