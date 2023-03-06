// dependencies
const http = require('http')

const { handlerReqRes } = require('./helpers/handleReqRes')

// app object - module scafolding
const app = {}

// configaration
app.config = {
  port: 3000,
}

// create server
app.createServer = () => {
  const server = http.createServer(app.handleReqRes)
  server.listen(app.config.port, () => {
    console.log(`listening to port: ${app.config.port}`)
  })
}

// handle Request Response
app.handleReqRes = handlerReqRes

// start the server
app.createServer()
