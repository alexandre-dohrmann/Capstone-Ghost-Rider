import { FETCH_CSRF_TOKEN } from './actionTypes';
import { LOGIN_ACTION } from './actionTypes';
import { FETCH_CARS } from './actionTypes';
import { ADD_CAR_ACTION } from './actionTypes';
import { DELETE_CAR_ACTION } from './actionTypes';



export const fetchCsrfTokenAction = async (dispatch) => {
    const token = await fetch('https://ghostrider-react-django-python.herokuapp.com/api/get_csrf/', {
        credentials: 'include'
    })
    const parsedToken = await token.json()
    console.log(parsedToken, 'parsed token #####');
    console.log(parsedToken.token);
    dispatch({
        type: FETCH_CSRF_TOKEN,
        payload: parsedToken.token
    });
};

export const loginAction = async (dispatch, data) => {
    console.log(data);
    console.log('IN LOGIN ACTION')
    const loginResponse = await fetch('https://ghostrider-react-django-python.herokuapp.com/get_auth_token/', {
        credentials: 'include',
        method: 'POST',
        body: JSON.stringify(
            data),
        headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': data.csrfmiddlewaretoken,
        }
    });
    const parsedResponse = await loginResponse.json();
    console.log('## Parsed RESPONSE', parsedResponse);
    console.log(parsedResponse.status, '### PARSED RESPONSE');

    if (parsedResponse.status === 201) {
        this.props.history.push('/');
    }
    dispatch({
        type: LOGIN_ACTION,
        payload: parsedResponse
    });
};

export const getCarsAction = async (dispatch, Alex) => {
    const cars = await fetch('https://ghostrider-react-django-python.herokuapp.com/api/cars/');
    const carsJson = await cars.json();
    console.log("THIS IS GETTING CARS", Alex)
    dispatch({
        type: FETCH_CARS,
        payload: carsJson
    })
}

export const addCarAction = async (dispatch, data) => {
    console.log(data);
    console.log('IN LOGIN ACTION')
    const createdCar = await fetch('https://ghostrider-react-django-python.herokuapp.com/api/cars/', {
        method: 'POST',
        body: JSON.stringify(data),

        headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': data.csrfmiddlewaretoken,
            'Authorization': `Token ${data.auth_token}`
        }
    });
    const createdCarJson = await createdCar.json();
    console.log('## Parsed RESPONSE', createdCarJson);

    dispatch({
        type: ADD_CAR_ACTION,
        payload: createdCarJson
    });
};

export const deleteCarAction = async (dispatch, data) => {
    const deleteCar = await fetch('https://ghostrider-react-django-python.herokuapp.com/api/cars/' + data.id, {
        method: 'DELETE',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': data.csrfmiddlewaretoken,
            'Authorization': `Token ${data.auth_token}`
        }
    });
    console.log(deleteCar, 'this is delete car');
    if (deleteCar.status === 204) {
        dispatch({
            type: DELETE_CAR_ACTION,
            payload: data.id
        });
        console.log("SUCCESFUL DELETE")
        // this.setState({ cars: this.props.cars.filter((car, i) => car.id !== id) });
    } else {
        console.log('you fucked');
    }
};