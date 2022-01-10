import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import Swal from "sweetalert2";


export const UserFormPage = () => {

    const dispatch = useDispatch();
    //const loading = useSelector((state) => state.loading);
    //const hasErrors = useSelector((state) => state.hasErrors);
    const [state, setState] = useState({
        nombre: "",
        apellidos: "",
        imagen: "",
        correo: "",
        contraseña: "",
        clickRegister: false,
    });
    
    const onSubmit = (e) => {
        
        e.preventDefault();

        let expRegEmail = new RegExp('^[^@]+@[^@]+\\.[a-zA-Z]{2,}$');
        let result = expRegEmail.test(state.correo);
        if(result){
            setState({
                ...state,
                clickRegister: true
            })
        }else{
            setState({
                ...state,
                correo: ""
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
        //console.log(e.target.id +": "+ e.target.value);
    };

    return (
        <div className="div_register">
            <section>
                <h1 className="titulo_form_register">Registrar Usuario</h1>
                <form onSubmit={onSubmit}>
                    <div className="contenedor_input_register">
                        <label for="nombre" className="label_register">Nombres</label>
                        <input id="nombre" placeholder="Nombre" onChange={onChange} value={state.nombre} 
                        type="text" className="input_register" autoComplete='off' required="true"/>
                    </div>
                    <div className="contenedor_input_register">
                        <label for="apellidos" className="label_register">Apellidos</label>
                        <input id="apellidos" placeholder="Apellidos" onChange={onChange} value={state.apellidos} 
                        type="text" className="input_register" autoComplete='off' required="true"/>
                    </div>
                    <div className="contenedor_input_register">
                        <label for="imagen" className="label_register">Imagen Perfil</label>
                        <input id="imagen" placeholder="Inserte aquí la url de su imagen de perfil" onChange={onChange} value={state.imagen} 
                        type="text" className="input_register" autoComplete='off'/>
                    </div>
                    <div className="contenedor_input_register">
                        <label for="correo" className="label_register">Correo Electrónico</label>
                        <input id="correo" placeholder="correo@email.com" onChange={onChange} value={state.correo} 
                    type="text" className="input_register" autoComplete='off' required="true"/>
                    </div>
                    <div className="contenedor_input_register">
                        <label className="label_register" for="contraseña">Contraseña</label>
                        <input id="contraseña" placeholder="Contraseña" onChange={onChange} value={state.contraseña} 
                    type="password" className="input_register" autoComplete='off' required="true"/>
                    </div>
                    <div className="contenedor_button_register">
                        <button type="submit" className="button" > Crear Usuario </button>
                    </div>
                </form>
            </section>
        </div>
    )
}