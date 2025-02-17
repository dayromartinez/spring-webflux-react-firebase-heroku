import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';
export const LOADING = 'LOADING';
export const LOADED_SUCCESS = 'LOADED_SUCCESS';
export const LOADED_FAILURE = 'LOADED_FAILURE';
export const FILTER_CATEGORY = 'FILTER_CATEGORY';
export const SEARCH_QUESTIONS = 'SEARCH_QUESTIONS';

const URL_BASE = 'https://preguntas-app.herokuapp.com';

//Acciones autenticacion
export const login = (email, uid, name, img) => ({ 
    type: LOGIN, payload: {email, uid, name, img} 
});

export const loginWithEmail = (email, password) => {
    return async dispatch => {
        dispatch(loading())
        const auth = firebase.auth();
        try {
            console.log(email, password);
            await auth.signInWithEmailAndPassword(email, password);
            dispatch(success({email, redirect: '/'}));
        } catch (error) {
            dispatch(failure())
        }
    }
};

export const logout = () => ({
    type: LOGOUT
});


//Acciones preguntas
export const loading = () => ({ type: LOADING });

export const success = (payload) => ({
    type: LOADED_SUCCESS,
    payload
});

export const failure = () => ({ type: LOADED_FAILURE })

export function fetchQuestions() {
    return async dispatch => {
        dispatch(loading())
        try {
            const response = await fetch(
                `${URL_BASE}/getAll`
            )
            const data = await response.json()
            dispatch(success({ questions: data, redirect: null }))
        } catch (error) {
            dispatch(failure())
        }
    }
}

export function fetchOwnerQuestions(userId) {
    return async dispatch => {
        dispatch(loading())
        try {
            const response = await fetch(`${URL_BASE}/getOwnerAll/${userId}`)
            const data = await response.json()
            dispatch(success({ questions: data, redirect: null }))
        } catch (error) {
            dispatch(failure())
        }
    }
}

export function fetchQuestion(id) {
    return async dispatch => {
        dispatch(loading())
        try {
            const response = await fetch(`${URL_BASE}/get/${id}`)
            const data = await response.json();
            dispatch(success({ question: data, redirect: null }))
        } catch (error) {
            dispatch(failure())
        }
    }
}

export function postQuestion(question) {
    return async dispatch => {
        dispatch(loading())
        try {
            const response = await fetch(`${URL_BASE}/create`,
                {
                    method: 'POST',
                    mode: 'cors',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(question)
                }
            )
            const id = await response.text();
            dispatch(success({redirect: `/question/${id}`}));
        } catch (error) {
            dispatch(failure())
        }
    }
}

export function deleteQuestion(id) {
    return async dispatch => {
        dispatch(loading())
        try {
            await fetch(`${URL_BASE}/delete/${id}`,
                {
                    method: 'DELETE',
                    mode: 'cors',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            )
            dispatch(success({redirect: `/list`}));
        } catch (error) {
            dispatch(failure())
        }
    }
}

export function postAnswer(answer) {
    return async dispatch => {
        dispatch(loading())
        try {
            await fetch(`${URL_BASE}/add`,
                {
                    method: 'POST',
                    mode: 'cors',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(answer)
                }
            )
            dispatch(success({redirect: `/question/${answer.questionId}`}));
        } catch (error) {
            dispatch(failure())
        }
    }
}

export function deleteAnswer(id) {
    
    return async dispatch => {
        dispatch(loading())
        try {
            await fetch(`${URL_BASE}/deleteAnswer/${id}`,
                {
                    method: 'DELETE',
                    mode: 'cors',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            )
            dispatch(success({}));
        } catch (error) {
            dispatch(failure())
        }
    }
}

export function filterCategory(category){
    return function(dispatch){
        dispatch({type: FILTER_CATEGORY, payload: category})
    }
}

export function searchQuestions(text){
    return function(dispatch){
        dispatch({type: SEARCH_QUESTIONS, payload: text})
    }
}

export function createUser(email, password, nombre, apellidos, img){
    return async dispatch => {
        dispatch(loading())
        const auth = firebase.auth();
        try {
            await auth.createUserWithEmailAndPassword(email, password);
            dispatch(success({email, name: nombre+" "+apellidos, img, redirect: `/`}));
        } catch (error) {
            dispatch(failure())
        }
    }
}