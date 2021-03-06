import { FETCH_CARS } from '../actions/actionTypes';
import { ADD_CAR_ACTION } from '../actions/actionTypes';
import { DELETE_CAR_ACTION } from '../actions/actionTypes';
import { EDIT_CAR_ACTION } from '../actions/actionTypes';




const initialState = {
    carsList: [],
    showEdit: false,
    editCarId: null,
    carToEdit: {
        make: '',
        model: '',
        year: '',
        img_url: '',
        description: '',
    },
    modal: false
};

const carsReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_CARS:
            console.log('CarsReducer Stage - Getting Cars');
            return {
                ...state,
                carsList: action.payload
            };
        case ADD_CAR_ACTION:
            console.log('CarsReducer Stage - ADDING Cars');
            return {
                ...state,
                carsList: [...state.carsList, action.payload]
            };
        case DELETE_CAR_ACTION:
            console.log('CarsReducer Stage - DELETING THE CAR');
            return {
                ...state,
                carsList: state.carsList.filter((car, i) => car.id !== action.payload)
            };
        case EDIT_CAR_ACTION:
            console.log('CarsReducer Stage - EDITING THE CAR');
            return {
                ...state,
                carsList: state.carsList.map((car) => {
                    if (car.id === action.payload.id) {
                        return action.payload
                    }
                    return car
                })
            };
        default:
            return state;
    }
};

export default carsReducer;