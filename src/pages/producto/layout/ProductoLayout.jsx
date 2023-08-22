import AppHeader from '../../principal/components/header/AppHeader'
import ProductContent from '../../producto/content/ProductContent'
import AppFooter from '../../principal/components/footer/AppFooter'
import AppLeftMenu from '../../principal/components/leftMenu/AppLeftMenu'
import { Layout } from 'antd'

export function ProductoLayout() {
    return (
        <Layout className="app-layout">
            <AppHeader />
            <Layout>
                <AppLeftMenu />
                <ProductContent />
            </Layout>
            <AppFooter />
        </Layout>
    )
}

export default ProductoLayout