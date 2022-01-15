import React, {useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom'
import axios from 'axios'

const url = "http://localhost:5000/api/v1/login"


const Login = () => {
    const navigate = useNavigate()

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")

    // useEffect(() => {
    //     if (localStorage.getItem("authTokenReactSneakers")) {
    //         return navigate("/products")
    //     }
    // }, [navigate])

    const loginHandler = async (e) => {
        e.preventDefault()
        try {
            const data = await axios.post(url, {email, password})
            localStorage.setItem("authTokenReactSneakers", data.data.token)
            // console.log(data.data.token);
            navigate("/products")
        } catch (error) {
            setError(error.response.data.msg)
            setTimeout(() => {
                setError("")
                setEmail("")
                setPassword("")
            }, 3000);
        }
    }

    return (
        <div className = "py-10">
            <div className = "p-8 grid place-items-center">
                <form onSubmit = {loginHandler} className = "border border-red-500 rounded-md grid place-items-center gap-4 p-8 w-1/3">
                    <h3>Login</h3>
                    {error && <small className = "bg-red-500 text-white p-2 rounded text-center">{error}</small>}
                    <input value = {email} onChange = {(e) => setEmail(e.target.value)} className = "border rounded outline-none text-gray-500 p-2 w-full" type="email" name="email" id="email" placeholder = "email.." />
                    <input value = {password} onChange = {(e) => setPassword(e.target.value)} className = "border rounded outline-none text-gray-500 p-2 w-full" type="password" name="password" id="password" placeholder = "password.." />
                    <button type = "submit" className = "border w-full bg-red-500 py-1 text-white rounded">log in</button>
                    <Link to = "/register" className = "text-sm underline text-gray-500" >Sign up</Link>
                </form>
            </div>
        </div>
    )
}

export default Login
