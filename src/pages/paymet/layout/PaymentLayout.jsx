import AppHeader from '../../principal/components/header/AppHeader'
import PaymentContent from '../../paymet/content/PaymentContent'
import AppFooter from '../../principal/components/footer/AppFooter'
import AppLeftMenu from '../../principal/components/leftMenu/AppLeftMenu'
import { Layout } from 'antd'

export function PaymentLayout() {
    return (
        <Layout>
      <AppHeader />
      <Layout>
        <AppLeftMenu />
        <PaymentContent />
      </Layout>
      <AppFooter />
    </Layout>
    )
}

export default PaymentLayout