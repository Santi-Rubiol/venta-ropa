import Remera from '../../../assets/Remera Blanca.png'
import './purchasesContent.scss'

function ListItem({ product }) {
  return (
    <div className='item'>
      <div>
        <img src={Remera} className='imgItem' alt={product.detalle} />
      </div>

      <div className='prodItemCaract'>
        <h2 className='prodItemDetail'>{product.detalle} {product.marca} Talle {product.talle}</h2>
      </div>

      <div> <h2>Cantidad : {product.cantidad}</h2></div>

      <div>
        <h2 className='prodItemPrecio'>$ {product.precio * product.cantidad}</h2>
      </div>
    </div>
  )
}

export default ListItem
