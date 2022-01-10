import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchOwnerQuestions, deleteQuestion } from '../actions/index.js';
import { Question } from '../components/Question';
import Swal from "sweetalert2";

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

        Swal.fire({
            title: '¿Está seguro de que desea eliminar esta pregunta?',
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
                    title: "Pregunta no eliminada!",
                    text: `Esta pregunta sigue estando registrada:)`,
                });
            } else if (result.isDenied) {
                dispatch(deleteQuestion(id));
                Swal.fire({
                    icon: "info",
                    title: "Pregunta eliminada!",
                    text: `La pregunta ha sido eliminada exitosamente.`,
                })
            }
        })
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
        <div className='div_pregunta_componente'>
            <section>
                <h1>Mis Preguntas</h1>
                {renderQuestions()}
            </section>
        </div>
    )
}

export default OwnerQuestionsPage;
