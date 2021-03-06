const bunyan = require('bunyan')
const shortid = require('shortid')

const config = require('./config')

const logLevel = config.get('logLevel') || 'info'
const logger = bunyan.createLogger({
  name: 'audius_creator_node',
  streams: [
    {
      level: logLevel,
      stream: process.stdout
    }
  ]
})
logger.info('Loglevel set to:', logLevel)

const excludedRoutes = [ '/health_check' ]
function requestNotExcludedFromLogging (url) {
  return (excludedRoutes.indexOf(url) === -1)
}

function getRequestLoggingContext (req) {
  req.startTime = process.hrtime()
  const requestID = shortid.generate()
  const urlParts = req.url.split('?')
  return {
    requestID: requestID,
    requestMethod: req.method,
    requestHostname: req.hostname,
    requestUrl: urlParts[0],
    requestQueryParams: urlParts.length > 1 ? urlParts[1] : undefined,
    requestWallet: req.get('user-wallet-addr'),
    requestBlockchainUserId: req.get('user-id')
  }
}

function loggingMiddleware (req, res, next) {
  const requestID = shortid.generate()
  res.set('CN-Request-ID', requestID)

  req.logContext = getRequestLoggingContext(req)
  req.logger = logger.child(req.logContext)

  if (requestNotExcludedFromLogging(req.originalUrl)) {
    req.logger.debug('Begin processing request')
  }
  next()
}

module.exports = { logger, loggingMiddleware, requestNotExcludedFromLogging, getRequestLoggingContext }
