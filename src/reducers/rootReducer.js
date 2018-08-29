import { combineReducers } from 'redux';
// import AuthReducer from './auth';
import AuthReducer from './authReducer';
import CarsReducer from './carsReducer';
import CommentsReducer from './commentsReducer';
// import ModalReducer from './modal';

const rootReducer = combineReducers({
    auth: AuthReducer,
    cars: CarsReducer,
    comments: CommentsReducer,
    // modal: ModalReducer,
});

export default rootReducer;