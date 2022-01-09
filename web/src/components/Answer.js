import React from 'react';
import { useSelector } from 'react-redux';

export const Answer = ({ answer, excerpt, onDelete }) => {

  const userId = useSelector((state) => state.uid);
  return (
    <aside className="answer">
      <p>{answer.answer}</p>
      {onDelete && userId === answer.userId && (
        <button className="button right" onClick={() => onDelete(answer.id)}>Eliminar</button>
      )}
    </aside>
  )
  
}
