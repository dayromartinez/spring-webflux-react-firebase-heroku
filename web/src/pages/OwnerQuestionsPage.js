import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchOwnerQuestions, deleteQuestion } from '../actions/index.js';
import { Question } from '../components/Question';

const OwnerQuestionsPage = ({ dispatch, loading, questions, hasErrors, redirect, userId }) => {
    useEffect(() => {
        dispatch(fetchOwnerQuestions(userId))
    }, [dispatch, userId]);

    useEffect(() => {
        if (redirect) {
            dispatch(fetchOwnerQuestions(userId))
        }
    }, [redirect, dispatch, userId]);

    const onDelete = (id) => {
        dispatch(deleteQuestion(id))
    }


    const renderQuestions = () => {
        if (loading) return <p>Loading questions...</p>
        if (hasErrors) return <p>Unable to display questions.</p>

        return questions.map(question => <Question
            key={question.id}
            question={question}
            excerpt onDelete={onDelete} />)
    }

    return (
        <section>
            <h1>Questions</h1>
            {renderQuestions()}
        </section>
    )
}

const mapStateToProps = state => ({
    loading: state.loading,
    questions: state.questions,
    hasErrors: state.hasErrors,
    redirect: state.redirect,
    userId: state.uid
})

export default connect(mapStateToProps)(OwnerQuestionsPage)
