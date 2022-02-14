const { Gauge } = require('prom-client');

const blocks = new Gauge({
    name: `garlicoind_blocks`,
    help: `the number of blocks currently on the network`,
});
const difficulty = new Gauge({
    name: 'garlicoind_chain_difficulty',
    help: 'The proof-of-work difficulty as a multiple of the minimum difficulty',
});
const verification_progress = new Gauge({
    name: 'garlicoind_verification_progress',
    help: 'this nodes verification progress',
});
const size_on_disk = new Gauge({
    name: 'garlicoind_size_on_disk',
    help: 'the disk space this chain is currently using',
});

module.exports = {
    blocks,
    difficulty,
    verification_progress,
    size_on_disk
};
