import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { fetchQuestions, searchQuestions } from '../actions/index.js';
import { Question } from '../components/Question';
import { BsSearch } from "react-icons/bs";


const QuestionsPage = () => {


    const dispatch = useDispatch();
    const loading = useSelector((state) => state.loading);
    const hasErrors = useSelector((state) => state.hasErrors);
    const questions = useSelector((state) => state.questions);
    const search = useSelector((state) => state.search);
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
            return questions.map(question => <Question key={question.id} question={question} excerpt />)
        }else{
            return search.map(question => <Question key={question.id} question={question} excerpt />)
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
