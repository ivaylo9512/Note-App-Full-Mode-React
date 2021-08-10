import loginWatcher from './login';
import registerWatcher from './register';

import { all } from 'redux-saga/effects';

export default function* IndexSagas(){
    yield all([registerWatcher, loginWatcher])
}

export function authWrapper(request){
    return function*(action){
        try{
            yield request(action);
        }catch(err){
            if(err.message == 'Jwt token has expired.'){
                return yield put(onLogout('Session has expired.')); 
            }
            if(err.message == 'Jwt is incorrect.' || err.message == 'Jwt is missing.'){
                return yield put(onLogout());
            }
        }
    }
}