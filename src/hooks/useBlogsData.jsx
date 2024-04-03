import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

export default function useBlogsData(url) {
    const [blogs , setBlogs] = useState(null)
    const [isloading,setIsLoading] = useState(true)
    const [error,setError] = useState(null)

    useEffect(()=>{
        
        const fetchData =  ()=>{
            try {
                fetch (url).then(response=>response.json())
                .then(data=>{
                    setBlogs(data)
                    setIsLoading(false)
                    
                })
                .catch((error)=>{
                    console.log(error);   
                    setError("Error in Fetch Data.Please check your connection!")


                    
                })
                                
            } catch (error) {
                console.log(error);   
                setError("Error in Fetch Data.Please check your connection!")
                
            }
        }
        fetchData()
    },[])

  return {blogs,isloading,error};
}
