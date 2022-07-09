const { response } = require("express");
const express = require("express");
const app = express();
app.use(express.json());
const albums = require("./albums.json");

// --Obtener todos los albums.
app.get("/albums", function (req, res) {
  res.json(albums);
});

// --Encontrar un album por su id.
app.get("/albums/:albumId", function (req, res) {
  const id = Number(req.params.albumId);
  const albumById = albums.find((album) => Number(album.albumId) === id);
  return res.send(albumById);
});

//Agregar un album nuevo.
app.post("/albums", function (req, res) {
  //     --Como este json tiene solo dos objetos que con id 10 y 11 respectivamente, necesitaremos encontrar el valor del ultimo
  //     id, para asi al crear el nuevo album tenga el valor del siguiente, si solo colocamos "albums.length" tomara en cuenta
  //     los dos objetos ya existentes y por ende en el arreglo sera el primero con posicion en "0"  y el segundo con posicion "1", por tanto
  //     si creamos un objeto nuevo, le colocara id = 2.
  //    --Para evitar eso haremos lo siguiente:

  const findLastId = Number(albums[albums.length - 1].albumId) + 1;
  const lastId = findLastId.toString();

  //Ahora con esto conseguimos que al crear el siguiente album, su posicion sea 2 en el arreglo pero dentro de los valores del objeto albumId = 12.

  const newAlbum = {
    albumId: lastId,
    artistName: req.body.artistName,
    collectionName: req.body.collectionName,
    artworkUrl100: req.body.artworkUrl100,
    releaseDate: req.body.releaseDate,
    primaryGenreName: req.body.primaryGenreName,
    url: req.body.url,
  };
  albums.push(newAlbum);
  return res.send({ success: true }); //<--El ejercicio nos pide devolver un "SUCESS TRUE"
  //res.send(newAlbum);
});

//Modificar un album ya existente.
app.put("/albums/:albumId", function (req, res) {
  const id = Number(req.params.albumId);
  const findAlbumById = albums.find((album) => Number(album.albumId) === id);
  findAlbumById.artistName = req.body.artistName;
  findAlbumById.collectionName = req.body.collectionName;
  findAlbumById.artworkUrl100 = req.body.artworkUrl100;
  findAlbumById.releaseDate = req.body.releaseDate;
  findAlbumById.primaryGenreName = req.body.primaryGenreName;
  findAlbumById.url = req.body.url;
  return res.send({ success: true });
});

//Borrar un album ya existente.
app.delete("/albums/:albumId", function (req, res) {
  const id = req.params.albumId;
  const index = albums.findIndex((album) => album.albumId === id);
  albums.splice(index, 1);
  return res.send({ success: true });
});

app.listen(5000, () => console.log("Listening on port 5000"));
