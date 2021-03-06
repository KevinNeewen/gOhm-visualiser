import { HardhatUserConfig } from "hardhat/types"

import "@nomiclabs/hardhat-waffle"
import "@typechain/hardhat"

const ALCHEMY_API_TESTNET_URL = process.env.ALCHEMY_API_TESTNET_URL || ""
const ALCHEMY_API_MAINNET_URL = process.env.ALCHEMY_API_MAINNET_URL || ""
const TESTNET_PRIVATE_KEY =
    process.env.TESTNET_PRIVATE_KEY ||
    "0xc87509a1c067bbde78beb793e6fa76530b6382a4c0241e5e4a9ec0a0f44dc0d3" // well known private key
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY

const config: HardhatUserConfig = {
    defaultNetwork: "hardhat",
    solidity: {
        compilers: [{ version: "0.7.5", settings: {} }],
    },
    networks: {
        goerli: {
            url: ALCHEMY_API_TESTNET_URL,
            accounts: [TESTNET_PRIVATE_KEY],
        },
        kovan: {
            url: ALCHEMY_API_TESTNET_URL,
            accounts: [TESTNET_PRIVATE_KEY],
        },
        arbitrum: {
            url: ALCHEMY_API_MAINNET_URL,
            accounts: [TESTNET_PRIVATE_KEY],
        },
        coverage: {
            url: "http://127.0.0.1:8555", // Coverage launches its own ganache-cli client
        },
        local: {
            url: "http://localhost:8545",
            gas: "auto",
        },
    },
    mocha: {
        timeout: 60000,
    },
}

export default config