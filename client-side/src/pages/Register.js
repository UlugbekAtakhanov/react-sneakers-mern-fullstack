import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

const url = "http://localhost:5000/api/v1/register"

const Register = ({history}) => {
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")

    useEffect(() => {
        if (localStorage.getItem("authToken")) {
            return history.push("/products")
        }
    }, [history])

    const registerHandler = async (e) => {
        e.preventDefault()
        try {
            const {data} = await axios.post(url, {username, email, password})
            localStorage.setItem("authToken", data)
            history.push("/products")
        } catch (error) {
            setError(error.response.data.msg)
            setTimeout(() => {
                setError("")
            }, 3000);
        }
    }

    return (

        <div className = "py-10">
            <div className = "p-8 grid place-items-center">
                <form onSubmit = {registerHandler} className = "border border-red-500 rounded-md grid place-items-center gap-4 py-6 px-4 w-1/3">
                    <h3>Register</h3>
                    {error && <small className = "bg-red-500 text-white p-2 rounded text-center">{error}</small>}
                    <input value = {username} onChange = {(e) => setUsername(e.target.value)} className = "border rounded outline-none text-gray-500 p-2 w-full" type="text" name="username" id="username" placeholder = "username.." />
                    <input value = {email} onChange = {(e) => setEmail(e.target.value)} className = "border rounded outline-none text-gray-500 p-2 w-full" type="email" name="email" id="email" placeholder = "email.." />
                    <input value = {password} onChange = {(e) => setPassword(e.target.value)} className = "border rounded outline-none text-gray-500 p-2 w-full" type="password" name="password" id="password" placeholder = "password.." />
                    <button type = "submit" className = "border w-full bg-red-500 py-1 text-white rounded">sign up</button>
                    <Link to = "/login" className = "text-sm underline text-gray-500" >Log in</Link>
                </form>
            </div>
        </div>

    )
}

export default Register
