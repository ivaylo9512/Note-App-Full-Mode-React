import { useEffect } from 'rect';
import { useRef, useEffect } from 'react';

export default function useEffectInitial(callback, dependencies){
    const isInitial = useRef(true);

    useEffect(()=> {
        if(!isMounted.current){
            isInitial.current = true;
            return;
        }
        callback();
    }, dependencies)
} 