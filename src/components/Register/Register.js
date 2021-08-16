import useInput from '../../hooks/useInput';
import usePasswordInput from '../../hooks/usePasswordInput';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getRegisterRequest } from '../../app/slices/authenticateSlice';
import InputWithError, { getContainerTestid } from '../InputWithError';
import { Link } from 'react-router-dom';

const Register = () => {
    const [pageIndex, setPageIndex] = useState(0)
    const [registerValues, { usernameInput, passwordInput, repeatPasswordInput, birthInput, emailInput, firstNameInput, lastNameInput }] = useCreateFields(); 

    const { isLoading, error } = useSelector(getRegisterRequest)
    const dispatch = useDispatch();

    const setPage = (e, page) => {
        e.preventDefault()
        setPageIndex(page)
    }
 
    const register = (e) => {
        e.preventDefault();

        const {repeatPassword, ...registerObject} = registerValues;
        dispatch(registerRequest(registerObject))
    }

    useEffect(() => {
        const {username, password, email} = error || {};

        if(username || password || email){
            setPageIndex(0);
        }
    },[error])
    
    return(
        <section>
            {pageIndex == 0 ?
                <form onSubmit={(e) => setPage(e, 1)}>
                    <InputWithError data-testid={getContainerTestid(usernameInput)} input={usernameInput} error={error?.username}/>
                    <InputWithError data-testid={getContainerTestid(emailInput)} input={emailInput} error={error?.email}/>
                    <InputWithError data-testid={getContainerTestid(passwordInput)} input={passwordInput} error={error?.password}/>
                    <InputWithError data-testid={getContainerTestid(repeatPasswordInput)} input={repeatPasswordInput} error={error?.password}/>
                    <button type='submit'>next</button>
                    <span>Already have an account?<Link to='/login'> Log in.</Link></span>
                    <span>{error}</span>
                </form> :
                <form onSubmit={register}>
                    <InputWithError data-testid={getContainerTestid(firstNameInput)} input={firstNameInput} error={error?.firstName}/>
                    <InputWithError data-testid={getContainerTestid(lastNameInput)} input={lastNameInput} error={error?.lastName}/>
                    <InputWithError data-testid={getContainerTestid(birthInput)} input={birthInput} error={error?.country}/>
                    <button onClick={(e) => setPage(e, 0)} >back</button>
                    <button>register</button>
                </form>
            }
        </section>
    )
}
export default Register

const useCreateFields = () => {
    const [username, usernameInput] = useInput({
        name: 'username',
        placeholder: 'username',
        autoComplete: 'username',
        testid: 'username',
        validationRules: {
            required: true, 
            minLength: 8, 
            maxLength: 20}
        },
    )

    const [password, passwordInput] = usePasswordInput({
        name: 'password',
        type: 'password',
        testid: 'password',
        autoComplete: 'new-password',
        placeholder: 'password',
        validationRules: {
            minLength: 10,
            maxLength: 22,
            required: true
        }
    })

    const [repeatPassword, repeatPasswordInput] = usePasswordInput({
        name: 'repeatPassword',
        type: 'password',
        testid: 'repeatPassword',
        autoComplete: 'new-password',
        placeholder: 'repeat',
        validationRules:{
            required: true
        },
        equalValue: password,
        equalName: 'Passwords'
    })

    const [firstName, firstNameInput] = useInput({
        placeholder: 'First name' , 
        name: 'firstName', 
        testid: 'firstName', 
        validationRules: {
            required: true
        } 
    })

    const [lastName, lastNameInput] = useInput({
        placeholder: 'Last name' , 
        name: 'lastName', 
        testid: 'lastName', 
        validationRules: {
            required: true
        } 
    })

    const [birth, birthInput] = useInput({
        type: 'date',
        name: 'birth', 
        testid: 'birth', 
        validationRules:{
            required: true,
            min: '1890-01-01',
            max: new Date().toISOString().split('T')[0]
        } 
    })

    const [email, emailInput] = useInput({
        type: 'email',
        placeholder: 'email',
        name: 'email',
        testid: 'email',
        autoComplete: 'email'
    })

    return [{username, password, repeatPassword, firstName, lastName, email, birth}, {usernameInput, passwordInput, repeatPasswordInput, firstNameInput, lastNameInput, emailInput, birthInput}]
}   
