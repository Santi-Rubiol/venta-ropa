import React, { useState } from 'react';
import { Form, Input, Button, Modal } from 'antd';
import {
  LockOutlined, FieldNumberOutlined, UserOutlined,
  MailOutlined, PhoneOutlined, HomeOutlined
} from '@ant-design/icons';

import { useNavigate } from 'react-router-dom'
import './registerPage.scss'

const RegisterPage = () => {
  const [nomComp, setNomComp] = useState('')
  const [dni, setDni] = useState('')
  const [mail, setMail] = useState('')
  const [tel, setTelefono] = useState('')
  const [direc, setDireccion] = useState('')
  const [password, setPassword] = useState('')
  const [visible, setVisible] = useState(false)
  // const handleDateChange = (date, fecNac) => {
  //   setSelectedDate(date)
  //   console.log(fecNac)
  // }

  const onFinish = values => {
    setNomComp(values.nomComp)
    setDni(values.dni)
    setMail(values.mail)
    setTelefono(values.tel)
    setDireccion(values.direc)
    setPassword(values.password)
  }

  const handleNomComp = (event) => {
    setNomComp(event.target.value)
  }

  const handleDni = (event) => {
    setDni(event.target.value)
  }

  const handleMail = (event) => {
    setMail(event.target.value)
  }

  const handleTelefono = (event) => {
    setTelefono(event.target.value)
  }

  const handleDireccion = (event) => {
    setDireccion(event.target.value)
  }

  const handlePassword = (event) => {
    setPassword(event.target.value)
  }

  const handleOk = () => {
    setVisible(false)
  }

  const handleCancel = () => {
    setVisible(false)
  }
  

  const createAccount = () => {
    // Datos para el INSERT
    if (nomComp !== '' && dni !== '' && mail !== '' && tel !== '' && direc !== '') {
      const nuevoUsuario = {
        idUsuario: dni,
        nombreUsuario: mail,
        password: password
      }

      fetch('http://localhost:3001/usuarios', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(nuevoUsuario),
      })
        .then(response => response.json())
        .then(data => {
          console.log(JSON.stringify(nuevoUsuario))
          console.log('Usuario insertado:', data)

        })
        .catch(error => {
          console.error('Error al insertar el usuario: ', error);
        })

      const nuevaCuenta = {
        nombre: nomComp,
        dni: dni,
        mail: mail,
        telefono: tel,
        direccion: direc,
        idUsuario: dni
      }

      fetch('http://localhost:3001/clientes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(nuevaCuenta),
      })
        .then(response => response.json())
        .then(data => {
          console.log(JSON.stringify(nuevaCuenta))
          console.log('Cliente insertado:', data)
        })
        .catch(error => {
          console.error('Error al insertar el cliente:', error);

        })

      setVisible(true)
    }
  }

  const navigate = useNavigate()
  const handleClick = () => {
    navigate('/login');
  }

  return (
    <div className='registerPage'>
      <div className='registerContainer'>
        <Form
          name='normal_register'
          className='register-form'
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
        >
          <Form.Item>
            <h1>REGISTRO DE CUENTA</h1>
          </Form.Item>

          <Form.Item
            name='nomComp'

            rules={[
              {
                required: true,
                message: 'Ingresar nombre de usuario por favor',
              },
            ]}
          >
            <Input
              prefix={<UserOutlined />}
              id='' className='regInput' placeholder='Nombre Completo' onChange={handleNomComp} />
          </Form.Item>

          <Form.Item
            name='dni'
            // label='DNI: '
            rules={[
              { required: true, message: 'Ingresar DNI de usuario por favor' }
            ]}
          >
            <Input
              prefix={<FieldNumberOutlined />}
              className='regInput' placeholder='DNI' onChange={handleDni} />
          </Form.Item>

          <Form.Item
            name='mail'
            // label='Mail: '
            rules={[
              { required: true, message: 'Ingresar mail de usuario por favor' }
            ]}
          >

            <Input
              prefix={<MailOutlined />}
              className='regInput' placeholder='Mail' onChange={handleMail} />
          </Form.Item>

          <Form.Item
            name='tel'
            // label='Telefono: '
            rules={[
              {
                required: true,
                message: 'Ingresar telefono de usuario por favor'
              }
            ]}
          >

            <Input
              prefix={<PhoneOutlined rotate={90} />}
              className='regInput' placeholder='Teléfono' onChange={handleTelefono} />
          </Form.Item>

          <Form.Item
            name='direc'
            rules={[
              {
                required: true,
                message: 'Ingresar direccion de usuario por favor'
              }
            ]}
          >

            <Input
              prefix={<HomeOutlined />}
              className='regInput' placeholder='Dirección' onChange={handleDireccion} />
          </Form.Item>

          <Form.Item
            name='password'
            rules={[
              { required: true, message: 'Ingresar contraseña por favor' }
            ]}
          >
            <Input
              prefix={<LockOutlined className='site-form-item-icon' />}
              type='password'
              placeholder='Contraseña'
              onChange={handlePassword}
            />
          </Form.Item>

          <Form.Item>

            <Button
              type='primary'
              htmlType='submit'
              className='regCrear'
              onClick={createAccount}
            >
              CREAR CUENTA
            </Button>
          </Form.Item>

          <Form.Item>
            <Button
              className='regVolver'
              onClick={handleClick}>
              VOLVER AL LOGIN
            </Button>
          </Form.Item>
        </Form>
        <Modal
          title='Cuenta creada'
          open={visible}
          onOk={handleOk}
          onCancel={handleCancel}
        >
          <p>Cuenta creada con éxito</p>
        </Modal>
      </div>
    </div>
  )
}

export default RegisterPage;
