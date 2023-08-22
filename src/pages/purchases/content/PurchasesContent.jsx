import { Layout } from 'antd'
import { useState, useEffect } from 'react'
import './purchasesContent.scss'
import ListCompras from './ListCompras'
const { Content } = Layout

const Purchases = () => {
  const [listVentas, setListVentas] = useState([])
  
  useEffect(() => {
    const ventaData = async () => {
      const list = []
      try {
        const response = await fetch('http://localhost:3001/venta')
        const jsonData = await response.json()
        jsonData.forEach(venta => {
          if (venta.idCliente === JSON.parse(sessionStorage.getItem('user')).idCliente) {
            list.push(venta.idVenta)
          }
        })
      } catch (error) {
        console.error('Error al obtener los datos: ', error)
      }
      setListVentas([...new Set(list)])
    }
    ventaData()
  }, [])

  const listVenta  = listVentas.map((idV) => {
    return <ListCompras key={idV} id={idV} />
  })

  return (
    <Content className='content'>
      <div>
        <h1 className='title'>MIS COMPRAS</h1>
      </div>
      <div>
        {listVenta}
      </div>

    </Content>
  )
}

export default Purchases

