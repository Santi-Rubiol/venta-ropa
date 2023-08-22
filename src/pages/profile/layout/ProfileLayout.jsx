import AppHeader from '../../principal/components/header/AppHeader'
import ProfileContent from '../../profile/content/ProfileContent'
import AppFooter from '../../principal/components/footer/AppFooter'
import AppLeftMenu from '../../principal/components/leftMenu/AppLeftMenu'
import { Layout } from 'antd'

export function ProfileLayout() {
    return (
        <Layout>
      <AppHeader />
      <Layout>
        <AppLeftMenu />
        <ProfileContent />
      </Layout>
      <AppFooter />
    </Layout>
    )
}

export default ProfileLayout