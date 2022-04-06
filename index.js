const express =require('express');
const app = express();
const port = 8080;
const Caver = require('caver-js')

function getCaver() { 
    const caver = new Caver('https://api.baobab.klaytn.net:8651/')
    return caver;
}

//노드가 관리하는 계좌정보들 불러오기
async function getAccounts(account) {
    try {
        const accounts = await getCaver().klay.getAccounts(); 
        console.log(accounts);
        return accounts;
    } catch (e) {
        console.log(e);
        return e;
    }
}

app.get('/', (req, res) => {
    getAccounts().then((accounts) => {
        res.send(accounts);
    })
});

//계좌정보 불러오기
async function getAccount(_account) {
    try {
        const account = await getCaver().klay.getAccount(_account); 
        console.log(account);
        return account;
    } catch (e) {
        console.log(e);
        return e;
    }
}

app.get('/getAccount', (req, res) => {
    var account = req.query.account;
    getAccount(account).then((data) => {
        res.send(data);
    })
});

//가스비 불러오기
async function getGasPrice() {
    try {
        const gasPrice = await getCaver().klay.getGasPrice();
        console.log(gasPrice);
        return gasPrice;
    } catch (e) {
        console.log(e);
        return e;
    }
}

app.get('/gasprice', (req, res) => {
    getGasPrice().then((gasPrice) => {
        res.send(gasPrice);
    })
})

app.get('/getblock', (req, res) => {
    getBlock().then((getBlock) => {
        res.send(getBlock);
    })
})
//블록정보 가져오기
async function getBlock() {
    try {
        const getBlock = await getCaver().klay.getBlock("latest");
        console.log(getBlock);
        return getBlock;
    } catch (e) {
        console.log(e);
        return e;
    }
}

app.listen(port, () => {
	console.log('Listening...');
});