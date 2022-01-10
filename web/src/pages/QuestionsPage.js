import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchQuestions } from '../actions/index.js';
import { Question } from '../components/Question';

const QuestionsPage = () => {


    const dispatch = useDispatch();
    const loading = useSelector((state) => state.loading);
    const hasErrors = useSelector((state) => state.hasErrors);
    const questions = useSelector((state) => state.questions);

    useEffect(() => {
        dispatch(fetchQuestions())
    }, [dispatch])
    
    const renderQuestions = () => {

        if (loading) return <p>Cargando preguntas...</p>
        if (hasErrors) return <p>No ha sido posible visualizar las preguntas.</p>

        return questions.map(question => <Question key={question.id} question={question} excerpt />)
    }

    return (
        <div className='div_questions'>
            <section>
                <h1>Preguntas</h1>
                {renderQuestions()}
            </section>
        </div>
    )
}

export default QuestionsPage;
