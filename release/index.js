const fs = require('fs')
const {send} = require('micro')
const html = fs.readFileSync(__dirname + '/index.html')

module.exports = async (req, res) => {
  if (req.method === 'POST') {
    send(res, 200, {"post": "TODO"})
  } else {
    res.end(html)
  }
}
