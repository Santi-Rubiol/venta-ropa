import { Layout, Button, Form, Radio, InputNumber, Carousel } from 'antd'
import Remera from '../../../assets/Remera Blanca.png'
import './productContent.scss'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const { Content } = Layout

export function ProductContent() {
    const navigate = useNavigate()
    const [storedUser, setStoredUser] = useState([])
    const [product, setProduct] = useState([])
    const [talleActual, setTalleActual] = useState('S')
    const onWaistTypeChange = (waistValue) => {
        setTalleActual(waistValue)
    }
    const [cantActual, setCantActual] = useState(0)
    const onCantActChange = (cantAct) => {
        setCantActual(cantAct)
    }
    const [cantMax, setCantMax] = useState(0)
    const [cantEnCarrito, setCantEnCarrito] = useState(0)

    useEffect(() => {
        setProduct(JSON.parse(localStorage.getItem('prendaAct')))
        setStoredUser(JSON.parse(sessionStorage.getItem('user')))
    }, [])

    useEffect(() => {
        const fetchData = async () => {
            try {
                let band = false
                const response = await fetch('http://localhost:3001/stockConPrenda')
                const jsonData = await response.json()
                jsonData.forEach(productAct => {
                    if (productAct.idPrenda === product.idPrenda) {
                        if (talleActual === productAct.talle) {
                            setCantMax(productAct.cantidad)
                            setCantActual(1)
                            band = true
                            setProduct(productAct)
                        }
                    }
                })
                if (!band) {
                    setCantMax(0)
                    setCantActual(0)
                }
                const response2 = await fetch('http://localhost:3001/carritoDeCliente')
                const jsonData2 = await response2.json()
                jsonData2.forEach(elem => {
                    if (elem.dni === storedUser.idUsuario) {
                        if (elem.idStock === product.idStock) {
                            if (talleActual === elem.talle) {
                                setCantEnCarrito(elem.cantidad)
                            }
                        }
                    }
                })
            } catch (error) {
                console.error('Error al obtener los datos: ', error)
            }
        }
        fetchData()
    }, [talleActual])

    const btnAgregarAlCarrito = async () => {
        if (cantActual > 0) {
            if (cantEnCarrito === 0) {
                const productoAlCarrito = {
                    idCliente: storedUser.idCliente,
                    idStock: product.idStock,
                    cantidad: cantActual
                }

                fetch('http://localhost:3001/carrito_prod', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(productoAlCarrito),
                })
                    .then(response => response.json())
                    .then(data => {
                        console.log(JSON.stringify(productoAlCarrito))
                        console.log('Producto agregado al carrito:', data)
                    })
                    .catch(error => {
                        console.error('Error al agregar producto al carrito:', error)
                    })
                navigate('/cart')
            } else {
                const cantTotal = cantActual + cantEnCarrito
                if (cantTotal <= cantMax) {
                    const productoAlCarrito = {
                        idCliente: storedUser.idCliente,
                        idStock: product.idStock,
                        cantidad: cantTotal
                    }

                    fetch('http://localhost:3001/carrito_prod', {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(productoAlCarrito),
                    })
                        .then(response => response.json())
                        .then(data => {
                            console.log(JSON.stringify(productoAlCarrito))
                            console.log('Producto agregado al carrito:', data);
                        })
                        .catch(error => {
                            console.error('Error al agregar producto al carrito:', error);
                        })
                    navigate('/cart')
                } else {
                    alert('No hay suficiente en stock, ya tienes algunos en el carrito.')
                }
            }
        } else {
            alert('No se seleccionó una cantidad válida')
        }
    }

    const btnComprarAhora = () => {
        navigate('/payment')
    }

    const contentStyle = {
        margin: 0,
        height: '400px',
        width: '400px',
        color: '#fff',
        lineHeight: '160px',
        textAlign: 'center',
        background: '#1677ff',
    }

    const onChange = (currentSlide) => {
        console.log(currentSlide);
    }

    return (
        <Content>
            <div className='prod-content'>
                <div className='caract-izq'>
                    <Carousel className='imgCarousel' afterChange={onChange}>
                        <div>
                            <h3 style={contentStyle}>
                                <img src={Remera} className='img' alt={product.detalle} />
                            </h3>
                        </div>
                        <div>
                            <h3 style={contentStyle}>
                                <img src={Remera} className='img' alt={product.detalle} /></h3>
                        </div>
                    </Carousel>
                </div>

                <div className='caract-der'>
                    <div className='prod'>
                        <h1 className='product-detalle'>{product.detalle} {product.marca} </h1>
                        <h2 className='product-precio'>$ {product.precio}</h2>
                    </div>
                    <br />


                    <Form>
                        <Form.Item className='product-talle'>
                            <Radio.Group
                                className='selector'
                                defaultValue='S'
                                buttonStyle='solid'
                                onChange={(e) => {
                                    onWaistTypeChange(e.target.value);
                                }}
                            >
                                <Radio.Button value='S'>S</Radio.Button>
                                <Radio.Button value='M'>M</Radio.Button>
                                <Radio.Button value='L'>L</Radio.Button>
                                <Radio.Button value='XL'>XL</Radio.Button>
                                <Radio.Button value='XXL'>XXL</Radio.Button>
                            </Radio.Group>


                            <label>Cantidad: </label>

                            <InputNumber
                                className='selector'
                                name='input-num'
                                type='number'
                                defaultValue={1}
                                onChange={(valor) => {
                                    try {
                                        onCantActChange(parseInt(valor));
                                    } catch (nullPointerException) { }
                                }}
                                value={cantActual}
                                min={1}
                                max={cantMax}
                            />
                        </Form.Item>
                    </Form>

                    <div className='product-buttons'>
                        <Button type='primary' onClick={btnComprarAhora}>
                            Comprar Ahora
                        </Button>
                        <Button onClick={btnAgregarAlCarrito}>Agregar al Carrito</Button>
                    </div>
                </div>
            </div>
        </Content>
    )
}

export default ProductContent