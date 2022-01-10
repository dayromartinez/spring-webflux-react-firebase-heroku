import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from "react-router-dom";
import Swal from "sweetalert2";


export const FormLogin = () => {

    const dispatch = useDispatch();
    const loading = useSelector((state) => state.loading);
    const hasErrors = useSelector((state) => state.hasErrors);
    const { register, handleSubmit } = useForm();
    const [state, setState] = useState({
        email: "",
        password: "",
        clickLogin: false,
    });
    
    const onSubmit = (data) => {
        // data.userId = userId;
        // data.questionId = id;
        // dispatch(postAnswer(data));
        // Swal.fire({
        //     icon: "success",
        //     title: "Respuesta creada!",
        //     text: `La respuesta para esta pregunta ha sido registrada con éxito :)`,
        // });
        setState({
            ...state,
            clickLogin: true
        })
    };

    const onChange = (e) => {
        setState({
            ...state,
            [e.target.id] : e.target.value
        });
        console.log(e.target.id +": "+ e.target.value);
    };

    return (
        <div className="div_login">
            <section>
                <h3 className="titulo_form_login">Iniciar Sesión</h3>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="contenedor_input_login">
                        <label for="email" className="label_login">Correo Electrónico</label>
                        <input id="email" placeholder="correo@email.com" onChange={onChange} value={state.email} 
                    type="text" className="input_login" autoComplete='off'/>
                    </div>
                    <div className="contenedor_input_login">
                        <label className="label_login" for="password">Contraseña</label>
                        <input id="password" placeholder="Contraseña" onChange={onChange} value={state.password} 
                    type="password" className="input_login" autoComplete='off'/>
                    </div>
                    <div className="contenedor_button_login">
                        <button type="submit" className="button" disabled={loading}>{
                            loading ? "Autenticando...." : "Iniciar Sesión"
                        }</button>
                    </div>
                </form>
                <p className="text_form_register_user">¿No tienes una cuenta? &nbsp;&nbsp;
                    <NavLink to="/newUser" className="navlink_register">Regístrate</NavLink>
                </p>
            </section>
        </div>
    )
}