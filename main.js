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
    return new Block(0, '01/01/2020', 'Genesis block', '0')
  }

  // get last block.
  // used for creating new block, for previousHash field.
  getLatestBlock() {
    return this.chain[this.chain.length - 1];
  }

  // add new block to chain.
  addBlock(newBlock) {
    newBlock.previousHash = this.getLatestBlock().hash;
    newBlock.hash = newBlock.calculateHash();
    this.chain.push(newBlock);
  }

  // check, is chain valid.
  isChainValid() {
    // go thought all blocks in chain.
    for (let i = 1; i < this.chain.length; i++) {
      const currentBlock = this.chain[i];
      const previousBlock = this.chain[i - 1];

      // check, is hash of current block correct.
      if (currentBlock.hash != currentBlock.calculateHash()) {
        return false;
      }

      // check, is link to previous block correct.
      if (currentBlock.previousHash !== previousBlock.hash) {
        return false;
      }
    }
    return true;
  }
}

// simple test of blockchain.
let testCoin = new Blockchain();
testCoin.addBlock(new Block(1, '16/06/2020', { dollars: 100}));
testCoin.addBlock(new Block(2, '28/06/2020', { dollars: 300}));
console.log('Is blockchain valid: ' + testCoin.isChainValid());
// console.log(JSON.stringify(testCoin, null, 4));
