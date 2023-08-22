import { Collapse } from 'antd'
import { useState, useEffect } from 'react'
import ListItem from './ListProdsCompra'
import './purchasesContent.scss'
const { Panel } = Collapse


function ListCompras(props) {
    const [listPurch, setListPurch] = useState([])
    const [totalCompra, setTotalCompra] = useState(0)

    useEffect(() => {
        const prodsVentaData = async () => {
            const list = []
            try {
                const response = await fetch('http://localhost:3001/prodsDeVentaCliente')
                const jsonData = await response.json()
                jsonData.forEach(comprados => {
                    if (comprados.idCliente === JSON.parse(sessionStorage.getItem('user')).idCliente) {
                        if (comprados.idVenta === props.id) {
                            list.push(comprados)
                        }
                    }
                })
            } catch (error) {
                console.error('Error al obtener los datos: ', error)
            }
            setListPurch(list)
        }
        prodsVentaData()
    }, [])

    useEffect(() => {
        calcularTotalCompra()
    }, [listPurch])

    async function calcularTotalCompra() {
        let total = 0
        listPurch.forEach((producto) => {
            total = total + producto.cantidad * producto.precio
        })
        setTotalCompra(total)
    }

    const listItems = listPurch.map((product) => (
        <ListItem key={(product.detalle) + (product.marca) + (product.talle)} id={(product.detalle) + (product.marca)} product={product} />
    ))

    return (
        <Collapse>
            <Panel header={'Compra ' + props.id} key='compra'>
                {listItems}
                <p className='totales'><b>SubTotal</b> ${totalCompra}</p>
                <p className='totales'><b>IVA</b> ${(totalCompra * 0.21).toFixed(2)}</p>
                <p className='totales'><b>Total</b> ${(totalCompra * 1.21).toFixed(2)}</p>

            </Panel>
        </Collapse>
    )
}

export default ListCompras