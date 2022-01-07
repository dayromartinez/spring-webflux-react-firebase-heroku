import * as actions from '../actions/index.js';

export const initialState = {

    loading: true,
    hasErrors: false,
    questions: [],
    question: {},
    redirect: null,
    email: null,
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
            return { ...state, email: payload.email, uid: payload.uid };

        case actions.LOGOUT:
            return initialState;

        default:
            return state;
    }
}
