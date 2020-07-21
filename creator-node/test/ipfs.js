const ipfsClientLatest = require('ipfs-http-client-latest')
const ipfsLatest = ipfsClientLatest({ host: 'localhost', port: '5001', protocol: 'http' })

describe('test ipfs', function () {

  it.only('creates ipfs connection', async function () {
    console.log(await ipfsLatest.id())
  })
})
