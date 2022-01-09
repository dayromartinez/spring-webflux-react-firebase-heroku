import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchQuestion } from '../actions/index.js';
import { Question } from '../components/Question';
import { Answer } from '../components/Answer';
import { Link } from 'react-router-dom';
import { deleteAnswer } from '../actions/index.js';
import Swal from "sweetalert2";

const SingleQuestionPage = ({ match }) => {

  const dispatch = useDispatch();
  const loading = useSelector((state) => state.loading);
  const hasErrors = useSelector((state) => state.hasErrors);
  const question = useSelector((state) => state.question);
  const userId = useSelector((state) => state.uid);
  const { id } = match.params;


  useEffect(() => {
    dispatch(fetchQuestion(id))
  }, [dispatch, id])

  const renderQuestion = () => {
    if (loading.question) return <p>Cargando pregunta...</p>
    if (hasErrors.question) return <p>No ha sido posible mostrar esta pregunta.</p>

    return <Question question={question}/>
  }

  const onDelete = (id) => {

    Swal.fire({
        title: '¿Está seguro de que desea eliminar esta respuesta?',
        showConfirmButton: false,
        showDenyButton: true,
        showCancelButton: true,
        denyButtonText: `Eliminar`,
        cancelButtonText: 'Cancelar'
    }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
            Swal.fire({
                icon: "success",
                title: "Respuesta no eliminada!",
                text: `Esta respuesta sigue estando registrada :)`,
            });
        } else if (result.isDenied) {
            dispatch(deleteAnswer(id));
            Swal.fire({
                icon: "info",
                title: "Respuesta eliminada!",
                text: `La respuesta ha sido eliminada exitosamente.`,
            })
        }
    })
  }

  const renderAnswers = () => {
    //console.log(question.answers);
    return (question.answers && question.answers.length) ? question.answers.map(answer => (
      <Answer key={answer.id} answer={answer} excerpt onDelete={onDelete} />
    )) : <p>¡Aún no hay respuestas registradas! No lo pienses más y deja una posible respuesta
      para esta pregunta.
    </p>;
  }

  return (
    <div className='div_pregunta_componente'>
      <section>
        {renderQuestion()}
        {userId && <Link to={"/answer/" + id} className="button right">
          Responder
        </Link>}

        <h2>Respuestas</h2>
        {renderAnswers()}
      </section>
    </div>
  )
}

export default SingleQuestionPage;
