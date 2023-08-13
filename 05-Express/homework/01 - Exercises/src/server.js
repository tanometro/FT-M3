const express = require("express");

let publications = [];

const server = express();

server.use(express.json());

server.post("/posts", (req, res) =>{
    let nextId = 1;
    const {author, title, contents} = req.body;

    if (!author || !title || !contents) {
        res.status(400).json({error: "No se recibieron los parámetros necesarios para crear la publicación"})
    }
    else {
        const publicacion = {
            id: nextId,
            author: req.query.author,
            title: req.query.title,
            contents: req.query.contents,
        }
        publications.push(publicacion);
        nextId++;
        res.status(200).json(publicacion);
    }
})

server.get("/post", (req, res) =>{
    const {author, title} = req.query;

    const publicacionC = publications.filter(pub => pub.author === author && pub.title === title);

    if(publicacionC.length > 0){
        res.status(200).json(publicacionC)
    }
    else {
        res.status(400).json({error: "No existe ninguna publicación con dicho título y autor indicado"})
    }
})

server.get("/posts(:author", (req, res) =>{
    const {author} = req.params;

    const publicacionA = publications.filter(pub => pub.author === author);
    if(publicacionA.length > 0){
        res.json(publicacionA);
    }
    else {
        res.status(400).json({error: "No existe ninguna publicación del autor indicado"})
    }
})

server.put("posts/:id", (req, res) =>{
    const id = parseInt(req.params.id);
    const {title, contents} = req.body;
    const publicacionE = publications.find(pub => pub.id === id)

    if(!id || !title || !contents) {
        res.status(400).json({error: "No se recibieron los parámetros necesarios para modificar la publicación"})
    }
    else if (!publicacionE) {
        res.status(400).json({error: "No se recibió el id correcto necesario para modificar la publicación"})
    }
    else {
        publicacionE.title = title;
        publicacionE.contents = contents;
        res.status(200).json(publicacionE);
    }

    
})

server.delete("/posts/:id", (req, res) => {
    const id = parseInt(req.params.id);
    if(!id) res.status(400).json({error: "No se recibió el id de la publicación a eliminar"})

    const publicacionV = publications.find(pub => pub.id === id);

    if(publicacionV) {
        const pubEliminar = publications.indexOf(publicacionV);
        publications.splice(pubEliminar, 1);
        res.status(200).json({ success: true })
    }
    else {
        res.status(400).json({error: "No se recibió el id correcto necesario para eliminar la publicación"})
    }
})

server.
//NO MODIFICAR EL CODIGO DE ABAJO. SE USA PARA EXPORTAR EL SERVIDOR Y CORRER LOS TESTS
module.exports = { publications, server };
