const url = 'http://localhost:3001'

export const agregar = (tabla, datos) => {
    fetch(url + tabla, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(datos),
    })
        .then(response => response.json())
        .then(data => {
            console.log(JSON.stringify(datos))
            console.log('Post en prenda: ', data);
        })
        .catch(error => {
            console.error('Error al agregar prenda:', error);
        })
}

export const leer = async (tabla) => {
    const response = await fetch(url + tabla)
    const jsonData = await response.json()
    return jsonData
}

export const modificar = (tabla, datos) => {
    fetch(url + tabla, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(datos),
    })
        .then(response => response.json())
        .then(data => {
            console.log(JSON.stringify(datos))
            console.log('PUT en Stock:', data);
        })
        .catch(error => {
            console.error('Error al agregar producto al stock:', error);
        })
}

export const eliminar = (tabla, datos) => {
    fetch(url + tabla, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(datos),
    })
        .then(response => response.json())
        .then(data => {
            console.log(JSON.stringify(prodAStock))
            console.log('Stock Eliminado:', data);
        })
        .catch(error => {
            console.error('Error al eliminar producto de stock:', error);
        })
}