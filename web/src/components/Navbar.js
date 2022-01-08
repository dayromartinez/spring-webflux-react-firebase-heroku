import React from 'react';
import { NavLink } from 'react-router-dom';
import logo from '../imagenes/logo.png';
import sofkau from '../imagenes/sofkau.png';

export const PublicNavbar = () => (
  <nav>
    <NavLink to="/" className='link_imagen'><img alt='Logo web' src={logo} className='millonario_imagen'/></NavLink>
    <section className='navbar_links'>
      <NavLink to="/">Inicio</NavLink>
      <NavLink to="/questions">Preguntas</NavLink>
    </section>
  </nav>
)

export const PrivateNavbar = () => (
  <nav>
    <NavLink to="/" className='link_imagen'><img alt='Logo web' src={logo} className='millonario_imagen'/></NavLink>
    <section className='navbar_links'>
      <NavLink to="/">Inicio</NavLink>
      <NavLink to="/questions">Preguntas</NavLink>
      <NavLink to="/new">Nueva Pregunta</NavLink>
      <NavLink to="/list">Mis Preguntas</NavLink>
    </section>
  </nav>
)

export const Footer = () => (
  <nav className='navfooter'>
    <a href="https://www.sofka.com.co/es/sofka-university/" className='link_imagen_footer'><img alt='Logo Sofka' src={sofkau} className='millonario_imagen'/></a>
    <section>
      <h6 className='footertext'>© SofkaU 2022. Todos los derechos reservados.</h6>
    </section>
  </nav>
)
