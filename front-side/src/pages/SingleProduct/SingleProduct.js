import React, {useEffect, useState} from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import {TwitterPicker} from "react-color"


import Header from "../../components/Header/Header"


import axios from "axios"

const SingleProduct = () => {
    const params = useParams()
    const navigate = useNavigate()
    
    const [singleProduct, setSingleProduct] = useState("")
    const {image, name, price, company, attributes} =  singleProduct && singleProduct.product
    const {attrValueArr} =  singleProduct && singleProduct

    const [total, setTotal] = useState()
    const [qnt, setQnt] = useState(1)
    const [color, setColor] = useState("")

    //  GET SINGLE PRODUCT
    const url = "http://localhost:5000/api/v1"
    useEffect(() => {
        const token = localStorage.getItem("authTokenReactSneakers")
        if (!token) {
            navigate("/login")
        }
        const fetchData = async () => {
            try {
                const {data} = await axios.get(url + `/income/${params.id}`)
                setSingleProduct(data)
            } catch (error) {
                console.log(error.response.data.msg);
            }
        }
        fetchData()
    }, [params.id])

    useEffect(() => {
        if (qnt < 1) {
            return setQnt(1)
        }
        const newPrice = Number(price) * Number(qnt)
        setTotal(newPrice)
    }, [qnt, price])



    return (
        <>
        <Header />
        {
            singleProduct && (
                <div className='p-8 flex items-start gap-8 '>
                    <img className= "w-44 h-44 border" src={image} alt="img" />
                    <div className = "flex flex-col gap-2">
                        <h3>{name}</h3>
                        <p className='flex gap-6 items-center capitalize border-b-2'><span className='text-green-500'>{company}</span> <span className='text-red-500'>${price}</span></p>
    
                        <form className='mt-2'>
    
                             <div className='mb-2'>
                                 <label htmlFor="qnt">Quantity</label>
                                 <input value={qnt} onChange={(e) => setQnt(e.target.value)} className='border outline-none ml-4 w-16' type="number" name="qnt" id="qnt" />
                             </div>

                             {attributes.length > 0 && attributes.map(attrName => {
                                 return (
                                     <div key={attrName._id}>
                                         <span>{attrName.name}</span>
                                         <select className='border mb-4'>
                                            {attrValueArr.length > 0 && attrValueArr.map(attrvalue => (
                                                    <>
                                                        {attrvalue.attrValue.map(item => {
                                                            const {_id, value} = item
                                                            return item.attrId._id === attrName._id && <option>{value}</option>
                                                        })}
                                                    </>
                                                ))}
                                            </select>
                                     </div>
                                 )
                             })}

                             {/* {attrValueArr.length > 0 && attrValueArr.map(item => {
                                 console.log(item.attrValue);
                                 return (
                                     <select>
                                        {item.attrValue.map(attrvalue => {
                                            // console.log(attrvalue.attrId.name);
                                            // console.log(attrvalue.value);
                                            <p>{attrvalue.attrId.name}</p>
                                            return (
                                                <>
                                                    <option value={attrvalue.value}>{attrvalue.value}</option>
                                                </>
                                            )
                                        })}
                                     </select>
                                 )

                                //  return (
                                //      <p key = {item._id}>{item.name}</p>
                                //  )
                             })} */}

                            {/* <div className='mb-4 font-bold text-slate-500'>
                                <p>Choose any color</p>
                                <div className='mt-4'>
                                    <TwitterPicker color = {color} onChange = {updatedColor => setColor(updatedColor.hex)} />
                                </div>
                            </div> */}
    
                             <p className=' mt-20'>Total: ${total}</p>
                             <button  className='mt-3 bg-green-500 p-2 text-white rounded' type = "submit">Add to Cart</button>
    
                        </form>
                        
                    </div>

                </div> 

            )
        }

        </>
    )
}

export default SingleProduct

