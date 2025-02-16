import { useEffect, useState } from "react"

export const useLocalStorage = (key, initialValue = "") => 
    {
        const [data, setdata] = useState(initialValue);

        useEffect(()=>{
            const localStorageItem = localStorage.getItem(key) 
            if (localStorageItem){
                setdata(localStorageItem)    
            } else {
                localStorage.setItem(key, initialValue)
            }
            
        },[])
        const setLocalStorage = (value) =>{
            setdata(value)
            localStorage.setItem(key, value)
        }
        return[data,setLocalStorage]
        

    }
