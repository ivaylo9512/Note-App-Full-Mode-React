import { takeLatest, select, put } from 'redux-saga/effects';
import { BASE_URL } from '../../constants';
import { getNotesData, onNotesComplete, onNotesError} from '../slices/notesSlice';
import splitArray from '../../utils/splitArray';

export default takeLatest('notes/notesRequest', getNotes);

function* getNotes({payload: query}){
    const { name, lastName, lastId, takeAmount } =  getData(query, yield select(getNotesData));
    const lastPath = lastName ? `${lastName}/${lastId}` : '';

    const response = yield fetch(`${BASE_URL}/api/notes/auth/searchForNotes/${name}/${takeAmount}/${lastPath}`,{
        headers:{
            Authorization: `Bearer ${localStorage.getItem('Authorization')}`
        }
    });

    if(response.ok){
        const data = yield response.json(); 
        
        data.length = data.notes.length;
        data.lastNote = data.notes[data.length];
        data.notes = splitArray(data.notes, take);

        yield put(onNotesComplete({
            data,
            query
        }))
    }else{
        yield put (onNotesError(response.text()));
    }

}

const getData = (query, data) => {
    let lastId = 0;
    let lastName;
    let lastNote = data.lastNote;
    const takeAmount = query.take * query.pages;
    
    if(lastNote){
        lastId = lastNote.id;
        lastName = lastNote.name;
    }

    return {...query, takeAmount, lastName, lastId}
}

