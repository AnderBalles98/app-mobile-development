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

app.get("/noticias", (req, res) => {
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

app.post("/noticias/delete/:notice", (req, res) => {
    const params = req.params;
    let idx = -1;
    for (let i = 0; i < noticias.length; i++) {
        if (noticias[i].toLowerCase() === params.notice.toString().toLowerCase()){
            idx = i;
            i = noticias.length;
        }
    }
    console.log(idx);
    noticias.splice(idx, 1);
    res.status(200).json({
        noticias
    });
} );

app.post("/noticias/add", (req, res) => {
    let data = req.body;
    console.log(data);
    misFavoritos.push(data.notice);
    res.status(200).json({
        misFavoritos
    });
});

app.post("/noticias/update/:notice", (req, res) => {
    let data = req.body;
    const params = req.params;

});
