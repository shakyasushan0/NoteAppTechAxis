import { useState } from "react"

export default function useSignup(){
    const [error, setError] = useState(null)
    const [loading, setLoading]= useState(false)
    async function signupUser(fullname, email, password, image){
        setLoading(true)
        setError(null)
        const formData = new FormData()
        formData.append('fullname', fullname)
        formData.append('email', email)
        formData.append('password', password)
        formData.append('image', image)
        let resp = await fetch("http://localhost:3000/api/user/signup",{
            method: 'POST',
            body: formData
        });
        resp= await resp.json();
        if(resp.error) setError(resp.error)
        else {
            localStorage.setItem('user', JSON.stringify(resp))
        }
        setLoading(false)
    }
    return {signupUser, error, loading}
}