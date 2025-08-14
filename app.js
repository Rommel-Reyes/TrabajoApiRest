/* 
Descripción del Ejercicio:
En este ejercicio, crearás una API REST para gestionar una lista de libros. Utilizarás
Node.js con Express para desarrollar endpoints que permitan realizar operaciones
básicas CRUD (Crear, Leer, Actualizar, Eliminar) sobre los libros.

Especificaciones del Libro:
Cada libro tendrá los siguientes atributos:
• id: Identificador único del libro (número entero).
• titulo: Título del libro (cadena de texto).
• autor: Autor del libro (cadena de texto).
• genero: Género del libro (cadena de texto).
• anioPublicacion: Año de publicación del libro (número entero).

Pasos a seguir:
1. Configuración inicial:
o Inicia un nuevo proyecto de Node.js utilizando npm.
o Instala el framework Express como dependencia del proyecto.
2. Configuración del servidor:
o Configura un servidor Express en un archivo app.js.
o Utiliza el middleware express.json() para manejar datos en formato JSON.
3. Definición de Endpoints:
o Crea endpoints para gestionar libros:
▪ GET /api/books: Obtener todos los libros.
▪ GET /api/books/:id: Obtener un libro por su ID.
▪ POST /api/books: Agregar un nuevo libro.
▪ PUT /api/books/:id: Actualizar un libro existente.
▪ DELETE /api/books/:id: Eliminar un libro por su ID.
*/

const express = require ('express')
const app = express()
const port = 3000

// Datos en memoria (simulando una base de datos algo simple, esto para guardar los datos)
let books = []
let currentId = 1

app.use(express.json())


app.get('/Bienvenida',(req, res)=>{
    res.send('Bienvenido a la API de Libros')
})

// GET /api/books: Obtener todos los libros.
app.get('/api/books', (req, res) => {
    //Aqui se enviaro invio informacion en formato JSON que hace referencia a los datos almacenados en la variable "books"
    res.json({status:200,message:'Success', data: books})
})

// GET /api/books/:id: Obtener un libro por su ID para solo mandar un valor (un libro)
app.get('/api/books/:id', (req, res) => {
    const bookId = parseInt(req.params.id)
    const book = books.find(b => b.id === bookId)

    if (book) {
        res.json({status:200, message:"Producto es", data:book})
    } else {
        res.status(404).json({ status:404, message: 'Libro no encontrado', data:null})
    }
})

// POST /api/books: Agregar un nuevo libro.
app.post('/api/books', (req, res) => {
    // Definimos una constante ya que los valores no seran cambiados al momento de agregar un nuevo libro: o podemos usar un LET
    const newBook = {
        id: currentId++,
        titulo: req.body.titulo,
        autor: req.body.autor,
        genero: req.body.genero,
        anioPublicacion: req.body.anioPublicacion
    }
    // Enviamos los datos del nuevo libro:
    books.push(newBook)
    res.status(201).json({ status:201, message:'Producto agregado correctamente', data:newBook})
})
// (Si ven algun error pueden corregirlo o me avisan!)


// PUT /api/books/:id: Actualizar un libro existente.

