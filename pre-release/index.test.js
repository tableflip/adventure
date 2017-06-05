const micro = require('micro')
const test = require('ava')
const listen = require('test-listen')
const request = require('request-promise')
const endpoint = require('./index.js')
const fs = require('fs')

const html = fs.readFileSync('./index.html').toString()

test('Should be able to visit the web form', async t => {
  const server = micro(endpoint)
  const url = await listen(server)
  const body = await request(url)
  t.is(body, html)
})
