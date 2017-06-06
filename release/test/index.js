const test = require('ava')
const micro = require('micro')
const listen = require('test-listen')
const request = require('request-promise')
const fs = require('fs')
const fn = require('../index')

test('POST', async t => {
  const service = micro(fn)
  const url = await listen(service)
  const body = await request.post(url)
  t.deepEqual(JSON.parse(body).post, 'TODO')
})

test('GET', async t => {
  const service = micro(fn)
  const url = await listen(service)
  const body = await request(url)
  const html = fs.readFileSync(__dirname + '/../index.html').toString()
  t.is(body, html)
})
