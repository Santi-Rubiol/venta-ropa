import React, { useState, useEffect } from 'react'
import { Radio, Card, Button, Modal } from 'antd'
import './paymentContent.scss'
import ListCompra from './ListCompra'
import { useNavigate } from 'react-router-dom'

function eliminarProductoDeCarrito(id) {
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
}

function postEnVenta(nroVenta) {
  const nuevaVenta = {
    idVenta: nroVenta,
    idCliente: JSON.parse(sessionStorage.getItem('user')).idCliente
  }

  fetch('http://localhost:3001/venta', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(nuevaVenta),
  })
    .then(response => response.json())
    .then(data => {
      console.log(JSON.stringify(nuevaVenta))
      console.log('Post en Stock:', data);
    })
    .catch(error => {
      console.error('Error al agregar producto al stock:', error);
    })
}

function postVentaStock(nroVenta) {
  JSON.parse(localStorage.getItem('productosAComprar')).forEach(e => {
    const eDeVenta = {
      idVenta: nroVenta,
      idStock: e.idStock,
      cantidad: e.cantidad
    }

    fetch('http://localhost:3001/venta_stock', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(eDeVenta),
    })
      .then(response => response.json())
      .then(data => {
        console.log(JSON.stringify(eDeVenta))
        console.log('Post en Stock:', data);
      })
      .catch(error => {
        console.error('Error al agregar producto al stock:', error);
      })

    eliminarProductoDeCarrito(e.idStock)
  })
}

const PaymentContent = () => {
  const navigate = useNavigate()
  const [metodoPago, setMetodoPago] = useState(null)
  const [modalOpen, setModalVisible] = useState(false)
  const [total, setTotal] = useState(0)
  const [listItems, setListItems] = useState([])
  const [idNuevaVenta, setIdNuevaVenta] = useState(1)

  useEffect(() => {
    const aComprarData = async () => {
      let tot = 0
      const listaItems = JSON.parse(localStorage.getItem('productosAComprar')).map((product) => {
        tot = tot + product.cantidad * product.precio
        return <ListCompra key={(product.idStock) + (product.cantidad)} id={product.idStock} product={product} />
      })
      setListItems(listaItems)
      setTotal(tot)
    }
    aComprarData()

    const verIdVenta = async () => {
      let id = 1
      try {
        const response = await fetch('http://localhost:3001/venta')
        const jsonData = await response.json()
        jsonData.forEach(venta => {
          if (venta.idVenta > id) {
            id = venta.idVenta
          }
        })
        setIdNuevaVenta(id + 1)
      } catch (error) {
        console.error('Error al obtener los datos: ', error)
      }
    }
    verIdVenta()

  }, [])

  const tarjetas = [
    {
      id: 1,
      numero: '**** **** **** 1234',
      titular: JSON.parse(sessionStorage.getItem('user')).nombre,
      vencimiento: '12/24',
      tipo: 'Visa',
      esDebito: false,
      tipoTarjeta: 'Crédito'
    },
    {
      id: 2,
      numero: '**** **** **** 5678',
      titular: JSON.parse(sessionStorage.getItem('user')).nombre,
      vencimiento: '12/26',
      tipo: 'Mastercard',
      esDebito: true,
      tipoTarjeta: 'Débito'
    },
  ]

  const handleMetodoPagoChange = (e) => {
    setMetodoPago(e.target.value)
  }

  const handlePagarClick = () => {
    if (metodoPago) {
      console.log('Realizando pago con tarjeta:', metodoPago)
      postEnVenta(idNuevaVenta)
      postVentaStock(idNuevaVenta)
      setModalVisible(true)
      navigate('/purchases')
    } else {
      console.log('Seleccione un método de pago')
    }
  }

  const handleModalOk = () => {
    setModalVisible(false) // Cerrar ventana emergente
  }

  const handleModalCancel = () => {
    setModalVisible(false) // Cerrar ventana emergente
  }
  return (
    <div className='contenedorPrincipal'>
      <div>
        {listItems}
      </div>
      <div>
        <p className='totales'><b>SubTotal</b> ${total}</p>
        <p className='totales'><b>IVA</b> ${(total*0.21).toFixed(2)}</p>
        <p className='totales'><b>Total</b> ${(total*1.21).toFixed(2)}</p>
      </div>
      <h1>Seleccionar Método de Pago</h1>
      <div className='tarjetasContainer'>
        {tarjetas.map((tarjeta) => (
          <div key={tarjeta.id} className='tarjetaItem'>
            <Radio value={tarjeta.id} onChange={handleMetodoPagoChange} checked={metodoPago === tarjeta.id} />
            <span>{tarjeta.tipoTarjeta}</span>
          </div>
        ))}
      </div>
      <div className='cardsContainer'>
        {tarjetas.map((tarjeta) => (
          <Card
            key={tarjeta.id}
            title={tarjeta.tipo}
            className='cardItem'
          >
            <p>{tarjeta.numero}</p>
            <p>{tarjeta.titular}</p>
            <p>{tarjeta.vencimiento}</p>
          </Card>
        ))}
      </div>
      {metodoPago && (
        <div className='buttonContainer'>
          <Button type='primary' onClick={handlePagarClick}>
            Pagar
          </Button>
        </div>
      )}
      <Modal
        title='Compra realizada con éxito'
        open={modalOpen}
        onOk={handleModalOk}
        onCancel={handleModalCancel}
      >
        <p>Tu compra se ha realizado con éxito.</p>
      </Modal>
    </div>
  )
}

export default PaymentContent