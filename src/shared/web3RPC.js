import Web3 from "web3";

export default class RPC {
    constructor(provider) {
        this.provider = provider;
        this.web3 = new Web3(provider);
    }


    async getChainID() {
        const chainID = await this.web3.eth.getChainId();
        return chainID.toString();
    }

    async getAccounts() {
        const address = await this.web3.eth.getAccounts();
        return address;
    }

    async getBalance() {
        const balance = await this.web3.eth.getBalance(await this.getAccounts()[0]);
        return balance;
    }
    async sendTransaction() {

    }
}