const SHA256 = require('crypto-js/sha256');


class Transazione {
    costructor(sign, dest, text, coin) {
        this.mitt = sign;
        this.dest = dest;
        this.text = text;
        this.coin = coin;
        this.hasn = this.calculateHash;
    }

    calculateHash() {

        return SHA256(this.mitt + this.dest + this.text + this.coin).toString();
    }
}
module.exports = Transazione;