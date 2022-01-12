import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { postQuestion } from '../actions/index.js';
import { useDispatch, useSelector } from 'react-redux';
import Swal from "sweetalert2";
import { Editor } from '@tinymce/tinymce-react'; 

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
    const [question, setQuestion] = useState("");

    const onSubmit = data => {
        data.userId = userId;
        data.imageUser = image;
        data.nameUser = name;
        data.emailUser = email;
        data.question = question;
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

    const handleEditorChange = (e) => {
        console.log(
            'Content was updated:',
            e.target.getContent()
        )
        setQuestion(e.target.getContent());
    }

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
                    <h2 for="question">Pregunta</h2>
                    <Editor
                    apiKey="32h1d3e0zuqsrqr9s37wmt7zvdic2gwc45c2ogpgjw7ttu0s"
                    initialValue="<h4>Escribe aquí tu pregunta...</h4>"
                    init={{
                    height: 500,
                    menubar: true,
                    plugins: [
                        'advlist autolink lists link image', 
                        'charmap print preview anchor help',
                        'searchreplace visualblocks code',
                        'insertdatetime media table paste wordcount'
                    ],
                    toolbar:
                        'undo redo | formatselect | bold italic | \
                        alignleft aligncenter alignright | \
                        bullist numlist outdent indent | help'
                    }}
                    onChange={handleEditorChange}
                />
                </div>
                <button type="submit" className="button" disabled={loading} style={{'marginTop': '2rem'}}>{
                    loading ? "Guardando...." : "Enviar"
                }</button>
            </form>
        </section>

    );
}

export default FormPage;