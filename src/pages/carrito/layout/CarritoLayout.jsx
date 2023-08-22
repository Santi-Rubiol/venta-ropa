import AppHeader from "../../principal/components/header/AppHeader";
import AppFooter from "../../principal/components/footer/AppFooter";
import AppLeftMenu from "../../principal/components/leftMenu/AppLeftMenu";
import CarritoContent from "../../carrito/content/CarritoContent";
import { Layout } from "antd";

export function CarritoLayout() {
  return (
    <Layout>
      <AppHeader />
      <Layout>
        <AppLeftMenu />
        <CarritoContent />
      </Layout>
      <AppFooter />
    </Layout>
  );
}

export default CarritoLayout;
