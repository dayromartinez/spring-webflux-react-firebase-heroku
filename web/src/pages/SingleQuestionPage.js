import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchQuestion } from '../actions/index.js';
import { Question } from '../components/Question';
import { Answer } from '../components/Answer';
import { Link } from 'react-router-dom';

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

  const renderAnswers = () => {
    return (question.answers && question.answers.length) ? question.answers.map(answer => (
      <Answer key={answer.id} answer={answer} />
    )) : <p>¡Aún no hay respuestas registradas! No lo pienses más y deja una posible respuesta
      para esta pregunta.
    </p>;
  }

  return (
    <section>
      {renderQuestion()}
      {userId && <Link to={"/answer/" + id} className="button right">
        Responder
      </Link>}

      <h2>Respuestas</h2>
      {renderAnswers()}
    </section>
  )
}

export default SingleQuestionPage;
