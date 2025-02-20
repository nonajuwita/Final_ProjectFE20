import { useEffect , useState} from "react";
import { useLocalStorage } from "./useLocalStorage";



export const useCart = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
     const [token, setToken]=useLocalStorage("token","");

    const fetchData = async () => {
        setLoading(true);
        setError(null);

        try {
            const response = await fetch('https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/carts', {
                headers: {
                  "apiKey": import.meta.env.VITE_API_KEY,
                      "Authorization":`Bearer ${token}`
                },
              });
              const data = await response.json();
              if (!response.ok) {
                throw new Error(data.message || 'Network response was not ok');
              }
              
              setData(data.data || []);



        } catch (error) {
            setError(error.message);

        } finally {
            setLoading(false);
        }
    }

    const addToCart = async (activityId, activityTitle) => {
        setLoading(true);
        setError(null);
        try {
            
            const response = await fetch('https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/add-cart', {
                method:"POST",
                body: JSON.stringify({
                    "activityId": activityId
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
              
              await fetchData();
              alert(`${activityTitle} added to cart!`);


        } catch (error) {
            setError(error.message);

        } finally {
            setLoading(false);
        }
        


    }
    const updateCart = async (cartId, quantity) => {
        setLoading(true);
        setError(null);
        try {
            
            const response = await fetch(`https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/update-cart/${cartId}`, {
                method:"POST",
                body: JSON.stringify({
                    "quantity": quantity
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
              
              await fetchData();
              

        } catch (error) {
            setError(error.message);

        } finally {
            setLoading(false);
        }
        


    }

    const deleteCart = async (cartId) => {
        setLoading(true);
        setError(null);
        try {
            
            const response = await fetch(`https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/delete-cart/${cartId}`, {
                method:"DELETE",
                
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
              
              await fetchData();
              

        } catch (error) {
            setError(error.message);

        } finally {
            setLoading(false);
        }
        


    }



    useEffect(() => {
        fetchData();

    },[])
    return { data, loading, error, fetchData, addToCart, updateCart, deleteCart};
}
