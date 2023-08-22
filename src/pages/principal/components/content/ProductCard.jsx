import { Card } from 'antd'
import './productCard.scss'
import Remera from '../../../../assets/Remera Blanca.png'
import { useNavigate } from 'react-router-dom'


function ProductCard(props) {
    const navigate = useNavigate()
    const product = props.product

    const handleClick = () => {
        localStorage.setItem('prendaAct', JSON.stringify(product))
        navigate('/product')
    }

    return (
        <Card className='product-card'
            onClick={handleClick}>
            <div className='product-card-img'>
                <img
                    src={Remera}
                    className='card-img'
                    alt={product.detalle}
                />
            </div>
            <h1 className='product-card-detalle'>{product.detalle}</h1>
            <h2 className='product-card-marca'>{product.marca}</h2>
            <div className='product-card-precio'>$ {product.precio}</div>
        </Card>
    )
}
export default ProductCard
