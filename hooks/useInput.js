import { useState, useRef } from 'react';
import useEffectInitial from './useEffectInitial';

function useInput({type, placeholder, name, validationRules, equalsValue, equalsName}) {
    const [value, setValue] = useState('');
    const inputElement = useRef();

    const changeValue = ({ target: { value } }) => {
        setValue(value);
        validate(value);
    }

    const validate = (value) => {
        if(equalsElement){
            inputElement.current.setCustomValidity(
                equalsValue != value 
                    ? equalsName + 'must be equal.'
                    : ''
            )
        }
    }

    useEffectInitial(() => {
        validate(value)
    },[equalsValue])

    const input = <input validationRules={...validationRules} type={type} ref={inputElement} name={name} placeholder={placeholder} value={value} onChange={changeValue} />

    return [
        value, 
        input
    ]
}