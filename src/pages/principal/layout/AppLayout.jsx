import React from 'react'
import AppLeftMenu from '../components/leftMenu/AppLeftMenu'
import AppHeader from '../components/header/AppHeader'
import AppContent from '../components/content/AppContent'
import AppFooter from '../components/footer/AppFooter'
import { Layout } from 'antd';

const AppLayout = () => {
    return (
        <Layout className="app-layout">
            <AppHeader />
            <Layout>
                <AppLeftMenu />
                <AppContent />
            </Layout>
            <AppFooter />
        </Layout>
    )
}
export default AppLayout