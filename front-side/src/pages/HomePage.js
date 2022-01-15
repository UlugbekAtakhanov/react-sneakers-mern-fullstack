// import React, { useEffect } from 'react'
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios'
// import {useGlobalContext} from "../context"
// import { Link } from 'react-router-dom'

// const url = "http://localhost:5000/api/v1"


// const HomePage = () => {
    
//     const {dispatch} = useGlobalContext()
//     const navigate = useNavigate()

//     useEffect(() => {
//         if (!localStorage.getItem("authToken")) {
//             return navigate("/login")
//         }
        
//         const fetchUser = async () => {
//             const token = localStorage.getItem("authToken")
//             const config = {
//                 headers: {
//                     Authorization: `Bearer ${token}`
//                 }
//             }
//             try {
//                 const {data} = await axios.get(url, config)
//                 dispatch({type: "GET_USER", data})
//             } catch (error) {
//                 console.log(error.response.data);
//             }
//         }
//         fetchUser()
//     }, [navigate, dispatch])

//     return (
//         <div className = "p-4">
//             <div className = "flex justify-between items-center">
//                 <h2 className = "">Home page</h2>
//                 <div>
//                     <Link to = "/products">Products</Link>
//                 </div>
//             </div>
//         </div>
//     )
// }

// export default HomePage
