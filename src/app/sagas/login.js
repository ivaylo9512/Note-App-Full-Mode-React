import { takeLatest, put } from 'redux-saga/effects';
import { onLoginComplete, onLoginError } from '../slices/authenticateSlice';
import { BASE_URL } from '../../constants';
import history from '../../utils/history';

export default takeLatest('authenticate/loginRequest', login)

function* login({payload}) {
    const response = yield fetch(`${BASE_URL}/users/login`,{
        method: 'POST',
        headers:{
            'Content-Type': 'Application/json',
        },
        body: JSON.stringify(payload)
    })

    const data = yield response.text();

    if(response.ok){
        yield put(onLoginComplete(JSON.parse(data)));


        localStorage.setItem('Authorization', response.headers.get('Authorization'));
        localStorage.setItem('user', data);
        history.push('/')
    }else{
        yield put(onLoginError(data));
    }
}