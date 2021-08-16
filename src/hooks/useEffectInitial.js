import { useRef, useEffect } from 'react';

export default function useEffectInitial(callback, dependencies){
    const isInitial = useRef(true);
    
    useEffect(()=> {
        if(!isInitial.current){
            isInitial.current = true;
            return;
        }
        callback();
    }, dependencies)
} 