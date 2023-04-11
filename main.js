const SHA256 = require('crypto-js/sha256');
const fs = require('fs');

class Block {

    constructor(index, data, previousHash = '') {
        this.index = index;
        this.timestamp = new Date();
        this.data = data;
        this.previousHash = previousHash;
        this.hash = this.calculateHash();
        this.nonce = 0;

    }

    calculateHash() {

        return SHA256(this.index + this.timestamp + this.previousHash + JSON.stringify(this.data) + this.nonce).toString();

    }

    mineBlock(difficulty) {
        while (this.hash.substring(0, difficulty) !== (Array(difficulty + 1).join('0'))) {
            this.nonce++;
            console.log(this.nonce);
            this.hash = this.calculateHash();
        }


        console.log("E' stato minato un nuovo blocco con hash :" + this.hash);
        console.log("Con un lavoro di cicli di calcolo pari a :" + this.nonce);

    }
}


class Blockchain {

    constructor(difficulty) {
        this.chain = [this.createGenesisBlock()];
        this.difficulty = difficulty;
    }


    createGenesisBlock() {
        return new Block(0, 'Block genesis Blockchain', '0');
    }

    getLatestBlock() {
        return this.chain[this.chain.length - 1];

    }

    addBlock(newblock) {
        newblock.previousHash = this.getLatestBlock().hash;
        newblock.mineBlock(this.difficulty);
        this.chain.push(newblock);
    }

    isChainValid() {
        for (var i = 1; i < this.chain.length; i++) {
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i - 1];

            if (currentBlock.hash !== currentBlock.calculateHash()) {
                return false;
            }

            if (currentBlock.previousHash !== previousBlock.hash) {
                return false;
            }
        }
        return true;
    }
}


//PROGRAMMA di implementazione

var moneta = new Blockchain(4);
moneta.addBlock(new Block(1, { nome: "giuseppe", cognome: "Capella", denaro: 5 }));
moneta.addBlock(new Block(2, { nome: "matteo", cognome: "Capella", denaro: 15 }));
moneta.addBlock(new Block(3, { nome: "pinco", cognome: "pallino", denaro: 50 }));
moneta.addBlock(new Block(4, { nome: "Franco", cognome: "Rossi", denaro: 13 }));
// moneta.addBlock(new Block(5, { nome: "Luigi", cognome: "Gialli", denaro: 50 }));
// moneta.addBlock(new Block(6, { nome: "Paolo", cognome: "Bianchi", denaro: 13 }));

console.log(JSON.stringify(moneta, null, 4));
//Manometti la blockchain cambiando un valore
//moneta.chain[2].data.denaro = 100;
//console.log(JSON.stringify(moneta, null, 4));

//Scrivi il libro mastro della Bc su un file .bc
let file = fs.createWriteStream('fmoneta.bc', { encoding: 'utf8' });
file.write(JSON.stringify(moneta, null, 4));
file.close();

//Controlla la correttezza della blockchain

console.log("la Blockchain e' stata controllata risulta: ", moneta.isChainValid());