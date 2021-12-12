import axios from 'axios';
import React, {useEffect, useState} from 'react'
import { useParams } from 'react-router-dom'
import { useGlobalContext } from '../../context';

import Header from "../../components/Header/Header"

const url = "http://localhost:5000/api/v1/products"

const SingleProduct = () => {

    const params = useParams()
    const {dispatch, singleProduct} = useGlobalContext()
    const [colorAttr, setColorAttr] = useState("")
    const [sizeAttr, setSizeAttr] = useState("")
    const [qnt, setQnt] = useState(1)

    console.log(qnt);

    console.log(singleProduct);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const {data} = await axios.get(url + `/${params.id}`)
                setColorAttr("")
                setSizeAttr("")
                dispatch({type: "SINGLE_PRODUCT", data})
            } catch (error) {
                console.log(error.response.data.msg);
            }
        }
        fetchData()
    }, [params.id, dispatch])

    const {attributes, img, name, price, company} = singleProduct

    useEffect(() => {
        if (attributes) {
            const colors = attributes.filter(attribute => {
                if (attribute.name === "color") {
                    setColorAttr(attribute)

                }
                if (attribute.name === "size") {
                    setSizeAttr(attribute)
                }
                return null
            })
        }
    }, [attributes])

    return (
        <>

            <Header />
            <div className='p-8 flex items-center gap-8 '>
                <img className= "w-44 h-44 border" src={`.${img}`} alt="img" />
                <div className = "flex flex-col gap-2">
                    <h2>{name}</h2>
                    <p className='flex gap-6 items-center capitalize border-b-2'><span className='text-green-500 text-lg'>{company}</span> <span className='text-red-500 text-lg'>${price}</span></p>

                    <form className='mt-2'>

                        {sizeAttr && <div>
                            <label htmlFor="size" className=''>Size</label>
                            <select name="size" id="" className='border ml-4'>
                                {sizeAttr.value && sizeAttr.value.map((size, index) => {
                                    return <option key = {index} value={size.value}>{size.value}</option>
                                })}
                            </select>
                        </div>}

                        {colorAttr && <div className='flex items-center gap-2 '>
                            <p className=' capitalize'>colors</p>
                            {colorAttr.value && colorAttr.value.map((color, index) => {
                                return <button key = {index} className="p-2 mr-2 rounded-full" type = "button" style={{background: `${color.value}`}}></button>
                            })}
                        </div>}

                        <div>
                            <label htmlFor="qnt">Quantity</label>
                            <input className='border outline-none ml-2 w-16' type="number" name="qnt" id="qnt" value = {qnt} onChange={(e) => setQnt(e.target.value)} />
                        </div>

                        <button className='mt-3 bg-green-500 p-2 text-white rounded' type = "submit">Add to Cart</button>

                        

                    </form>
                    
                </div>

            
            </div>

        </>

    )
}

export default SingleProduct
