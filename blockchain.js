const Block = require('./block.js');
const Transazione = require('./trans.js');
const fs = require('fs');



class Blockchain {

    constructor(difficulty) {
        this.chain = [this.createGenesisBlock()];
        this.difficulty = difficulty;
        this.inattesaTrans = [];
        this.ricompensa = 10 * this.difficulty
    }

    tostring() {
        return (this.chain);
    }

    createGenesisBlock() {
        return new Block(0, { firma: 0, testo: 'Block genesis Blockchain' }, '0');
    }

    getLatestBlock() {
        return this.chain[this.chain.length - 1];

    }

    miningPendingTrans(signMiner) {
        let block = new Block(this.inattesaTrans, this.getLatestBlock().hash);
        block.mineBlock(this.difficulty);
        console.log('Blocco minato con successo!');
        this.chain.push(block);
        const transric = createTransazionRicompensa(indirizzoMinatore, "ricompensa miner!", this.ricompensa);
        this.inattesaTrans[transric];
    }

    controllTransMine() {
        if (this.inattesaTrans.length > 4) {
            this.miningPendingTrans(123456789);
        }
    };

    createTransazione(sign, text) {
        const trans = new Transazione(sign, 0, text, this.ricompensa);
        this.inattesaTrans.push(trans);
        this.controllTransMine();
    }

    createTransazioneRicompensa(sign) {
        const transric = new Transazione(0, sign, "ricompensa miner!", this.ricompensa * 5);
        this.inattesaTrans.push(transric);
        this.controllTransMine();
    }

    createTransazioneRicarica(sign, coin) {
        const transwallet = new Transazione(0, sign, "Ricarica wallet!", coin);
        this.inattesaTrans.push(transwallet);
        this.controllTransMine();
    }

    balanceWallet(sign) {
        let balance = 0;

        for (const block of this.chain) {
            for (const trans of block.data) {

                if (trans.dest === signMiner) {
                    balance += this.coin;
                }
                if (trans.dest !== signMiner) {
                    balance -= this.coin;
                }
            }
            return balance;
        }
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
                return ({
                    validate: false
                });
            }

            if (currentBlock.previousHash !== previousBlock.hash) {
                return ({
                    validate: false
                });
            }
        }
        return ({
            validate: true
        });
    }


    salva() {
        //Scrivi il libro mastro della Bc su un file .bc
        let file = fs.createWriteStream('moneta.js', { encoding: 'utf8' });
        file.write(`const chain = ${JSON.stringify(this.chain, null, 4)};\n`);
        file.write(`module.exports = {chain};`);
        file.close();
        let filev = fs.createWriteStream('valida.js', { encoding: 'utf8' });
        filev.write(`const validation = ${JSON.stringify(this.isChainValid(), null, 4)}\nmodule.exports = {validation};`);
        filev.close();
    }

}

module.exports = Blockchain;