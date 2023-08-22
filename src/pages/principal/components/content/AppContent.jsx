import { Layout } from 'antd'
import ProductCard from './ProductCard'
import './appContent.scss'
import { useEffect, useState } from 'react'

const { Content } = Layout

function AppContent() {
    const [dataStock, setDataStock] = useState([])

    useEffect(() => {
        localStorage.setItem('prendaAct', JSON.stringify({}))
        const listStock = async () => {
            try {
                const response = await fetch('http://localhost:3001/stockConPrenda')
                const jsonData = await response.json()
                setDataStock(jsonData)
            } catch (error) {
                console.error('Error al obtener los datos: ', error)
            }
        }
        listStock()
    }, [])

    const uniqueIdPrendas = new Set()
    const lista = dataStock
        .filter(product => {
            if (uniqueIdPrendas.has(product.idPrenda)) {
                return false 
            }
            uniqueIdPrendas.add(product.idPrenda)
            return true
        })
        .map(product => (
            <ProductCard
                key={product.idStock}
                id={product.idPrenda}
                product={product} />
        ))

    return (
        <Content className='content'>
            <h1 className='title'>
                Productos
            </h1>
            <div className='cards-content'>
                {lista}
            </div>
        </Content>
    )
}

export default AppContent