/**
 * Audius Smart Contracts truffle configuration
 * @authors Hareesh Nagaraj, Sid Sethi, Roneil Rumburg
 * @version 0.0.1
 */

const { NearProvider, nearlib: nearAPI } = require('near-web3-provider');
// Because we're using a function-call access key, this is the same as the NEAR_LOCAL_EVM
const NEAR_LOCAL_ACCOUNT_ID = 'audius.demo.testnet';
const NEAR_LOCAL_NETWORK_ID = 'default';
const NEAR_LOCAL_URL = 'https://rpc.testnet.near.org';
const NEAR_EXPLORER_URL = 'https://explorer.testnet.near.org';
const NEAR_LOCAL_EVM = 'evm.demo.testnet';

function NearTestNetProvider(keyStore) {
  return new NearProvider({
    nodeUrl: NEAR_LOCAL_URL,
    keyStore,
    networkId: NEAR_LOCAL_NETWORK_ID,
    masterAccountId: NEAR_LOCAL_ACCOUNT_ID,
    evmAccountId: NEAR_LOCAL_EVM,
  });
}

// Import babel for ES6 support
require('babel-register')({
  presets: [
    ['env', {
      'targets': {
        'node': '8.0'
      }
    }]
  ]
})

require('babel-polyfill')

module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // to customize your Truffle configuration!
  networks: {
    nearTestnet: {
      network_id: "*",
      skipDryRun: true,
      provider: () => NearTestNetProvider(),
    },
    development: {
      host: '127.0.0.1',
      port: 8545,
      network_id: '*' // Match any network id
    },
    test_local: {
      host: '127.0.0.1',
      port: 8555,
      network_id: '*' // Match any network id
    },
    audius_private: {
      host: '127.0.0.1',
      port: 8000,
      network_id: 1353,
      gasPrice: 1000000000
    },
    poa_mainnet: {
      host: 'localhost',
      port: 8545,
      network_id: '99',
      gas: 8000000,
      gasPrice: 1000000000,
      skipDryRun: true
    },
    poa_sokol: {
      host: 'localhost',
      port: 8545,
      network_id: '77',
      gas: 8000000,
      gasPrice: 1000000000,
      skipDryRun: true
    }
  },
  mocha: {
    enableTimeouts: false
  }
}
