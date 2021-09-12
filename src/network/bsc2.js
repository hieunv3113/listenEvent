const Web3 = require('web3');
const config = require("../config")

let Web3Socket = null

module.exports = ({
    web3: () => {
        return new Web3(new Web3.providers.HttpProvider(config.BSCNetwork2.RPC_PROVIDER))
    },
    socket: async () => {

        Web3Socket = Web3Socket || await new Web3(new Web3.providers.WebsocketProvider(config.BSCNetwork2.WEBSOCKET_PROVIDER))

        return Web3Socket

    },
    reconnectWeb3Socket: async () => {
        const provider = await new Web3.providers.WebsocketProvider(config.BSCNetwork2.WEBSOCKET_PROVIDER)
        Web3Socket.setProvider(provider)

        provider.on('connect', function () {
            console.log("Websocket Reconnected")
        })
    }
})

