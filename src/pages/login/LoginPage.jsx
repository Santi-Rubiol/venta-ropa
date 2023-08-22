import React, { useState, useEffect } from 'react'
import { Form, Input, Button } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
import './loginPage.scss'


const LoginPage = () => {
  const navigate = useNavigate()
  const [mailAct, setMailAct] = useState('')
  const [password, setPassword] = useState('')


  const validarUser = async () => {
    let band = false
    try {
      const response = await fetch('http://localhost:3001/usuarioConCliente')
      const jsonData = await response.json()
      jsonData.forEach(user => {
        if (user.nombreUsuario === mailAct && user.contraseña === password) {
          band = true
          if (user.nombreUsuario === 'Admin') {
            navigate('/admstock')
          } else {
            sessionStorage.setItem('user', JSON.stringify(user))
            navigate('/catalogue')
          }
        }
      })
    } catch (error) {
      console.error('Error al obtener los datos: ', error)
    }
    if (!band) {
      alert('Mail o contraseña incorrectos')
    }
  }


  const onFinish = values => {
    setMailAct(values.mail)
    setPassword(values.password)
  }

  useEffect(() => {
    sessionStorage.setItem('user', JSON.stringify({}))
    if (mailAct !== '' && password !== '') {
      validarUser()
    }
  }, [mailAct, password])

  const handleClick = () => {
    navigate('/register')
  }

  return <div className='loginPage'>
      <div className='loginContainer'>
        <Form
          name='normal_login'
          className='login-form'
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
        >
          <Form.Item>
            <h1>INICIO DE SESIÓN</h1>
          </Form.Item>
          <Form.Item
            name='mail'
            rules={[
              { required: true, message: 'Ingresar mail de usuario por favor' },
            ]}
          >
            <Input
              prefix={<UserOutlined className='site-form-item-icon' />}
              placeholder='Correo Electrónico'
            />
          </Form.Item>
          <Form.Item
            name='password'
            rules={[
              { required: true, message: 'Ingresar contraseña por favor' },
            ]}
          >
            <Input
              prefix={<LockOutlined className='site-form-item-icon' />}
              type='password'
              placeholder='Contraseña'
            />
          </Form.Item>

          <Form.Item>
            <Button
              type='primary'
              htmlType='submit'
              className='login-form-button'
            >
              Ingresar
            </Button>
            <br />
            <br />
            <Button
              type='default'
              className='registerBoton'
              onClick={handleClick}>
              Registrarse
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  
}

export default LoginPage
