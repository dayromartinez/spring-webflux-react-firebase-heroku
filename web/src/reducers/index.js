import * as actions from '../actions/index.js';

export const initialState = {

    loading: true,
    hasErrors: false,
    questions: [],
    question: {},
    search: [],
    redirect: null,
    name: null,
    email: null,
    img: null,
    uid: null

}

export default function rootReducer(state = initialState, action) {

    switch (action.type) {

        case actions.LOADING:
            return { ...state, loading: true };

        case actions.LOADED_SUCCESS:
            return { ...state, ...action.payload, loading: false, hasErrors: false };

        case actions.LOADED_FAILURE:
            return { ...state, loading: false, hasErrors: true }

        case actions.LOGIN:
            const payload = action.payload;
            return { ...state, email: payload.email, uid: payload.uid, name: payload.name, img: payload.img };

        case actions.LOGOUT:
            return initialState;

        case actions.FILTER_CATEGORY:
            const questionsCategory = state.questions.filter(question => {
                return question.category === action.payload;
            });
            return {...state, questions: questionsCategory};

        case actions.SEARCH_QUESTIONS:
            const coincidencias = state.questions.filter(question => {
                return question.question.toLowerCase().includes(action.payload.toLowerCase());
            })
            return {...state, search: coincidencias}

        default:
            return state;
    }
}
