import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { postQuestion } from '../actions/index.js';
import { useDispatch, useSelector } from 'react-redux';
import Swal from "sweetalert2";

const FormPage = () => {

    const { register, handleSubmit } = useForm();
    const history = useHistory();
    const dispatch = useDispatch();

    const loading = useSelector((state) => state.loading);
    const redirect = useSelector((state) => state.redirect);
    const userId = useSelector((state) => state.uid);
    const image = useSelector((state) => state.img);
    const name = useSelector((state) => state.name);
    const email = useSelector((state) => state.email);

    const onSubmit = data => {
        data.userId = userId;
        data.imageUser = image;
        data.nameUser = name;
        data.emailUser = email;
        console.log(data);
        dispatch(postQuestion(data));
        Swal.fire({
            icon: "success",
            title: "Pregunta creada!",
            text: `La pregunta ha sido registrada con éxito :)`,
        });
    };

    useEffect(() => {
        if (redirect) {
            history.push(redirect);
        }
    }, [redirect, history])

    return (
        <section>
            <h1>Nueva Pregunta</h1>

            <form onSubmit={handleSubmit(onSubmit)}>

                <div>
                    <label for="type">Tipo</label>
                    <select {...register("type")} id="">
                        <option value="ABIERTA (CAJA GRANDE ABIERTA)">ABIERTA (CAJA GRANDE ABIERTA)</option>
                        <option value="OPINIÓN (CAJA PEQUEÑA ABIERTA)">OPINIÓN (CAJA PEQUEÑA ABIERTA)</option>
                        <option value="CON RESULTADOS (CAJA ABIERTA CON LINK)">CON RESULTADOS (CAJA ABIERTA CON LINK)</option>
                        <option value="CON EVIDENCIA (CAJA ABIERTA CON VIDEO)">CON EVIDENCIA (CAJA ABIERTA CON VIDEO)</option>
                    </select>
                </div>
                <div>
                    <label for="category">Categoría</label>
                    <select {...register("category")} id="category">
                        <option value="TECNOLOGÍA Y COMPUTACIÓN">TECNOLOGÍA Y COMPUTACIÓN</option>
                        <option value="CIENCIAS">CIENCIAS</option>
                        <option value="DESARROLLO DE SOFTWARE">DESARROLLO DE SOFTWARE</option>
                        <option value="CIENCIAS SOCIALES">CIENCIAS SOCIALES</option>
                        <option value="LENGUAJE">LENGUAJE</option>
                    </select>
                </div>

                <div>
                    <label for="question">Pregunta</label>
                    <textarea id="question" {...register("question", { required: true, maxLength: 300 })} />
                </div>
                <button type="submit" className="button" disabled={loading} >{
                    loading ? "Guardando...." : "Enviar"
                }</button>
            </form>
        </section>

    );
}

export default FormPage;