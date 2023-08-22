import AppHeader from '../../principal/components/header/AppHeader'
import PurchasesContent from '../content/PurchasesContent'
import AppFooter from '../../principal/components/footer/AppFooter'
import AppLeftMenu from '../../principal/components/leftMenu/AppLeftMenu'
import { Layout } from 'antd'

export function PurchasesLayout() {
    return (
        <Layout>
      <AppHeader />
      <Layout>
        <AppLeftMenu />
        <PurchasesContent />
      </Layout>
      <AppFooter />
    </Layout>
    )
}

export default PurchasesLayout