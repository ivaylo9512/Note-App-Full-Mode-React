export default function login(){
    const [usernameValue, usernameInput] = useInput({ type: 'text', placeholder: 'text', name: 'username'})
    const [passwordValue, passwordInput] = useInput({ type: 'password', placeholder: 'password', name: 'password'})
    const [error, setError] = useState()
    
    const login = (e) => {
        e.preventDefault()
        fetchLogin({body:{username, password}})
    }
    
    return(
        <section>
            <form onSubmit={login}>
                {usernameInput}
                {passwordInput}
                <button>login</button>
                <span>Don't have an account?<Link to='/register'> Sign up.</Link></span>
                <span>{error}</span>
            </form>
        </section>
    )
}