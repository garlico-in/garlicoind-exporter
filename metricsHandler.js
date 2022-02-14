var RpcClient = require('garlicoind-rpc');
const { register } = require('prom-client');
require('isomorphic-fetch');
const {
    blocks,
    difficulty,
    verification_progress,
    size_on_disk
} = require('./metrics');

const {
    rpcuser = 'rpcuser',
    rpcpassword = 'rpcpassword',
    rpchost = 'localhost',
    rpcport = '42070',
    rpcscheme = 'http',
} = process.env;

var config = {
    protocol: rpcscheme,
    user: rpcuser,
    pass: rpcpassword,
    host: rpchost,
    port: rpcport
};

var rpc = new RpcClient(config);

const metricsHandler = (req, res) => {
    res.set('Content-Type', register.contentType);

    const blockChainInfoPromise = rpc.getBlockchainInfo(function (err, ret) {

        if (err) {
            console.error(err);
            return 0
        }

        console.log(ret);
        blocks.set(ret.result.blocks);
        difficulty.set(ret.result.difficulty);
        verification_progress.set(ret.result.verificationprogress);
        size_on_disk.set(ret.result.size_on_disk);

        return;
    });

    Promise.all([
        blockChainInfoPromise
    ])
        .then(() => res.end(register.metrics()))
        .catch((error) => {
            console.error(error);

            let code = 500;
            if (error.code === -28) {
                code = 503;
            } else if (error.code === 403) {
                code = 403;
            }

            return res.status(code).send(`# ${error.message}\n`)
        })
    ;
};

module.exports = metricsHandler;