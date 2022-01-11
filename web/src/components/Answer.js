import React from 'react';
import { useSelector } from 'react-redux';
import { Editor } from '@tinymce/tinymce-react'; 

export const Answer = ({ answer, excerpt, onDelete }) => {

  const userId = useSelector((state) => state.uid);
  return (
    <aside className="answer">
      <p dangerouslySetInnerHTML={{__html: answer.answer}}></p>
      {onDelete && userId === answer.userId && (
        <button className="button right" onClick={() => onDelete(answer.id)}>Eliminar</button>
      )}
    </aside>
  )
  
}
