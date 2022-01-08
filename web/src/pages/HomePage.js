import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = ({children}) => (
  <section>
    <h1>Inicio</h1>
    <div>
      {children}
    </div>
    <h3 style={{'fontStyle': 'italic'}}>¡Bienvenid@ a "Quién quiere ser Sofkiano"!</h3>
    <Link to="/questions" className="button">
      Ver Preguntas
    </Link>
  
  </section>
)
export default HomePage;
