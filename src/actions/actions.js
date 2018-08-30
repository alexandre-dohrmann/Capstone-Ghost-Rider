import { FETCH_CSRF_TOKEN } from './actionTypes';
import { LOGIN_ACTION } from './actionTypes';
import { FETCH_CARS } from './actionTypes';
import { ADD_CAR_ACTION } from './actionTypes';
import { DELETE_CAR_ACTION } from './actionTypes';
import { EDIT_CAR_ACTION } from './actionTypes';



export const fetchCsrfTokenAction = async (dispatch) => {
    const token = await fetch('http://localhost:8000/api/get_csrf/', {
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
    const loginResponse = await fetch('http://localhost:8000/get_auth_token/', {
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
    const cars = await fetch('http://localhost:8000/api/cars/');
    const carsJson = await cars.json();
    console.log("THIS IS GETTING CARS", Alex)
    dispatch({
        type: FETCH_CARS,
        payload: carsJson
    })
}

export const addCarAction = async (dispatch, data) => {
    console.log(data);
    const createdCar = await fetch('http://localhost:8000/api/cars/', {
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
    const deleteCar = await fetch('http://localhost:8000/api/cars/' + data.id, {
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
    } else {
        console.log('you fucked');
    }
};

export const editCarAction = async (dispatch, data) => {
    console.log(data)
    const editResponse = await fetch('http://localhost:8000/api/cars/' + data.editCarId, {
        method: 'PUT',
        body: JSON.stringify(data.carToEdit),
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': data.csrfmiddlewaretoken,
            'Authorization': `Token ${data.auth_token}`
        }
    });
    const editedCarJson = await editResponse.json();
    console.log('## Parsed RESPONSE', editedCarJson);
    console.log(editResponse);
    if (editResponse.status === 200) {
        dispatch({
            type: EDIT_CAR_ACTION,
            payload: editedCarJson
        });
        console.log("SUCCESFUL EDIT")
    } else {
        console.log('you fucked');
    }
};