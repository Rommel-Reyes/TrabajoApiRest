app.delete('/api/books/:id', (req, res) => {
    // Obtener el ID del libro de la URL
    const idLibroAEliminar = req.params.id;
    const idNumerico = parseInt(idLibroAEliminar);
    
    // Leer los libros actuales
    const listaDeLibros = readBooks();
    
    // Buscar el libro
    const posicionDelLibro = listaDeLibros.findIndex(libro => libro.id === idNumerico);
    
    // Si no existe el libro
    if (posicionDelLibro === -1) {
        return res.status(404).json({
            error: 'Libro no encontrado',
            id: idLibroAEliminar,
            mensaje: 'No se puede eliminar un libro que no existe'
        });
    }
    
    // Guardar información del libro antes de eliminarlo
    const libroEliminado = listaDeLibros[posicionDelLibro];
    
    // Eliminar el libro del array
    listaDeLibros.splice(posicionDelLibro, 1);
    
    // Guardar cambios en el archivo
    if (writeBooks(listaDeLibros)) {
        res.status(200).json({
            mensaje: 'Libro eliminado exitosamente',
            libroEliminado: libroEliminado,
            cantidadLibrosRestantes: listaDeLibros.length
        });
    } else {
        res.status(500).json({
            error: 'Error al eliminar el libro de la base de datos'
        });
    }
});