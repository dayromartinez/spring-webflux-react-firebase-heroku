import React from 'react';
import { NavLink } from 'react-router-dom';

const HomePage = ({children}) => (
  <div className='componente_inicio'>
    <section className='section_home'>
      <h1>Inicio</h1>
      <h2 style={{'fontStyle': 'italic', 'marginTop': '-1rem'}}>¡Bienvenid@ a "Quién quiere ser Sofkiano"!</h2>
      <div>
        {children}
      </div>
      <NavLink to="/questions" className="button" style={{'marginTop': '3rem'}}>
        Ver Preguntas
      </NavLink>
    </section>
  </div>
)
export default HomePage;
