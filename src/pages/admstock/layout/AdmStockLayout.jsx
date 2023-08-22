import AppHeader from "../../principal/components/header/AppHeader";
import AdmStockContent from "../content/AdmStockContent";
import AppFooter from "../../principal/components/footer/AppFooter";
import { Layout } from "antd";

export function AdmStockLayout() {
  return (
    <Layout className="app-layout">
      <AppHeader />
      <AdmStockContent />
      <AppFooter />
    </Layout>
  )
}

export default AdmStockLayout
