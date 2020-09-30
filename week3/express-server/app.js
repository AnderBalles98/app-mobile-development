var express = require("express");
var cors = require("cors");
var app = express();
app.use(express.json());
app.use(cors());
app.listen(3000, () => {
    console.log('Server running on port 3000');
});

var noticias = [
    "Literatura país", "Futbol Barcelona", "Futbol Barranquilla", "Política Montevideo",
    "Economía Santiago de Chile", "Cocina Maxico DF", "Finanzas Nuevo York"
];

app.get("/get", (req, res) => {
    res.status(200).json({
        noticias: noticias.filter((notica) => {
        return notica.toLowerCase().indexOf(req.query.q.toString().toLowerCase()) > -1;
        })
    });
});

var misFavoritos = [];

app.get("/favs", (req, res) => {
    res.status(200).json({
        misFavoritos
    });
});

app.post("/favs", (req, res) => {
    let data = req.body;
    console.log(data);
    misFavoritos.push(data);
    res.status(200).json({
        misFavoritos
    });
});
