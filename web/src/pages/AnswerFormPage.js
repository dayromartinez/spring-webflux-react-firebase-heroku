import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { fetchQuestion, postAnswer } from '../actions/index.js';
import { useDispatch, useSelector } from 'react-redux';
import { Question } from '../components/Question';
import Swal from "sweetalert2";
import { Editor } from '@tinymce/tinymce-react'; 

const FormPage = ({ match }) => {

    const history = useHistory();
    const dispatch = useDispatch();
    const [answer, setAnswer] = useState("");

    const loading = useSelector((state) => state.loading);
    const redirect = useSelector((state) => state.redirect);
    const hasErrors = useSelector((state) => state.hasErrors);
    const question = useSelector((state) => state.question);
    const userId = useSelector((state) => state.uid);
    const { id } = match.params;
    

    const onSubmit = (e) => {
        
        e.preventDefault();
        const data = {
            answer: answer,
            userId : userId,
            questionId : id
        }
        dispatch(postAnswer(data));
        Swal.fire({
            icon: "success",
            title: "Respuesta creada!",
            text: `La respuesta ha sido registrada satisfactoriamente :)`,
        });
    };

    useEffect(() => {
        dispatch(fetchQuestion(id))
    }, [dispatch])

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

    const handleEditorChange = (e) => {
        console.log(
            'Content was updated:',
            e.target.getContent()
        )
        setAnswer(e.target.getContent());
    }

    return (
        <section>
            {renderQuestion()}
            <h2>Nueva Respuesta</h2>
            <form onSubmit={onSubmit}>
                <Editor
                    apiKey="32h1d3e0zuqsrqr9s37wmt7zvdic2gwc45c2ogpgjw7ttu0s"
                    initialValue="<h4>Escribe aquí tu respuesta...</h4>"
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
                <button type="submit" className="button" disabled={loading} style={{'marginTop': '2rem'}}>{
                    loading ? "Guardando...." : "Enviar"
                }</button>
            </form>
        </section>
    );
}

export default FormPage;