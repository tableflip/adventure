const micro = require('micro')
const parse = require('urlencoded-body-parser')
const Joi = require('joi-browser')
const fs = require('fs')
const path = require('path')

const { send } = micro
const schema = require('./schema')
const html = fs.readFileSync(path.join(__dirname, './index.html'))

const service = async (req, res) => {
  if (req.method === 'POST') {
    const body = await parse(req)
    const error = Joi.validate(body, schema).error

    if (error) {
      send(res, 400, JSON.stringify(error.details))
    } else {
      console.log(body)
      // do more things with the data i.e. explode the string of comma separated email addresses
      send(res, 201, body)
    }
  } else {
    res.end(html.toString())
  }
}

const server = micro(service)

server.listen()

module.exports = service
