const SHA256 = require('crypto-js/sha256');

class Block {

    constructor(data, previousHash) {
        this.timestamp = new Date();
        this.data = data;
        this.previousHash = previousHash;
        this.hash = this.calculateHash();
        this.nonce = 0;

    }

    calculateHash() {

        return SHA256(this.timestamp + this.previousHash + JSON.stringify(this.data) + this.nonce).toString();

    }

    mineBlock(difficulty) {
        while (this.hash.substring(0, difficulty) !== (Array(difficulty + 1).join('0'))) {
            this.nonce++;
            this.hash = this.calculateHash();
        }
        console.log("E' stato minato un nuovo blocco con hash :" + this.hash);
        console.log("Con un lavoro di cicli di calcolo pari a :" + this.nonce);
    }

}

module.exports = Block;