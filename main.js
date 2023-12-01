const Block = require('./block.js');
const Blockchain = require('./blockchain.js');
const express = require('express');
const cors = require('cors');

const { chain } = require('./moneta.js');
const { validation } = require('./valida.js');
const app = express();

app.use(express.static('public'));
app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.get('/', (req, res) => {
    res.sendFile('home.html', {
        root: __dirname + '/public'
    });
});
app.get('/view', (req, res) => {
    res.sendFile('view.html', {
        root: __dirname + '/public'
    });
});

app.get('/json', (req, res) => {
    res.json(chain);
    
});

app.post('/action', (req, res) => {
    const data = req.body;
    console.log(data);
    res.status(200).json(data);
});

app.get('/valida', (req, res) => {
    res.json(validation);
});

app.get('*', (req, res) => {
    res.send('<h1>PAGINA NON TROVATA 404</h1>');
});

app.listen(3000);

//PROGRAMMA di implementazione

var moneta = new Blockchain(2);
// moneta.createTransazione();
// moneta.createTransazione();
// moneta.createTransazione();
// moneta.createTransazione();
// moneta.createTransazione();
// moneta.createTransazione();

console.log(JSON.stringify(moneta, null, 4));

//Manometti la blockchain cambiando un valore
//moneta.chain[2].data.denaro = 100;
//console.log(JSON.stringify(moneta, null, 4));

//moneta.salva();

//Controlla la correttezza della blockchain
let valida = moneta.isChainValid();
console.log("la Blockchain e' stata controllata risulta: ", moneta.isChainValid());