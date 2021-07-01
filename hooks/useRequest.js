import { useState, useEffect } from "react"

export default function useRequest({type = 'get', isAuth, inititalUrl, initialValue, isFetchOnMount, shouldThrow = true, callback, initialHeaders}){
    const [data, setData] = useState(initialValue);
    const [error, setError] = useState();

    useEffect(() => {
        if(isFetchOnMount){
            fetchRequest();
        }
    }, [])
    const fetchRequest = async ({url, body, headers}) => {
        headers = {
            ...initialHeaders,
            ...headers,
            Authorization: isAuth && localStorage.getItem('Authorization')
        }

        const response = await fetch(url || inititalUrl, {
            type,
            body,
            headers
        })

        handleResponse(response);
    }

    const handleResponse = (response) => {
        let data = await response.text();
        if(data.ok){
            data = JSON.parse(data)
            setData(data);
            if(callback){
                callback(data, responseHeaders)
            }
        }else{
            if(shouldThrow){
                setError(() => {
                    throw {
                        message: data, 
                        status: response.status
                    }
                })
            }else{
                setError(data)
            }
        }
    }

    return [fetchRequest, data, error]
}