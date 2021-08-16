import { getTestid } from "../hooks/useInput"

const InputWithError = ({error, classname = '', input}) => {

    return(
        <div className={(error ? 'error ' : '') + classname}>
            {input}
            {error && 
                <div data-testid={`${getTestid(input)}Error`}>
                    {error}
                </div>
            }
        </div>
    )
}
export const getContainerTestid = input => `${getTestid(input)}Container`
export default InputWithError