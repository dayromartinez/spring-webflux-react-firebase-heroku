import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { fetchQuestions, searchQuestions } from '../actions/index.js';
import { Question } from '../components/Question';
import { BsSearch } from "react-icons/bs";
import imageDefault from "../imagenes/image_perfil_defecto.png";

const QuestionsPage = () => {


    const dispatch = useDispatch();
    const loading = useSelector((state) => state.loading);
    const hasErrors = useSelector((state) => state.hasErrors);
    const questions = useSelector((state) => state.questions);
    const search = useSelector((state) => state.search);
    const img = useSelector((state) => state.img);
    const name = useSelector((state) => state.name);
    const email = useSelector((state) => state.email);

    const [busqueda, setBusqueda] = useState("");

    const onChange = (e) => {
        setBusqueda(e.target.value);
    }


    useEffect(() => {
        if(busqueda === ""){
            dispatch(fetchQuestions());
        }else{
            dispatch(searchQuestions(busqueda));
        }
    }, [dispatch, busqueda])
    
    const renderQuestions = () => {

        if (loading) return <p>Cargando preguntas...</p>
        if (hasErrors) return <p>No ha sido posible visualizar las preguntas.</p>

        if(busqueda === ""){
            return questions.map(question => {
                return (
                    <div className='contenedor_pregunta'>
                        <div className='contenedor_info_usuario'>
                            <img src={question.imageUser !== null && question.imageUser !== "" ? question.imageUser : imageDefault} alt="Imagen usuario" style={{'width': '96px', 'height': '96px'}}/>
                            <h5 className='nombre_usuario'>{question.nameUser !== null && question.nameUser !== "" ? question.nameUser : "Nombre no disponible"}</h5>
                        </div>
                        <Question key={question.id} question={question} excerpt />
                    </div>
                )
        })
        }else{
            return search.map(question => {
                return (
                    <div className='contenedor_pregunta'>
                        <div className='contenedor_info_usuario'>
                            <img src={question.imageUser !== null && question.imageUser !== "" ? question.imageUser : imageDefault} alt="Imagen usuario" style={{'width': '96px', 'height': '96px'}}/>
                            <h5 className='nombre_usuario'>{question.nameUser !== null && question.nameUser !== "" ? question.nameUser : "Nombre no disponible"}</h5>
                        </div>
                        <Question key={question.id} question={question} excerpt />
                    </div>
                )
            })
        }
    }

    const renderSuggestions = () => {
        return search.map(question => <div className='autocomplete_list'>
            <button className='autocomplete_item' ><NavLink className='autocomplete_navlink' to={`/question/${question.id}`}><BsSearch /> {question.question}</NavLink></button>
        </div>)
    }

    return (
        <div className='div_questions'>
            <section>
                <div className='div_preguntas'>
                    <h1>Preguntas</h1>
                    <input placeholder='Buscar pregunta...' onChange={onChange} value={busqueda} name="busqueda" 
                    type="text" className="input_search" autoComplete='off'/>
                </div>
                {busqueda !== "" ? renderSuggestions() : null}
                <br></br>
                <br></br>
                {renderQuestions()}
            </section>
        </div>
    )
}

export default QuestionsPage;
