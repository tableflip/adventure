const micro = require('micro')
const parse = require('urlencoded-body-parser')
const validation = require('micro-joi')
const Joi = require('joi-browser')
const fs = require('fs')
const path = require('path')

const { send } = micro
const schema = require('./schema')
const validator = validation(schema)
const html = fs.readFileSync(path.join(__dirname, './index.html'))

const service = async (req, res) => {
  if (req.method === 'POST') {
    const body = await parse(req)
    const error = Joi.validate(body, schema).error
    if (error) {
      send(res, 400, JSON.stringify(error.details))
      return
    }
    send(res, 201, body)
  } else {
    res.end(html.toString())
  }
}

const server = micro(validator(service))

server.listen()

module.exports = service
