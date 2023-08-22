import Remera from '../../../assets/Remera Blanca.png'
import { Button, InputNumber } from 'antd'
import './carritoContent.scss'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function ListItem({product, actualizarCantidad, eliminarProducto}) {
  const navigate = useNavigate()
  const [precTot, setPrecTot] = useState(product.cantidad * product.precio)
  const [cantActual, setCantActual] = useState(product.cantidad);

  const onCantActChange = (cantAct) => {
    setCantActual(cantAct)
    setPrecTot(cantAct * product.precio)
   
    actualizarCantidad(product.idStock, cantAct)
  }

  const btnComprarAhora = () => {
    localStorage.setItem('productosAComprar', JSON.stringify([product]))
    navigate('/payment')
  }

  return (
    <div className='item'>
      <div>
        <img src={Remera} className='imgItem' alt={product.detalle} />
      </div>

      <div className='prodItemCaract'>
        <h2 className='prodItemDetail'>{product.detalle} {product.marca} Talle {product.talle}</h2>
      </div>

      <div> <b>Cantidad : </b>
        <InputNumber
          name='input-num'
          type='number'
          defaultValue={product.cantidad}
          onChange={(valor) => {
            try {
              onCantActChange(parseInt(valor));
            } catch (nullPointerException) { }
          }}
          value={cantActual}
          min={1}
          max={product.cantMax}
        />
      </div>

      <div>
        <h2 className='prodItemPrecio'>$ {precTot}</h2>
      </div>

      <div className='prodCartButtons'>
        <div className='buyNowButton'>
          <Button type='primary' onClick={btnComprarAhora}>Comprar Ahora</Button>
        </div>
        <div className='deleteButton'>
          <Button type='default' onClick={() => eliminarProducto(product.idStock)} danger>
            Eliminar del Carrito
          </Button>
        </div>
      </div>
    </div>
  )
}

export default ListItem;
