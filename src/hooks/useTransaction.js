import { useEffect, useState } from "react";
import { useLocalStorage } from "./useLocalStorage";
import { useNavigate } from "react-router-dom";

export const useTransaction = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [token] = useLocalStorage("token", "");
  const navigate = useNavigate();

  // Function to fetch transactions
  const fetchData = async () => {
    if (!token) {
      setError("Unauthorized: No token available");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        "https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/my-transactions",
        {
          headers: {
            "Content-Type": "application/json",
            apiKey: import.meta.env.VITE_API_KEY,
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.message || "Failed to fetch transactions");
      }

      setData(result.data || []); // Pastikan `data` selalu array
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Function to create a new transaction
  const createTransaction = async (cartIds, paymentMethodId, total) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        "https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/create-transaction",
        {
          method: "POST",
          body: JSON.stringify({
             cartIds,
              paymentMethodId, total }),
          headers: {
            "Content-Type": "application/json",
            apiKey: import.meta.env.VITE_API_KEY,
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Transaction failed");
      }

      alert("Success Checkout");
      navigate("/transactions");
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) fetchData();
  }, [token]); // Gunakan `token` sebagai dependensi

  return { data, loading, error, fetchData, createTransaction };
};



// import { useEffect , useState} from "react";
// import { useLocalStorage } from "./useLocalStorage";
// import { useNavigate } from "react-router-dom";



// export const useTransaction = () => {
//     const [data, setData] = useState([]);
//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState(null);
//      const [token, setToken]=useLocalStorage("token","");
//      const navigate = useNavigate();

//     const fetchData = async () => {
//         setLoading(true);
//         setError(null);

//         try {
            



//         } catch (error) {
//             setError(error.message);

//         } finally {
//             setLoading(false);
//         }
//     }

//     const createTransaction = async (cartIds, paymentMethodId) => {
//         setLoading(true);
//         setError(null);
//         try {
            
//             const response = await fetch('https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/create-transaction', {
//                 method:"POST",
//                 body: JSON.stringify({
//                     "cartIds": cartIds,
//                     "paymentMethodId":paymentMethodId
//                   }),
//                 headers: {
//                     "Content-Type": "application/json",
//                   "apiKey": import.meta.env.VITE_API_KEY,
//                       "Authorization":`Bearer ${token}`
//                 },
//               });
//               const data = await response.json();
//               if (!response.ok) {
//                 throw new Error(data.message || 'Network response was not ok');
//               }
              
             
//               alert(`Success Checkout`);
//               navigate("/transactions");
              


//         } catch (error) {
//             setError(error.message);

//         } finally {
//             setLoading(false);
//         }
        


//     }
   

   



//     useEffect(() => {
//         fetchData();

//     },[])
//     return { data, loading, error, fetchData, createTransaction};
// }
