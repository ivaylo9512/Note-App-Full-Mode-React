import useRequest from "../hooks/useRequest"
import usePasswordInput from "../../hooks/usePasswordInput";

const Login = () =>{
    const [{username, password}, {usernameInput, passwordInput}] = useCreateInputs();

    const [fetchRequest, data, error] = useRequest({ type: 'post', inititalUrl})
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

const useCreateInputs = () => {
    const [username, username] = useInput({
        placeholder: 'username', 
        name: 'username',
        validationRules: {
            required: true
        }
    });

    const [password, passwordInput] = usePasswordInput({
        placeholder: 'password', 
        name: 'password', 
        type: 'password',
        validationRules: {
            required: true
        },
        autoComplete: 'current-password',
    });

    return [{username, password}, {usernameInput, passwordInput}]
}

export default Login