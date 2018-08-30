import { FETCH_CSRF_TOKEN } from '../actions/actionTypes';
import { LOGIN_ACTION } from '../actions/actionTypes';


const initialState = {
    csrf_token: '',
    auth_token: '',
    username: '',
    password: '',
    isLogged: false,
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_CSRF_TOKEN:
            return {
                ...state,
                csrf_token: action.payload,
                isLogged: true

            };
        case LOGIN_ACTION:
            console.log("THIS HAS BEEN TRIGGERED FOR CASE LOGIN ACTION")
            console.log(action.payload)
            return {
                ...state,
                auth_token: action.payload.token,
                isLogged: true

            };
        default:
            return state;
    }
};

export default authReducer;