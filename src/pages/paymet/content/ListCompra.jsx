
function ListCompra(props) {
    const product = props.product

    return (
      <div className='itemCompra'>
        <div className='prodCompraCaract'>
          <p className='prodCartDetail'><b>{product.detalle} {product.marca}</b> -
          Talle {product.talle} -
          Cantidad {product.cantidad} - 
          ${product.precio} - 
          SubTotal: ${product.cantidad * product.precio}
           </p>
        </div>
      </div>
    )
  }
  
  export default ListCompra
  