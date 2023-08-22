import React, { useState, useEffect } from 'react'
import { Row, Col, Card,  Collapse, Button, Layout } from 'antd'
import { useNavigate } from 'react-router-dom'
const { Panel } = Collapse
const { Meta } = Card
const { Content } = Layout

const MiPerfil = () => {
  const [tarjetas, setTarjetas] = useState([])
  const [user, setUser] = useState([])
  const navigate = useNavigate()
  const LogOut = () => {
    navigate('/login')
  }
  useEffect(() => {
    const userData = async () => {
      try {
        const response = await fetch('http://localhost:3001/usuarioConCliente')
        const jsonData = await response.json()
        jsonData.forEach(user => {
          if (user.idUsuario === JSON.parse(sessionStorage.getItem('user')).idUsuario) {
            setUser(user)
            const tarjetasAleatorias = [
              {
                id: 1,
                numero: '**** **** **** 1234',
                titular: user.nombre,
                vencimiento: '12/24',
                tipo: 'Visa',
              },
              {
                id: 2,
                numero: '**** **** **** 5678',
                titular: user.nombre,
                vencimiento: '12/26',
                tipo: 'Mastercard',
              },
            ]
    
            setTarjetas(tarjetasAleatorias)
          }
        })
      } catch (error) {
        console.error('Error al obtener los datos: ', error)
      }
    }
    userData()

  }, [])

  if (!user) {
    return <div>Cargando...</div>
  }

  return (
    <Content className='content' style={{ width: '1000px', margin: '0 auto' }}>
      <h1 className='title'>Mi Perfil</h1>
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <Collapse>
            <Panel header='Datos de mi cuenta' key='datos-cuenta'>
              <Card style={{ borderColor: 'grey' }}>
                <Meta
                  title={user.nombre}
                  description={
                    <>
                      <p style={{ fontWeight: '700' }}>DNI: {user.dni}</p>
                      <p style={{ fontWeight: '700' }}>Email: {user.mail}</p>
                      <p style={{ fontWeight: '700' }}>Teléfono: {user.telefono}</p>
                      <p style={{ fontWeight: '700' }}>Dirección: {user.direccion}</p>
                    </>
                  }
                />
              </Card>
            </Panel>
            <Panel header='Tarjetas asociadas' key='tarjetas-asociadas'>
              <Row gutter={[16, 16]}>
                {tarjetas.length > 0 ? (
                  tarjetas.map((tarjeta) => (
                    <Col key={tarjeta.id} span={8}>
                      <Card style={{ borderColor: 'grey' }}>
                        <Meta
                          title={`Tarjeta ${tarjeta.numero}`}
                          description={
                            <>
                              <p style={{ fontWeight: '700' }}>Titular: {tarjeta.titular}</p>
                              <p style={{ fontWeight: '700' }}>Vencimiento: {tarjeta.vencimiento}</p>
                              <p style={{ fontWeight: '700' }}>Tipo: {tarjeta.tipo}</p>
                            </>
                          }
                        />
                      </Card>
                    </Col>
                  ))
                ) : (
                  <Col span={24}>
                    <p>No tienes tarjetas asociadas.</p>
                  </Col>
                )}
              </Row>
            </Panel>
          </Collapse>
        </Col>
      </Row>
      <br />
      <br />
      <Button type='primary' danger onClick={LogOut}>
        Cerrar Sesión
      </Button>
      <br />
      <br />

    </Content>
  )
}

export default MiPerfil;

