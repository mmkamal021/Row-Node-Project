// dependence
const url = require('url')
const { StringDecoder } = require('string_decoder')
const routes = require('../routes')
const { notFoundHandler } = require('../handlers/routeHandlers/notFoundHandler')

// const handler
const handler = {}
handler.handlerReqRes = (req, res) => {
  // request handling
  // get the url and parse it
  const parsedUrl = url.parse(req.url, true)
  // console.log(parsedUrl)
  const path = parsedUrl.pathname
  // console.log(path)
  const trimemedPath = path.replace(/^\/+|\/+$/g, '')
  // console.log(trimemedPath)
  const method = req.method.toLowerCase()
  const queryStringObject = parsedUrl.query
  // console.log(queryStringObject)
  const headersObject = req.headers
  // console.log(headersObject)

  const requestProperties = {
    parsedUrl,
    path,
    trimemedPath,
    method,
    queryStringObject,
    headersObject,
  }

  // recomended way to decode Buffer
  const decoder = new StringDecoder('utf-8')
  let realData = ''

  const chosenHandler = routes[trimemedPath]
    ? routes[trimemedPath]
    : notFoundHandler

  chosenHandler(requestProperties, (statusCode, payload) => {
    statusCode = typeof statusCode === 'number' ? statusCode : 500
    payload = typeof payload === 'object' ? payload : {}

    const payloadString = JSON.stringify(payload)

    // return the final response

    res.writeHead(statusCode)
    res.end(payloadString)
  })

  req.on('data', (buffer) => {
    realData += decoder.write(buffer)
  })

  req.on('end', () => {
    realData += decoder.end()
    console.log(realData)
    // response handle
    res.end('Hello World')
  })
}

module.exports = handler
