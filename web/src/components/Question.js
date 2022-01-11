import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { filterCategory } from '../actions/index.js';


export const Question = ({ question, excerpt, onDelete }) => {

  const dispatch = useDispatch();

  const filter = (category) => {
    dispatch(filterCategory(category));
  }
  
  return (
    <article className={excerpt ? 'question-excerpt' : 'question'}>
      <h2 dangerouslySetInnerHTML={{__html: question.question}}></h2>
      <p><button className="boton_categoria" onClick={() => filter(question.category)}>{question.category}</button> 
      - <small>{question.type}</small></p>
  
      {onDelete && (
        <button className="button right" onClick={() => onDelete(question.id)}>Eliminar</button>
      )}
      {excerpt && (
        <Link to={`/question/${question.id}`} className="button">
          Ver Respuestas
        </Link>
      )}
    </article>
  )
}
