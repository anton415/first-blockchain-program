const SHA256 = require('crypto-js/sha256');

// Simple Block in Blockchain.
class Block {
  constructor(index, timestamp, data, previousHash = '') {
    // index - where block in chain.
    this.index = index;
    // timestamp - when block was created.
    this.timestamp = timestamp;
    // data - any tipe of data for block. Like details of transaction.
    this.data = data;
    // previousHash - hash of previos block.
    this.previousHash = previousHash;
    // hash or id of block.
    this.hash = this.calculateHash();
  }

  // Calculate hash using crypto-js library.
  // Return hash.
  calculateHash() {
    return SHA256(this.index + this.previousHash + this.timestamp + JSON.stringify(this.data)).toString();
  }
}

// Simple blockchain.
class Blockchain {
  constructor() {
    // chain - array of blocks. With first genesis block.
    this.chain = [this.createGenesisBlock()];
  }

  // first block, should be add manualy.
  createGenesisBlock() {
    return new Block(0, Date.now(), 'Genesis block', '0')
  }

  getLatestBlock() {
    
  }
}
