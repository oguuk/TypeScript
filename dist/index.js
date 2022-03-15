"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const CryptoJS = require("crypto-js");
class Block {
    constructor(index, hash, previousHash, data, timestamp) {
        this.index = index;
        this.hash = hash;
        this.previousHash = previousHash;
        this.data = data;
        this.timestamp = timestamp;
    }
}
Block.calculateBlockHash = (index, previousHash, timestamp, data) => CryptoJS.SHA256(index + previousHash + timestamp + data).toString();
Block.validateStructure = (aBlock) => typeof aBlock.index === "number" &&
    typeof aBlock.hash === "string" &&
    typeof aBlock.previousHash === "string" &&
    typeof aBlock.timestamp === "number" &&
    typeof aBlock.data === "string";
const genesisBlock = new Block(0, "20220315", "", "oguuk", 777777);
let blockchain = [genesisBlock];
const getBlockchain = () => blockchain;
const getLatestBlock = () => blockchain[blockchain.length - 1];
const getNewTimeStamp = () => Math.round(new Date().getTime() / 1000);
const createNewBlock = (data) => {
    const previousBlock = getLatestBlock();
    const newIndex = previousBlock.index + 1;
    const newTimestamp = getNewTimeStamp();
    const newHash = Block.calculateBlockHash(newIndex, previousBlock.hash, newTimestamp, data);
    const newBlock = new Block(newIndex, newHash, previousBlock.hash, data, newTimestamp);
    addBlock(newBlock);
    return newBlock;
};
const getHashForlock = (aBlock) => Block.calculateBlockHash(aBlock.index, aBlock.previousHash, aBlock.timestamp, aBlock.data);
const isBlockValid = (candidateBlock, previousBlock) => {
    if (!Block.validateStructure(candidateBlock)) {
        return false;
    }
    else if (previousBlock.index + 1 !== candidateBlock.index) {
        return false;
    }
    else if (previousBlock.hash !== candidateBlock.previousHash) {
        return false;
    }
    else if (getHashForlock(candidateBlock) !== candidateBlock.hash) {
        return false;
    }
    else {
        return true;
    }
};
const addBlock = (candidateBlock) => {
    if (isBlockValid(candidateBlock, getLatestBlock())) {
        blockchain.push(candidateBlock);
    }
};
createNewBlock("second Block");
createNewBlock("third Block");
createNewBlock("fourth Block");
console.log(blockchain);
/*//Typed: 어떤 종류의 변수와 데이터 인지 설정을 해야함
class Human2 {
    public name: string;
    public age: number;
    public gender: string;
    constructor(name: string, age: number, gender: string){//클래스가 시작할 때마다 호출 됨
        this.name = name;
        this.age = age;
        this.gender = gender;
    }
}

const lynn = new Human2("Lynn",18,"female")

interface Human {
    name:string;
    age: number;
    gender: string;
}

const person = {
    name: "oguuk",
    age:22,
    gender:"male"
}
const name = "oguuk"
const age = 24
const gender = "male";

const sayHi = (person:Human): string => { // ?는 선택적 파라미터 / Int나 Double이 아니라 number / 반환값은 소괄호 옆에 콜론 붙이고 타입
    return `Hello ${person.name}, you are ${person.age}, you are a ${person.gender}!`
};

sayHi(person);
*/ 
//# sourceMappingURL=index.js.map