import React from 'react';
import { useState, useRef } from 'react';
import useEffectInitial from './useEffectInitial';

const useInput = ({type, placeholder, name, testid, validationRules, equalsValue, equalsName}) => {
    const [value, setValue] = useState('');
    const inputElement = useRef();

    const changeValue = ({ target: { value } }) => {
        setValue(value);
        validate(value);
    }

    const validate = (value) => {
        if(equalsValue){
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

    const input = <input {...validationRules} type={type} ref={inputElement} name={name} data-testid={testid} placeholder={placeholder} value={value} onChange={changeValue} />

    return [
        value, 
        input
    ]
}
export const getTestid = input => input.type == 'input'
    ? input.props['data-testid']
    : input.props.children[0].props['data-testid']
export default useInput