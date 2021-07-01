export default function register(){
    const [pageIndex, setPageIndex] = useState(0)
    const [registeredUser, fetchRegister, error] = useRequest({
        initialUrl: `${localStorage.getItem('BaseUrl')}/api/users/${localStorage.getItem('LongPolling')}/register`, 
        shouldThrow: false, 
        callback: 
        setAuthUser, 
        type: 'post'
    })
    
    const [username, usernameInput] = useInput({
        type: 'text', 
        placeholder: 'username', 
        validationRules: {
            minLength: 6,
            maxLength: 15,
            required: true
        }
    }) 
    const [password, passwordInput] = useInput({
        type: 'password', 
        placeholder: 'password', 
        validationRules:{
            minLength: 7,
            maxLength: 25,
            required: true
        }
    }) 
    const [repeat, repeatInput] = useInput({
        type: 'password', 
        placeholder: 'repeat', 
        validationRules: {
            required: true,
        },
        equalsValue: password, 
        equalsName: 'Passwords'
    }) 
    const [firstName, firstNameInput] = useInput({
        type: 'text', 
        placeholder: 'first name', 
        validationRules: {
            required: true
        }
    }) 
    const [lastName, lastNameInput] = useInput({
        type: 'text', 
        placeholder: 'last name', 
        validationRules: {
            required: true}
        }) 
    const [country, countryInput] = useInput({
        type: 'text', 
        placeholder: 'country', 
        validationRules: {
            required: true
        }
    }) 
    const [age, ageInput] = useInput({
        type: 'number', 
        placeholder: 'age', 
        validationRules: {
            required: true
        }
    }) 

    const register = (e) => {
        e.preventDefault()
        fetchRegister({body:{username, password, repeat, firstName, lastName, country, age}})
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
                    {repeatInput}
                    <button type='submit'>next</button>
                    <span>Already have an account?<Link to='/login'> Log in.</Link></span>
                    <span>{error}</span>
                </form> :
                <form onSubmit={register}>
                    {firstNameInput}
                    {lastNameInput}
                    {countryInput}
                    {ageInput}
                    <button onClick={(e) => setPage(e, 0)} >back</button>
                    <button>register</button>
                </form>
            }
        </section>
    )
}