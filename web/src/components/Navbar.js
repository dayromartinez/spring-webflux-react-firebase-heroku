import React from 'react';
import { Link } from 'react-router-dom';

export const PublicNavbar = () => (
  <nav>
    <section>
      <Link to="/">Inicio</Link>
      <Link to="/questions">Preguntas</Link>
    </section>
  </nav>
)

export const PrivateNavbar = () => (
  <nav>
    <section>
      <Link to="/">Inicio</Link>
      <Link to="/questions">Preguntas</Link>
      <Link to="/new">Nueva Pregunta</Link>
      <Link to="/list">Mis Preguntas</Link>
    </section>
  </nav>
)
