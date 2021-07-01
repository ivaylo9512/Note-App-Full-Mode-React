export default function register(){
    const [username, usernameInput] = useInput({type: 'text', placeholder: 'username', validationRules: {
        minLength: 6,
        maxLength: 15,
        required: true
    }}) 
    const [password, passwordInput] = useInput({type: 'password', placeholder: 'password', validationRules:{
        minLength: 7,
        maxLength: 25,
        required: true
    }}) 
    const [repeat, repeatInput] = useInput({type: 'password', placeholder: 'repeat', validationRules:{
        required: true,
    },equalsValue: password, equalsName: 'Passwords'}) 
    const [firstName, firstNameInput] = useInput({type: 'text', placeholder: 'first name', validationRules: {
        required: true
    }}) 
    
    return(
        <form onSubmit={(e) => setPage(e, 1)}>
            {usernameInput}
            {passwordInput}
            {repeatInput}
            <button type='submit'>next</button>
            <span>Already have an account?<Link to='/login'> Log in.</Link></span>
            <span>{error}</span>
        </form>
    )
}