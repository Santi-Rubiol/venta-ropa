import { Layout, Button, List } from 'antd'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import './carritoContent.scss'
import ListItem from './ListItem'

const { Content } = Layout

function CarritoContent() {
  const navigate = useNavigate()
  const [cambio, setCambio] = useState(false)
  const [listCart, setListCart] = useState([])
  const [totalCarrito, setTotalCarrito] = useState(0)

  useEffect(() => {
    const carritoData = async () => {
      const list = []
      try {
        const response = await fetch('http://localhost:3001/carritoDeCliente')
        const jsonData = await response.json()
        jsonData.forEach(carts => {
          if (carts.idCliente === JSON.parse(sessionStorage.getItem('user')).idCliente) {
            list.push(carts)
          }
        })
      } catch (error) {
        console.error('Error al obtener los datos: ', error)
      }
      setListCart(list)
    }
    carritoData()
  }, [cambio])

  useEffect(() => {
    calcularTotalCarrito()
  }, [listCart])

  async function calcularTotalCarrito() {
    let total = 0
    listCart.forEach((producto) => {
      total = total + producto.cantidad * producto.precio
    })
    setTotalCarrito(total)
  }

  async function actualizarCantidad(id, nuevaCantidad) {
    const newListCart = listCart.map((producto) => {
      if (producto.idStock === id) {
        return {
          ...producto,
          cantidad: nuevaCantidad,
        }
      }
      return producto
    })

    try {
      const carritoModif = {
        idStock: id,
        idCliente: JSON.parse(sessionStorage.getItem('user')).idCliente,
        cantidad: nuevaCantidad,
      }

      const response = await fetch('http://localhost:3001/carrito_prod', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(carritoModif),
      })

      const data = await response.json()
      console.log(JSON.stringify(carritoModif))
      console.log('Stock Modificado:', data)

      setListCart(newListCart)
    } catch (error) {
      console.error('Error al agregar producto al stock:', error)
    }
  }

  async function eliminarProducto(id) {
    const prodAStock = {
      idStock: id
    }
    fetch('http://localhost:3001/carrito_prod', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(prodAStock),
    })
      .then(response => response.json())
      .then(data => {
        console.log(id)
        console.log('Prod Eliminado de carrito: ', data)
      })
      .catch(error => {
        console.error('Error al eliminar producto de stock:', error)
      })
    setCambio(!cambio)
  }

  const continuarCompra = () => {
    if(totalCarrito === 0){
      alert('No hay productos en el carrito')
    }else{
      localStorage.setItem('productosAComprar', JSON.stringify(listCart))
    navigate('/payment')
    }
    
  }

  const listItems = listCart.map((product) => {
    return <ListItem key={(product.idStock) + (product.cantidad)} id={product.idStock} product={product} actualizarCantidad={actualizarCantidad} eliminarProducto={eliminarProducto} />
  })

  return (
    <Content className='content'>
      <h1 className='title'>CARRITO</h1>
      <List className='cartList' itemLayout='horizontal'>
        {listItems}
      </List>
      <div>
        <div className='total'>Total ${totalCarrito}</div>
        <Button className='continuarCompraButton' type='default' onClick={continuarCompra} >Continuar Compra</Button>
      </div>
    </Content>
  )
}

export default CarritoContent
