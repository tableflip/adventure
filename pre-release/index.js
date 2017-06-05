const micro = require('micro')
const send = micro.send
const json = micro.json
const fs = require('fs')
const path = require('path')
const html = fs.readFileSync(path.join(__dirname, './index.html'))

const service = async (req, res) => {
  if (req.method === 'POST') {
    const payload = await json(req)
    send(res, 201, payload)
  } else {
    res.end(html.toString())
  }
}

const server = micro(service)

server.listen(3000)

module.exports = service
