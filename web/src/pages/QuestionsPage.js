import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { fetchQuestions } from '../actions/index.js';
import { Question } from '../components/Question'

const QuestionsPage = ({ dispatch, loading, questions, hasErrors }) => {
    useEffect(() => {
        dispatch(fetchQuestions())
    }, [dispatch])
    
    const renderQuestions = () => {
        if (loading) return <p>Loading questions...</p>
        if (hasErrors) return <p>Unable to display questions.</p>

        return questions.map(question => <Question key={question.id} question={question} excerpt />)
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
})

export default connect(mapStateToProps)(QuestionsPage);
