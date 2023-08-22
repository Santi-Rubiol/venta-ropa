import { Layout, Input, Row, Col, Button, Select, Space, Table } from 'antd'
import './admStockContent.scss'
import { useEffect, useState } from 'react'

const { Content } = Layout

function postEnPrenda(prendaNueva) {
  fetch('http://localhost:3001/prenda', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(prendaNueva),
  })
    .then(response => response.json())
    .then(data => {
      console.log(JSON.stringify(prendaNueva))
      console.log('Post en prenda: ', data);
    })
    .catch(error => {
      console.error('Error al agregar prenda:', error);
    })
}

function postEnStock(prodAStock) {
  fetch('http://localhost:3001/stock', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(prodAStock),
  })
    .then(response => response.json())
    .then(data => {
      console.log(JSON.stringify(prodAStock))
      console.log('Post en Stock:', data);
    })
    .catch(error => {
      console.error('Error al agregar producto al stock:', error);
    })
}

function putEnStock(prodAStock) {
  fetch('http://localhost:3001/stock', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(prodAStock),
  })
    .then(response => response.json())
    .then(data => {
      console.log(JSON.stringify(prodAStock))
      console.log('PUT en Stock:', data);
    })
    .catch(error => {
      console.error('Error al agregar producto al stock:', error);
    })
}


function AdmStockContent() {
  const [listPrendas, setlistPrendas] = useState([])
  const [idStockActual, setIdStockActual] = useState(0)
  const [idPrendaAct, setIdPrendaAct] = useState(0)
  const [detalleAct, setDetalleAct] = useState()
  const [marcaAct, setMarcaAct] = useState()
  const [precioAct, setPrecioAct] = useState()
  const [cantidadAct, setCantidadAct] = useState()
  const [talleAct, setTalleAct] = useState()
  const [stock, setStock] = useState([])
  const [editarPrenda, setEditarPrenda] = useState(false)
  const [idUltimaPrenda, setIdUltimaPrenda] = useState(0)
  const [cambioRealizado, setCambioRealizado] = useState(false)

  const [detalleAModificar, setDetalleAModificar] = useState('')
  const [marcaAModificar, setMarcaAModificar] = useState('')
  const [precioAModificar, setPrecioAModificar] = useState('')

  useEffect(() => {
    const llenarStock = async () => {
      const stockActual = []
      try {
        const response = await fetch('http://localhost:3001/stockConPrenda')
        const jsonData = await response.json()
        jsonData.forEach(productAct => {
          stockActual.push(productAct)
        })
        setStock(stockActual)
      } catch (error) {
        console.error('Error al obtener los datos: ', error)
      }
    }
    llenarStock()
  }, [cambioRealizado])

  useEffect(() => {
    const llenarPrendas = async () => {
      const prendas = []
      prendas.push({ 'idPrenda': 0, 'detalle': 'Nuevo Producto', 'marca': '' })
      let idP = 0
      try {
        const response = await fetch('http://localhost:3001/prenda')
        const jsonData = await response.json()
        jsonData.forEach(prendAc => {
          prendas.push(prendAc)
          if (idP < prendAc.idPrenda) {
            idP = prendAc.idPrenda
          }
        })
        setlistPrendas(prendas)
        setIdUltimaPrenda(idP)
      } catch (error) {
        console.error('Error al obtener los datos: ', error)
      }
    }
    llenarPrendas()
  }, [cambioRealizado])

  const cambioSelectPrenda = (value) => {
    setIdPrendaAct(value)
  }

  useEffect(() => {
    if (!editarPrenda) {
      if (idPrendaAct !== 0) {
        listPrendas.map((prod) => {
          if (prod.idPrenda === idPrendaAct) {
            setDetalleAct(prod.detalle)
            setMarcaAct(prod.marca)
            setPrecioAct(prod.precio)
            setTalleAct()
            setCantidadAct()
          }
        })
      } else {
        setDetalleAct('')
        setMarcaAct('')
        setPrecioAct()
        setTalleAct()
        setCantidadAct()
      }
    }

  }, [idPrendaAct])

  const onSearch = (value) => {
  }
  const onTalleChange = (value) => {
    setTalleAct(value)
  }
  const handleCantidadChange = (event) => {
    setCantidadAct(event.target.value)
  }
  const handlePrecioChange = (event) => {
    setPrecioAct(event.target.value)
  }
  const handleMarcaChange = (event) => {
    setMarcaAct(event.target.value)
  }
  const handleDetalleChange = (event) => {
    setDetalleAct(event.target.value)
  }

  const addNewProduct = () => {

    if (!editarPrenda) {
      if (talleAct !== undefined &&
        cantidadAct > 0) {
        if (idPrendaAct === 0) { //ES PRENDA NUEVA (ANDA)
          if (detalleAct !== '' &&
            marcaAct !== '' &&
            precioAct !== 0) {
            const prendaNueva = {
              detalle: detalleAct,
              marca: marcaAct,
              precio: precioAct
            }
            postEnPrenda(prendaNueva)

            const prodAStock = {
              idPrenda: idUltimaPrenda + 1,
              talle: talleAct,
              cantidad: cantidadAct
            }
            postEnStock(prodAStock)

          } else {
            alert('Alguno/s de los datos no son válidos')
          }
        } else { //Es prenda existente 
          let band = false
          let cantEnStock = 0
          let idActualDeStock = 0
          stock.map((prod) => {
            if (prod.idPrenda === idPrendaAct && prod.talle === talleAct) {
              band = true
              idActualDeStock = prod.idStock
              cantEnStock = prod.cantidad
            }
          })
          if (band) { // Si existe de ese talle, existe en stock (update stock) (ANDA)
            cantEnStock = (Number(cantEnStock) + Number(cantidadAct))
            console.log('Suma de cantidades: ' + cantEnStock)
            const prodAStock = {
              idStock: idActualDeStock,
              idPrenda: idPrendaAct,
              talle: talleAct,
              cantidad: cantEnStock
            }

            putEnStock(prodAStock)
          } else { //Existe, pero no en ese talle (input stock) (ANDA)
            const prodAggStock = {
              idPrenda: idPrendaAct,
              talle: talleAct,
              cantidad: cantidadAct
            }
            postEnStock(prodAggStock)
          }
        }
      } else {
        alert('Alguno/s de los datos no son válidos')
      }
    } else {
      if (talleAct !== undefined &&
        cantidadAct !== 0) {
        if (detalleAModificar !== detalleAct ||
          marcaAModificar !== marcaAct ||
          precioAModificar !== precioAct) {

          const prendaAModificar = {
            detalle: detalleAct,
            marca: marcaAct,
            precio: precioAct
          }
          postEnPrenda(prendaAModificar)

          const modifStock = {
            idStock: idStockActual,
            idPrenda: idUltimaPrenda + 1,
            talle: talleAct,
            cantidad: cantidadAct
          }
          putEnStock(modifStock)

          console.log('Prenda Nueva: ' + JSON.stringify(precioAModificar))
          console.log('Stock Modificado: ' + JSON.stringify(modifStock))

        } else {
          const prodAStock = {
            idStock: idStockActual,
            idPrenda: idPrendaAct,
            talle: talleAct,
            cantidad: cantidadAct
          }
          putEnStock(prodAStock)

          console.log('Stock Modificado: ' + JSON.stringify(prodAStock))
        }
      } else {
        alert('Alguno/s de los datos no son válidos')
      }
    }
    limpiarCampos()
    setCambioRealizado(!cambioRealizado)
  }

  const limpiarCampos = () => {
    setEditarPrenda(false)
    setIdPrendaAct(0)
    setIdStockActual()
    setDetalleAct()
    setMarcaAct()
    setTalleAct()
    setCantidadAct()
    setPrecioAct()
    setDetalleAModificar('')
    setMarcaAModificar('')
    setPrecioAModificar('')
  }


  const llenarCampos = (prod) => {
    setEditarPrenda(true)
    setIdPrendaAct(prod.idPrenda)
    setIdStockActual(prod.idStock)

    setDetalleAct(prod.detalle)
    setMarcaAct(prod.marca)
    setTalleAct(prod.talle)
    setCantidadAct(prod.cantidad)
    setPrecioAct(prod.precio)

    setDetalleAModificar(prod.detalle)
    setMarcaAModificar(prod.marca)
    setPrecioAModificar(prod.precio)
  }
  const eliminarStock = (idStock) => {
    let op = window.confirm('¿Está seguro que desea eliiminar este producto del stock?')
    if(op){
      const prodAStock = {
        idStock: idStock
      }
      fetch('http://localhost:3001/stock', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(prodAStock),
      })
        .then(response => response.json())
        .then(data => {
          console.log(JSON.stringify(prodAStock))
          console.log('Stock Eliminado:', data);
        })
        .catch(error => {
          console.error('Error al eliminar producto de stock:', error);
        })
      setCambioRealizado(!cambioRealizado)
    }
    
  }

  const columns = [
    {
      title: 'Prenda',
      dataIndex: 'detalle',
      key: 'prenda'
    },
    {
      title: 'Marca',
      dataIndex: 'marca',
      key: 'marca'
    },
    {
      title: 'Talle',
      dataIndex: 'talle',
      key: 'talle'
    },
    {
      title: 'Cantidad',
      dataIndex: 'cantidad',
      key: 'cantidad'
    },
    {
      title: 'Precio',
      dataIndex: 'precio',
      key: 'precio'
    },
    {
      title: 'Botones',
      key: 'action',
      render: (_, prod) => (
        < Space key={prod.idStock} size='middle' >
          <div className='stockListButtons'>
            <div className='editButton'>
              <Button type='primary' onClick={() => llenarCampos(prod)} >
                Editar Stock
              </Button>
            </div>
            <div className='deleteButton'>
              <Button type='default' danger onClick={() => eliminarStock(prod.idStock)}>
                Eliminar del Stock
              </Button>
            </div>
          </div>
        </Space>
      ),
    },
  ]

  const dataSource = stock.map(e => {
    return {
      key: e.idStock,
      detalle: e.detalle,
      marca: e.marca,
      talle: e.talle,
      cantidad: e.cantidad,
      precio: e.precio,
      idStock: e.idStock,
      idPrenda: e.idPrenda,
    }
  })

  return (
    <Content className='stockContent'>
      <h1 className='title'>Administrador de Stock</h1>
      <Row>
        <Col>
          <label className='label'>PRENDA</label>
          <Select
            size='large'
            showSearch
            placeholder='Seleccione una prenda'
            optionFilterProp='children'
            onChange={cambioSelectPrenda}
            onSearch={onSearch}
            filterOption={(input, option) =>
              (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
            }
            options={listPrendas.map((prenda) => {
              return {
                value: prenda.idPrenda,
                label: prenda.detalle + ' ' + prenda.marca,
              }
            })}
            disabled={editarPrenda}
          />

          <br />
          <br />

          <label className='label' >
            NUEVO PRODUCTO
          </label>
          <Input size='large' className='c' value={detalleAct} placeholder='Detalle' disabled={idPrendaAct !== 0 && !editarPrenda} onChange={handleDetalleChange} />

          <br />
          <br />

          <label className='label'>
            MARCA
          </label>
          <Input size='large' className='c' value={marcaAct} placeholder='Marca' disabled={idPrendaAct !== 0 && !editarPrenda} onChange={handleMarcaChange} />

        </Col>
        <Col>

          <br />

          <label className='label'>TALLE</label>
          <Select
            className='talleSlc'
            size='large'
            showSearch
            placeholder='Seleccione un Talle'
            optionFilterProp='children'
            onChange={onTalleChange}
            onSearch={onSearch}
            filterOption={(input, option) =>
              (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
            }
            value={talleAct}
            options={[
              {
                value: 'S',
                label: 'S',
              },
              {
                value: 'M',
                label: 'M',
              },
              {
                value: 'L',
                label: 'L',
              },
              {
                value: 'XL',
                label: 'XL'
              },
              {
                value: 'XXL',
                label: 'XXL'
              },
            ]}
          />

          <br />
          <br />

          <label className='label'>
            CANTIDAD
          </label>
          <Input size='large' className='cantidadInp' value={cantidadAct} placeholder='Cantidad' onChange={handleCantidadChange} />

          <br />
          <br />

          <label className='label'>
            PRECIO
          </label>
          <Input size='large' className='c' value={precioAct} placeholder='Precio' disabled={idPrendaAct !== 0 && !editarPrenda} onChange={handlePrecioChange} />

          <Button onClick={addNewProduct} className='addNewProduct' >
            GUARDAR
          </Button>
          <Button onClick={limpiarCampos} className='cancelarCambios' disabled={!editarPrenda}>
            CANCELAR CAMBIOS
          </Button>
        </Col>

        <Col> {/* stock */}
          <Table columns={columns} dataSource={dataSource} />
        </Col>
      </Row>
    </Content>
  )
}

export default AdmStockContent
