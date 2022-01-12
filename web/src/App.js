import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import { useSelector } from 'react-redux';
import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import { login, logout } from './actions/index.js';
import { PublicNavbar, PrivateNavbar, Footer } from './components/Navbar';
import HomePage from './pages/HomePage';
import SingleQuestionPage from './pages/SingleQuestionPage';
import QuestionsPage from './pages/QuestionsPage';
import QuestionFormPage from './pages/QuestionFormPage';
import AnswerFormPage from './pages/AnswerFormPage';
import OwnerQuestionsPage from './pages/OwnerQuestionsPage';
import { useAuthState } from "react-firebase-hooks/auth";
import { FcGoogle } from "react-icons/fc";
import { FormLogin } from "./components/FormLogin.js";
import { UserFormPage } from "./pages/UserFormPage.js";
import Swal from "sweetalert2";

firebase.initializeApp({
  apiKey: "AIzaSyC0tsd2w3eGHPZf1i7w4DOPBkMh8xKPCmc",
  authDomain: "app-preguntas-front.firebaseapp.com",
  projectId: "app-preguntas-front",
  storageBucket: "app-preguntas-front.appspot.com",
  messagingSenderId: "572891950340",
  appId: "1:572891950340:web:b3b409f82a893b66c37451",
  measurementId: "G-HFF9NWM8NB"
});

const auth = firebase.auth();


const App = ({ dispatch }) => {

  
  const [user] = useAuthState(auth);
  if(user){
    dispatch(login(user.email, user.uid, user.displayName, user.photoURL));
    Swal.fire({
      icon: "success",
      title: "Sesión iniciada!",
      text: `Bienvenid@ de nuevo a 'Quién quiere ser Sofkiano', ${user.displayName ? user.displayName : "querido usuario!"}!`,
    })
  }
  return (
    <Router>
      {user ?
        <>
          <PrivateNavbar />
          <Switch>
            <Route exact path="/" component={() => {
              return <HomePage><SignOut dispatch={dispatch} /></HomePage>
            }} />
            <Route exact path="/questions" component={QuestionsPage} />
            <Route exact path="/question/:id" component={SingleQuestionPage} />
            <Route exact path="/list" component={OwnerQuestionsPage} />
            <Route exact path="/answer/:id" component={AnswerFormPage} />
            <Route exact path="/new" component={QuestionFormPage} />
            <Redirect to="/" />
          </Switch>
        </> :
        <>
          <PublicNavbar />
          <Switch>
            <Route exact path="/" component={() => {
              return <HomePage><FormLogin /><SignIn dispatch={dispatch} /></HomePage>
            }} />
            <Route exact path="/newUser" component={UserFormPage} />
            <Route exact path="/questions" component={QuestionsPage} />
            <Route exact path="/question/:id" component={SingleQuestionPage} />
            <Route exact path="/answer/:id" component={AnswerFormPage} />
            <Redirect to="/" />
          </Switch>
        </>
      }
      <Footer />
    </Router>
  )
}


function SignIn() {
  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider);
  };
  return <div className='button_google'><button className="button" onClick={signInWithGoogle}><FcGoogle /> &nbsp;&nbsp;&nbsp; Registrarse y/o Iniciar sesión con Google</button></div>
}

function SignOut({ dispatch }) {
  const name = useSelector((state) => state.name);
  return (
    auth.currentUser && (
      <button
        className="button right"
        onClick={() => {
          dispatch(logout())
          auth.signOut();
          Swal.fire({
            icon: "info",
            title: "Sesión finalizada!",
            text: `Hasta pronto, ${name ? name : "querido usuario!"}!`,
          })
        }}
      >
        Cerrar Sesión
      </button>
    )
  );
}


export default App;
