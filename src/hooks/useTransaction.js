import { useEffect , useState} from "react";
import { useLocalStorage } from "./useLocalStorage";



export const useTransaction = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
     const [token, setToken]=useLocalStorage("token","");

    const fetchData = async () => {
        setLoading(true);
        setError(null);

        try {
            



        } catch (error) {
            setError(error.message);

        } finally {
            setLoading(false);
        }
    }

    const createTransaction = async (cartIds, paymentMethodId) => {
        setLoading(true);
        setError(null);
        try {
            
            const response = await fetch('https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/create-transaction', {
                method:"POST",
                body: JSON.stringify({
                    "cartIds": cartIds,
                    "paymentMethodId":paymentMethodId
                  }),
                headers: {
                    "Content-Type": "application/json",
                  "apiKey": import.meta.env.VITE_API_KEY,
                      "Authorization":`Bearer ${token}`
                },
              });
              const data = await response.json();
              if (!response.ok) {
                throw new Error(data.message || 'Network response was not ok');
              }
              
             
              alert(`Success Checkout`);


        } catch (error) {
            setError(error.message);

        } finally {
            setLoading(false);
        }
        


    }
   

   



    useEffect(() => {
        fetchData();

    },[])
    return { data, loading, error, fetchData, createTransaction};
}
