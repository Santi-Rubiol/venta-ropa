import React from 'react'
import { Layout, Menu } from 'antd'
import {
    TagOutlined, ShoppingCartOutlined, BookOutlined,
    UserOutlined
} from '@ant-design/icons'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './leftMenu.scss'

function getItem(label, key, icon, onClick) {
    return {
        key,
        icon,
        label,
        onClick,
    }
}

const { Sider } = Layout

const AppLeftMenu = () => {
    const [collapsed, setCollapsed] = useState(false);
    const toggleCollapsed = () => {
        setCollapsed(!collapsed);
    }
    const navigate = useNavigate()

    const irA = (ruta) => {
        navigate(ruta)
    }

    const items = [
        getItem('Catálogo', '1', <TagOutlined />, () => irA('/catalogue')),
        getItem('Carrito', '2', <ShoppingCartOutlined />, () => irA('/cart')),
        getItem('Mis Compras', '3', <BookOutlined />, () => irA('/purchases')),
        getItem('Perfil', '4', <UserOutlined />, () => irA('/profile'))
    ]

    return (
        <Sider
            breakpoint='xxl '
            collapsedWidth='0'
        >
            <Menu
                className='left-menu'
                /* defaultSelectedKeys={['1']} */
                mode='inline'
                theme='dark'
                /* inlineCollapsed={collapsed} */
                onClick={toggleCollapsed}
                items={items}
            />
        </Sider>
    )
}

export default AppLeftMenu