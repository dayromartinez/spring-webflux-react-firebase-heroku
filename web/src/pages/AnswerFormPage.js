import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { fetchQuestion, postAnswer } from '../actions/index.js';
import { useDispatch, useSelector } from 'react-redux';
import { Question } from '../components/Question';
import Swal from "sweetalert2";


const FormPage = ({ match }) => {


    const { register, handleSubmit } = useForm();
    const history = useHistory();
    const dispatch = useDispatch();

    const loading = useSelector((state) => state.loading);
    const redirect = useSelector((state) => state.redirect);
    const hasErrors = useSelector((state) => state.hasErrors);
    const question = useSelector((state) => state.question);
    const userId = useSelector((state) => state.uid);
    const { id } = match.params;
    

    const onSubmit = (data) => {
        data.userId = userId;
        data.questionId = id;
        dispatch(postAnswer(data));
        Swal.fire({
            icon: "success",
            title: "Respuesta creada!",
            text: `La respuesta para esta pregunta ha sido registrada con éxito :)`,
        });
    };

    useEffect(() => {
        dispatch(fetchQuestion(id))
    }, [dispatch, id])

    useEffect(() => {
        if (redirect) {
            history.push(redirect);
        }
    }, [redirect, history])

    const renderQuestion = () => {
        if (loading.question) return <p>Cargando pregunta...</p>
        if (hasErrors.question) return <p>No es posible visualizar esta pregunta.</p>

        return <Question question={question} />
    }


    return (
        <section>
            {renderQuestion()}
            <h1>Nueva Respuesta</h1>

            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <label for="answer">Respuesta</label>
                    <textarea id="answer" {...register("answer", { required: true, maxLength: 300 })} />
                </div>
                <button type="submit" className="button" disabled={loading}>{
                    loading ? "Guardando...." : "Enviar"
                }</button>
            </form>
        </section>

    );
}

export default FormPage;