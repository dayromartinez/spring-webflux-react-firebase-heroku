import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchOwnerQuestions, deleteQuestion } from '../actions/index.js';
import { Question } from '../components/Question';

const OwnerQuestionsPage = () => {

    const dispatch = useDispatch();

    const loading = useSelector((state) => state.loading);
    const redirect = useSelector((state) => state.redirect);
    const hasErrors = useSelector((state) => state.hasErrors);
    const questions = useSelector((state) => state.questions);
    const userId = useSelector((state) => state.uid);

    useEffect(() => {
        dispatch(fetchOwnerQuestions(userId))
    }, [dispatch, userId]);

    useEffect(() => {
        if (redirect) {
            dispatch(fetchOwnerQuestions(userId))
        }
    }, [redirect, dispatch, userId]);

    const onDelete = (id) => {
        dispatch(deleteQuestion(id))
    }


    const renderQuestions = () => {
        if (loading) return <p>Cargando preguntas...</p>
        if (hasErrors) return <p>No ha sido posible visualizar las preguntas.</p>

        return questions.map(question => <Question
            key={question.id}
            question={question}
            excerpt onDelete={onDelete} />)
    }

    return (
        <section>
            <h1>Mis Preguntas</h1>
            {renderQuestions()}
        </section>
    )
}

export default OwnerQuestionsPage;
