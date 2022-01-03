import React, {useEffect, useState} from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios';
import "./SingleProduct.scss"
import { useGlobalContext } from '../../context';
import Drawer from '../../components/Cart/Drawer';
import Header from "../../components/Header/Header"


const url = "http://localhost:5000/api/v1"

const SingleProduct = () => {
    const params = useParams()
    const {dispatch, singleProduct, isCartOpen} = useGlobalContext()

    const [colorAttr, setColorAttr] = useState("")
    const [sizeAttr, setSizeAttr] = useState("")

    const [colorValue, setColorValue] = useState({})
    const [sizeValue, setSizeValue] = useState("")
    
    const [total, setTotal] = useState()
    const [qnt, setQnt] = useState(1)
    // const [choosedAttr, setChoosedAttr] = useState([])
    // const [choosedProduct, setChoosedProduct] = useState({})

    //  GET SINGLE PRODUCT
    useEffect(() => {
        const fetchData = async () => {
            try {
                const {data} = await axios.get(url + `/products/${params.id}`)
                setColorValue("")
                setColorAttr("")
                setSizeAttr("")
                dispatch({type: "SINGLE_PRODUCT", data})
                setTotal(data.price)
            } catch (error) {
                console.log(error.response.data.msg);
            }
        }
        fetchData()
    }, [params.id, dispatch])

    const {attributes, img, name, price, company} = singleProduct

    // HANDLING ATTRIBUTES
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

    useEffect(() => {
        if (colorAttr) {
            setColorValue(colorAttr.value[0])
        }
        if (sizeAttr) {
            setSizeValue(sizeAttr.value[0]._id)
        }
    }, [colorAttr, sizeAttr])



    useEffect(() => {
        if (qnt < 1) {
            return setQnt(1)
        }
        const newPrice = Number(price) * Number(qnt)
        setTotal(newPrice)
    }, [qnt, price])


    // useEffect(() => {
    //     const pushColorAttr = {
    //         _id: colorAttr._id, name: colorAttr.name, value: colorValue._id
    //     }
    //     const pushSizeAttr = {
    //         _id: sizeAttr._id, name: sizeAttr.name, value: sizeValue
    //     }
    //     console.log(pushColorAttr);
    //     console.log(pushSizeAttr);

    //     if (pushColorAttr._id && pushColorAttr.value) {
    //          setChoosedAttr(prev => {
    //             return [...prev, pushColorAttr]
    //         })
    //     }
        
    //     if (pushSizeAttr._id && pushSizeAttr.value) {
    //         setChoosedAttr(prev => {
    //             return [...prev, pushSizeAttr]
    //         })
    //     }

        
    // }, [colorAttr._id, colorAttr.name, colorValue._id, sizeAttr._id, sizeAttr.name, sizeValue])

    // console.log(choosedAttr);

    const addToCartHandler = async (e) => {
        e.preventDefault()
        const {img, _id, price, company} = singleProduct

        const pushColorAttr = {
            _id: colorAttr._id, name: colorAttr.name, value: colorValue._id
        }
        const pushSizeAttr = {
            _id: sizeAttr._id, name: sizeAttr.name, value: sizeValue
        }

        let choosedAttr = []
        if (pushColorAttr._id) {
            choosedAttr.push(pushColorAttr.value)
        }
        if (pushSizeAttr._id) {
            choosedAttr.push(pushSizeAttr.value)
        }


        try {
            const token = localStorage.getItem("authToken")
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
            const product = {productId: _id, qnt, totalPrice: total, attributes: choosedAttr}
            const {data} = await axios.post(url + "/cart", product, config)
            dispatch({type: "GET_CART", data})

        } catch (error) {
            console.log(error.response);
        }
    }


    return (
        <>

            <Header />
            {isCartOpen && <Drawer />}
            <div className='p-8 flex items-center gap-8 '>
                <img className= "w-44 h-44 border" src={`.${img}`} alt="img" />
                <div className = "flex flex-col gap-2">
                    <h2>{name}</h2>
                    <p className='flex gap-6 items-center capitalize border-b-2'><span className='text-green-500 text-lg'>{company}</span> <span className='text-red-500 text-lg'>${price}</span></p>

                    <form className='mt-2' onSubmit={addToCartHandler}>

                        {sizeAttr && <div className='mb-2'>
                            <label htmlFor="size" className=''>Size</label>
                            <select name="size" id="" className='border ml-4' onChange={(e) => setSizeValue(e.target.value)} >
                                {sizeAttr.value && sizeAttr.value.map((size, index) => {
                                    return <option key = {index} value = {size._id} >{size.value}</option>
                                })}
                            </select>
                        </div>}

                        {colorAttr && <div className='flex items-center gap-2 mb-2 '>
                            <label className=' capitalize'>colors</label>
                            
                            {colorAttr.value && colorAttr.value.map((color, index) => {
                                return (
                                    <div key = {index} className=' grid place-content-center ml-2'>
                                        {colorValue._id === color._id ? <button onClick={() => setColorValue(color)} className="active-color p-2  rounded-full" type = "button" style={{background: `${color.value}`, outline: `1px solid ${color.value}`, outlineOffset: "5px"}} ></button> : <button onClick={() => setColorValue(color)} key = {index} className="active-color p-2  rounded-full" type = "button" style={{background: `${color.value}`, outline: "none", outlineOffset: "5px"}} ></button>}
                                    </div>
                                )
                            })}
                        </div>}

                        <div className='mb-2'>
                            <label htmlFor="qnt">Quantity</label>
                            <input className='border outline-none ml-4 w-16' type="number" name="qnt" id="qnt" value = {qnt} onChange={(e) => setQnt(e.target.value)} />
                        </div>

                        <p className='my-4'>Total: ${total}</p>
                        <button  className='mt-3 bg-green-500 p-2 text-white rounded' type = "submit">Add to Cart</button>

                        

                    </form>
                    
                </div>

            
            </div>

        </>

    )
}

export default SingleProduct
