import useInput from '../hooks/useInput';
import usePasswordInput from '../hooks/usePasswordInput';
import { useState } from 'react';

const Register = () => {
    const [pageIndex, setPageIndex] = useState(0)
    const [registerValues, { usernameInput, passwordInput, repeatPasswordInput, birthInput, emailInput, firstNameInput, lastNameInput }] = useCreateFields(); 

    const register = (e) => {
        e.preventDefault()

        const {repeatPassword, ...registerUser} = registerValues;
        fetchRegister({body: registerUser})
    }

    const setPage = (e, page) => {
        e.preventDefault()
        setPageIndex(page)
    }
    
    return(
        <section>
            {pageIndex == 0 ?
                <form onSubmit={(e) => setPage(e, 1)}>
                    {usernameInput}
                    {passwordInput}
                    {repeatPasswordInput}
                    {emailInput}
                    <button type='submit'>next</button>
                    <span>Already have an account?<Link to='/login'> Log in.</Link></span>
                    <span>{error}</span>
                </form> :
                <form onSubmit={register}>
                    {firstNameInput}
                    {lastNameInput}
                    {birthInput}
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
        validationRules: {
            required: true, 
            minLength: 8, 
            maxLength: 20}
        },
    )

    const [password, passwordInput] = usePasswordInput({
        name: 'password',
        type: 'password',
        autoComplete: 'new-password',
        placeholder: 'password',
        validationRules: {
            minLength: 10,
            maxLength: 22,
            required: true
        }
    })

    const [repeatPassword, repeatPasswordInput] = usePasswordInput({
        name: 'repeat-password',
        type: 'password',
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
        validationRules: {
            required: true
        } 
    })

    const [lastName, lastNameInput] = useInput({
        placeholder: 'Last name' , 
        name: 'lastName', 
        validationRules: {
            required: true
        } 
    })

    const [birth, birthInput] = useInput({
        type: 'date',
        name: 'birth', 
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
        autoComplete: 'email'
    })

    return [{username, password, repeatPassword, firstName, lastName, email, birth}, {usernameInput, passwordInput, repeatPasswordInput, firstNameInput, lastNameInput, emailInput, birthInput}]
}   
