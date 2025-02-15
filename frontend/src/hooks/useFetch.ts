import axios from "axios"
import { useEffect, useState } from "react"


const useFetch = <T>(url: string) => {
    const [loading, setLoading] = useState<boolean>(true)
    const [data, setData] = useState<T | null>(null)
    const [message, setMessage] = useState<string | null>("")


    useEffect(() => {
        const fetchData = async() => {
            try{
                const response = await axios.get<T>(url)
                const data = response.data
                setData(data)
                setLoading(false)
            } catch(error: any) {
                setMessage(error.response.data.message)
                setLoading(false)
            } 
        }

        fetchData()
    }, [url])

  return { data, loading, message }
}

export default useFetch