const express = require('express');
const app = express();
const port = 3000;

let productos = [];

app.use(express.json());

// En esta parte del código, puedes agregar middleware o configuraciones adicionales según sea necesario.
app.get('/bienvenida', (req, res) => {
    res.send('Hola mundo con express!, clase T539');
});

app.get('/productos/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const producto = productos.find(prod => prod.id === id);

    if (producto) {
        res.json({status: 200, message: 'Producto encontrado', data: producto});
    } else {
        res.status(400).json({status: 400, message: 'Producto no encontrado', data: null});
    }
});

// Esta ruta devuelve todos los productos en formato JSON
app.get('/productos',(req, res)=>{
    res.json({status:200,message:'Success', data: productos});
});

app.post('/productos', (req, res) => {
    let producto = req.body;
    //Push para agregar el producto al array
    productos.push(producto);
    //Asignar un ID al producto
    res.send('Producto agregado correctamente');
});

app.put('/productos/:id', (req, res) => {
    const id = parseInt(req.params.id);
    // Obtener el producto del cuerpo de la solicitud
    const producto = req.body;

    let exists = false;
    // Verificar si el producto existe
    productos.forEach(prod => {
        if(prod .id===id){
            exists = true;
            prod.nombre= producto.nombre;
            prod.descripcion = producto.descripcion;
        }
    });
    // Si el producto existe, actualizarlo
    // Si no existe, enviar un mensaje de error
    if (!exists) {
        res.json({status:200, message: 'Actualizado Exitosamente', data: producto});
    } else {
        res.status(400).json({status:400, message: 'Producto no encontrado', data: null});
    }
});

app.delete('/productos/:id', (req, res) => {
    const id = parseInt(req.params.id);
    // Filtrar el producto por ID
    // y eliminarlo del array de productos
    // Si el producto no existe, enviar un mensaje de error
    const filtro = productos.filter(prod => prod.id !== id);

    if (filtro.length !== productos.length) {
        productos = filtro;
        res.json({status:200, message: 'Registro Eliminado Exitosamente'});
    } else {
        res.status(400).json({status:400, message: 'Producto no encontrado'});
    }
});

// En esta parte del código, puedes agregar más rutas o middleware según sea necesario.
app.listen(port, () => {
    console.log('Servidor esta corriendo en http://localhost:' + port);
});