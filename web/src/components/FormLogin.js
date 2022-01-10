import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from "react-router-dom";
import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import Swal from "sweetalert2";


export const FormLogin = () => {

    const dispatch = useDispatch();
    const auth = firebase.auth();
    const [user] = useAuthState(auth);
    //const loading = useSelector((state) => state.loading);
    //const hasErrors = useSelector((state) => state.hasErrors);
    const [state, setState] = useState({
        email: "",
        password: "",
        clickLogin: false,
    });
    
    const onSubmit = (e) => {
        e.preventDefault();
        let expRegEmail = new RegExp('^[^@]+@[^@]+\\.[a-zA-Z]{2,}$');
        let result = expRegEmail.test(state.email);
        if(result){
            setState({
                ...state,
                clickLogin: true
            })
            
            
        }else{
            setState({
                ...state,
                email: ""
            })
            Swal.fire({
                icon: "error",
                title: "Estructura correo incorrecta",
                text: `El campo correo debe tener la siguiente estructura: "correo@email.com"`,
            });
        }
        console.log(result);
        console.log("click");
    };

    const onChange = (e) => {
        setState({
            ...state,
            [e.target.id] : e.target.value
        });
    };

    return (
        <div className="div_login">
            <section>
                <h3 className="titulo_form_login">Iniciar Sesión</h3>
                <form onSubmit={onSubmit}>
                    <div className="contenedor_input_login">
                        <label for="email" className="label_login">Correo Electrónico</label>
                        <input id="email" placeholder="correo@email.com" onChange={onChange} value={state.email} 
                    type="text" className="input_login" autoComplete='off' required="true"/>
                    </div>
                    <div className="contenedor_input_login">
                        <label className="label_login" for="password">Contraseña</label>
                        <input id="password" placeholder="Contraseña" onChange={onChange} value={state.password} 
                    type="password" className="input_login" autoComplete='off' required="true"/>
                    </div>
                    <div className="contenedor_button_login">
                        <button type="submit" className="button">{
                            "Iniciar Sesión"
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