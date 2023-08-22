const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

const connection = mysql.createConnection({
  host: 'localhost', // Cambia esto si tu base de datos está en otro servidor
  user: 'SantiagoR',
  password: 'Ciruja43162378',
  database: 'bd_venta_ropa',
});

connection.connect((err) => {
  if (err) {
    console.error('Error al conectar a la base de datos: ', err);
    return;
  }
  console.log('Conexión exitosa a la base de datos');
});

// Aquí puedes definir tus rutas y consultas a la base de datos

const PORT = 3001; // Puedes cambiar el puerto si es necesario

app.listen(PORT, () => {
  console.log(`Servidor en ejecución en el puerto ${PORT}`);
});

// Conexión a todas las tablas por separado
app.get('/carrito_prod', (req, res) => {
  connection.query('SELECT * FROM carrito_prod;', (err, results) => {
    if (err) {
      console.error('Error al ejecutar la consulta: ', err);
      res.status(500).send('Error en el servidor');
      return;
    }
    res.json(results);
  });
});
app.get('/clientes', (req, res) => {
  connection.query('SELECT * FROM cliente;', (err, results) => {
    if (err) {
      console.error('Error al ejecutar la consulta: ', err);
      res.status(500).send('Error en el servidor');
      return;
    }
    res.json(results);
  });
});
app.get('/prenda', (req, res) => {
  connection.query('SELECT * FROM prenda;', (err, results) => {
    if (err) {
      console.error('Error al ejecutar la consulta: ', err);
      res.status(500).send('Error en el servidor');
      return;
    }
    res.json(results);
  });
});
app.get('/stock', (req, res) => {
  connection.query('SELECT * FROM stock;', (err, results) => {
    if (err) {
      console.error('Error al ejecutar la consulta: ', err);
      res.status(500).send('Error en el servidor');
      return;
    }
    res.json(results);
  });
});
app.get('/usuarios', (req, res) => {
  connection.query('SELECT * FROM usuarios;', (err, results) => {
    if (err) {
      console.error('Error al ejecutar la consulta: ', err);
      res.status(500).send('Error en el servidor');
      return;
    }
    res.json(results);
  });
});
app.get('/venta', (req, res) => {
  connection.query('SELECT * FROM venta;', (err, results) => {
    if (err) {
      console.error('Error al ejecutar la consulta: ', err)
      res.status(500).send('Error en el servidor')
      return;
    }
    res.json(results)
  })
})
app.get('/venta_stock', (req, res) => {
  connection.query('SELECT * FROM venta_stock;', (err, results) => {
    if (err) {
      console.error('Error al ejecutar la consulta: ', err)
      res.status(500).send('Error en el servidor')
      return;
    }
    res.json(results)
  })
})

// Vista de tablas combinadas
app.get('/stockConPrenda', (req, res) => {
  connection.query(
    'SELECT s.idStock, s.idPrenda, p.detalle, p.marca, s.talle, s.cantidad, p.precio FROM stock as s LEFT JOIN prenda as p on p.idPrenda = s.idPrenda ORDER BY detalle, marca;',
    (err, results) => {
      if (err) {
        console.error('Error al ejecutar la consulta: ', err);
        res.status(500).send('Error en el servidor');
        return;
      }
      res.json(results);
    }
  );
});

app.get('/usuarioConCliente', (req, res) => {
  connection.query(
    'SELECT u.idUsuario, u.nombreUsuario, u.contraseña, c.*  FROM usuarios as u LEFT JOIN cliente as c on c.id_Usuario = u.idUsuario;',
    (err, results) => {
      if (err) {
        console.error('Error al ejecutar la consulta: ', err)
        res.status(500).send('Error en el servidor')
        return;
      }
      res.json(results)
    }
  )
})
app.get('/carritoDeCliente', (req, res) => {
  connection.query(
    'SELECT c.idCliente,s.idPrenda, s.idStock, c.dni, p.detalle, p.marca, s.talle, cp.cantidad, s.cantidad as cantMax, p.precio FROM carrito_prod cp JOIN cliente c ON cp.idCliente = c.idCliente JOIN stock s ON cp.idStock = s.idStock JOIN prenda p ON s.idPrenda = p.idPrenda ORDER BY detalle, marca;',
    (err, results) => {
      if (err) {
        console.error('Error al ejecutar la consulta: ', err)
        res.status(500).send('Error en el servidor')
        return;
      }
      res.json(results)
    }
  )
})
app.get('/prodsDeVentaCliente', (req, res) => {
  connection.query(
    'SELECT v.idVenta, v.idCliente, p.detalle, p.marca, p.precio, s.talle, vs.cantidad FROM venta_stock as vs INNER JOIN venta as v ON v.idVenta = vs.idVenta INNER JOIN stock as s ON s.idStock = vs.idStock INNER JOIN prenda as p ON p.idPrenda = s.idPrenda;',
    (err, results) => {
      if (err) {
        console.error('Error al ejecutar la consulta: ', err)
        res.status(500).send('Error en el servidor')
        return;
      }
      res.json(results)
    }
  )
})

// POST
app.post('/clientes', (req, res) => {
  // Verificar si los datos requeridos están presentes en el cuerpo de la solicitud
  if (req.body) {
    // Obtener los datos del nuevo cliente del cuerpo de la solicitud
    const newCli = req.body;
    connection.query(
      'INSERT INTO cliente (dni, nombre, mail, telefono, direccion, id_Usuario) VALUES (?,?,?,?,?,?)',
      [
        newCli.dni,
        newCli.nombre,
        newCli.mail,
        newCli.telefono,
        newCli.direccion,
        newCli.idUsuario,
      ],
      (err, results) => {
        if (err) {
          console.error('Error al ejecutar la consulta: ', err);
          res.status(500).json({ error: 'Error en el servidor' });
          return;
        }
        res.json({ message: 'Cliente creado exitosamente' });
      }
    );
  } else {
    res
      .status(400)
      .json({ error: 'Faltan datos requeridos para la inserción' });
  }
});

app.post('/usuarios', (req, res) => {
  // Verificar si los datos requeridos están presentes en el cuerpo de la solicitud
  if (req.body) {
    // Obtener los datos del nuevo cliente del cuerpo de la solicitud
    const newUser = req.body;
    connection.query(
      'INSERT INTO usuarios(idUsuario, nombreUsuario, contraseña) VALUES (?,?,?)',
      [newUser.idUsuario, newUser.nombreUsuario, newUser.password],
      (err, results) => {
        if (err) {
          console.error('Error al ejecutar la consulta: ', err);
          res.status(500).json({ error: 'Error en el servidor' });
          return;
        }

        res.json({ message: 'prenda agregada exitosamente' });
      }
    );
  } else {
    res
      .status(400)
      .json({ error: 'Faltan datos requeridos para la inserción' });
  }
});

app.post('/carrito_prod', (req, res) => {
  // Verificar si los datos requeridos están presentes en el cuerpo de la solicitud
  if (req.body) {
    // Obtener los datos del nuevo cliente del cuerpo de la solicitud
    const prodCart = req.body;
    connection.query(
      'INSERT INTO carrito_prod (idCliente, idStock, cantidad) VALUES (?,?,?)',
      [prodCart.idCliente, prodCart.idStock, prodCart.cantidad],
      (err, results) => {
        if (err) {
          console.error('Error al ejecutar la consulta: ', err);
          res.status(500).json({ error: 'Error en el servidor' });
          return;
        }

        res.json({ message: 'Producto agregado exitosamente' });
      }
    );
  } else {
    res
      .status(400)
      .json({ error: 'Faltan datos requeridos para la inserción' });
  }
});
app.post('/stock', (req, res) => {
  // Verificar si los datos requeridos están presentes en el cuerpo de la solicitud
  if (req.body) {
    // Obtener los datos del nuevo cliente del cuerpo de la solicitud
    const newStock = req.body;
    connection.query(
      'INSERT INTO stock(idPrenda, talle, cantidad) VALUES (?,?,?)',
      [newStock.idPrenda, newStock.talle, newStock.cantidad],
      (err, results) => {
        if (err) {
          console.error('Error al ejecutar la consulta: ', err);
          res.status(500).json({ error: 'Error en el servidor' });
          return;
        }

        res.json({ message: 'Stock agregado exitosamente' });
      }
    );
  } else {
    res
      .status(400)
      .json({ error: 'Faltan datos requeridos para la inserción' })
  }
})
app.post('/prenda', (req, res) => {
  // Verificar si los datos requeridos están presentes en el cuerpo de la solicitud
  if (req.body) {
    // Obtener los datos del nuevo cliente del cuerpo de la solicitud
    const newStock = req.body
    connection.query(
      'INSERT INTO prenda(detalle, marca, precio) VALUES (?,?,?)',
      [newStock.detalle, newStock.marca, newStock.precio],
      (err, results) => {
        if (err) {
          console.error('Error al ejecutar la consulta: ', err)
          res.status(500).json({ error: 'Error en el servidor' })
          return;
        }

        res.json({ message: 'prenda agregada exitosamente' })
      }
    )
  } else {
    res
      .status(400)
      .json({ error: 'Faltan datos requeridos para la inserción' })
  }
});

app.post('/venta', (req, res) => {
  // Verificar si los datos requeridos están presentes en el cuerpo de la solicitud
  if (req.body) {
    // Obtener los datos del nuevo cliente del cuerpo de la solicitud
    const newVenta = req.body
    connection.query(
      'INSERT INTO venta(idVenta, idCliente) VALUES (?,?)',
      [newVenta.idVenta, newVenta.idCliente],
      (err, results) => {
        if (err) {
          console.error('Error al ejecutar la consulta: ', err)
          res.status(500).json({ error: 'Error en el servidor' })
          return;
        }

        res.json({ message: 'Stock agregado exitosamente' })
      }
    )
  } else {
    res
      .status(400)
      .json({ error: 'Faltan datos requeridos para la inserción' })
  }
})
app.post('/venta_stock', (req, res) => {
  // Verificar si los datos requeridos están presentes en el cuerpo de la solicitud
  if (req.body) {
    // Obtener los datos del nuevo cliente del cuerpo de la solicitud
    const newProdVenta = req.body
    connection.query(
      'INSERT INTO venta_stock(idVenta, idStock,cantidad) VALUES (?,?,?)',
      [newProdVenta.idVenta, newProdVenta.idStock, newProdVenta.cantidad],
      (err, results) => {
        if (err) {
          console.error('Error al ejecutar la consulta: ', err)
          res.status(500).json({ error: 'Error en el servidor' })
          return;
        }

        res.json({ message: 'Stock agregado exitosamente' })
      }
    )
  } else {
    res
      .status(400)
      .json({ error: 'Faltan datos requeridos para la inserción' })
  }
})


//PARA UPDATE
app.put('/stock', (req, res) => {
  // Verificar si los datos requeridos están presentes en el cuerpo de la solicitud
  if (req.body) {
    // Obtener los datos del nuevo cliente del cuerpo de la solicitud
    const newStock = req.body;
    connection.query(
      'UPDATE stock set cantidad =?,  talle = ?, idPrenda = ? WHERE idStock = ?;',
      [newStock.cantidad, newStock.talle, newStock.idPrenda, newStock.idStock],
      (err, results) => {
        if (err) {
          console.error('Error al ejecutar la consulta: ', err);
          res.status(500).json({ error: 'Error en el servidor' });
          return;
        }

        res.json({ message: 'Stock agregado exitosamente' });
      }
    );
  } else {
    res
      .status(400)
      .json({ error: 'Faltan datos requeridos para la inserción' });
  }
});

app.put('/prenda', (req, res) => {
  // Verificar si los datos requeridos están presentes en el cuerpo de la solicitud
  if (req.body) {
    // Obtener los datos del nuevo cliente del cuerpo de la solicitud
    const editPrenda = req.body;
    connection.query(
      'UPDATE prenda set detalle =?, marca = ?, precio = ? where idPrenda = ?;',
      [
        editPrenda.detalle,
        editPrenda.marca,
        editPrenda.precio,
        editPrenda.idPrenda,
      ],
      (err, results) => {
        if (err) {
          console.error('Error al ejecutar la consulta: ', err);
          res.status(500).json({ error: 'Error en el servidor' });
          return;
        }

        res.json({ message: 'Prenda Modificada' });
      }
    );
  } else {
    res
      .status(400)
      .json({ error: 'Faltan datos requeridos para la inserción' });
  }
});

app.put('/carrito_prod', (req, res) => {
  // Verificar si los datos requeridos están presentes en el cuerpo de la solicitud
  if (req.body) {
    // Obtener los datos del nuevo cliente del cuerpo de la solicitud
    const editCarritoCant = req.body;
    connection.query(
      'UPDATE carrito_prod set cantidad = ? where idStock = ? AND idCliente = ?;',
      [
        editCarritoCant.cantidad,
        editCarritoCant.idStock,
        editCarritoCant.idCliente,
      ],
      (err, results) => {
        if (err) {
          console.error('Error al ejecutar la consulta: ', err);
          res.status(500).json({ error: 'Error en el servidor' });
          return;
        }

        res.json({ message: 'Producto de carrito modificado' });
      }
    );
  } else {
    res
      .status(400)
      .json({ error: 'Faltan datos requeridos para la inserción' })
  }
})

// ELIMINAR
app.delete('/stock', (req, res) => {
  // Verificar si los datos requeridos están presentes en el cuerpo de la solicitud
  if (req.body) {
    // Obtener los datos del nuevo cliente del cuerpo de la solicitud
    const newStock = req.body;
    connection.query(
      'delete from stock where idStock = ?',
      [newStock.idStock],
      (err, results) => {
        if (err) {
          console.error('Error al ejecutar la consulta: ', err);
          res.status(500).json({ error: 'Error en el servidor' });
          return;
        }

        res.json({ message: 'Stock agregado exitosamente' });
      }
    );
  } else {
    res
      .status(400)
      .json({ error: 'Faltan datos requeridos para la inserción' });
  }
})

app.delete('/carrito_prod', (req, res) => {
  // Verificar si los datos requeridos están presentes en el cuerpo de la solicitud
  if (req.body) {
    // Obtener los datos del nuevo cliente del cuerpo de la solicitud
    const prod = req.body;
    connection.query(
      'delete from carrito_prod where idStock = ?',
      [prod.idStock],
      (err, results) => {
        if (err) {
          console.error('Error al ejecutar la consulta: ', err);
          res.status(500).json({ error: 'Error en el servidor' });
          return;
        }

        res.json({ message: 'Stock agregado exitosamente' });
      }
    );
  } else {
    res
      .status(400)
      .json({ error: 'Faltan datos requeridos para la inserción' });
  }
});
