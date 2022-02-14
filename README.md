# garlicoin-exporter
Garlicoin metrics **Prometheus** exporter.

## Credits
This project is a clone of https://github.com/LePetitBloc/bitcoind-exporter adapted to work with Garlicoin.


## Usage
Edit the `.env` environment file to suit your needs and run:
```
npm start
```
> `garlicoin-exporter` uses the `garlicoin` **JSON-RPC** API under the hood and need those credentials:
> ```
>rpcuser=test
>rpcpassword=1cf98b57-5i09-4fa1-9c07-2e28cb2cb47b
>```


### Docker
Using environment variables:
```
docker run -d --restart always --name my-exporter -p 9439:9439 -e "rpcuser=myrpcuser" -e "rpcpassword=myrpcpassword" -e "rpchost=my-wallet" --link my-wallet xhissy/garlicoin-exporter
````

Using a `.env` file:
```
docker run -d --restart always --name my-exporter -p 9439:9439 -v /path/to/my/conf:/app/.env --link my-wallet xhissy/garlicoin-exporter
```

>An easy hack could be to directly use your wallet conf to feed your exporter `env`:
>```
>docker run --name my-exporter -p 9439:9439 -v /path/to/my/conf:/app/.env --link my-wallet xhissy/garlicoin-exporter
>```

## Example metrics
When visiting the metrics URL http://localhost:9439/metrics the following **metrics** are produced:
```
# HELP garlicoind_blocks the number of blocks currently on the network
# TYPE garlicoind_blocks gauge
garlicoind_blocks 3122740

# HELP garlicoind_chain_difficulty The proof-of-work difficulty as a multiple of the minimum difficulty
# TYPE garlicoind_chain_difficulty gauge
garlicoind_chain_difficulty 36.79843830538587

# HELP garlicoind_verification_progress this noodes verification progress
# TYPE garlicoind_verification_progress gauge
garlicoind_verification_progress 0.9999997325333823

# HELP garlicoind_size_on_disk the disk space this chain is currently using
# TYPE garlicoind_size_on_disk gauge
garlicoind_size_on_disk 9169000835
```

## Demo
You can test this exporter with `docker-compose`:
```
docker-compose up
```

## Resources
* https://prometheus.io/
* https://github.com/garlicoin-project/garlicoind-rpc

## Licence
MIT

[npm-svg]: https://img.shields.io/npm/v/garlicoind-exporter.svg
[npm-url]: https://npmjs.org/package/garlicoind-exporter
[hub-url]: https://hub.docker.com/r/lepetitbloc/garlicoind-exporter/
[hub-svg]: https://img.shields.io/docker/pulls/lepetitbloc/garlicoind-exporter.svg