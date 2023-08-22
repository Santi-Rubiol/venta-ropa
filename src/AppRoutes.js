import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import ProductoLayout from './pages/producto/layout/ProductoLayout'
import CarritoLayout from './pages/carrito/layout/CarritoLayout'
import AppLayout from './pages/principal/layout/AppLayout'
import ProfileLayout from './pages/profile/layout/ProfileLayout'
import LoginPage from './pages/login/LoginPage'
import AdmStockLayout from './pages/admstock/layout/AdmStockLayout'
import PaymentLayout from './pages/paymet/layout/PaymentLayout'
import RegisterPage from './pages/register/RegisterPage'
import PurchasesLayout from './pages/purchases/layout/PurchasesLayout'

const AppRoutes = () => {

    return (
        <Router>
            <Routes>
                <Route key='*' path='/*' element={<LoginPage />} />
                
                <Route key='admstock' path='/admstock' element={<AdmStockLayout />} />

                <Route key='catalogue' path='/catalogue' element={<AppLayout />} />
                <Route key='cart' path='/cart' element={<CarritoLayout />} />
                <Route key='product' path='/product' element={<ProductoLayout />} />
                <Route key='profile' path='/profile' element={<ProfileLayout />} />
                <Route key='payment' path='/payment' element={<PaymentLayout />} />
                <Route key='register' path='/register' element={<RegisterPage />} />
                <Route key='purchases' path='/purchases' element={<PurchasesLayout />} />
            </Routes>
        </Router>
    )
}

export default AppRoutes
