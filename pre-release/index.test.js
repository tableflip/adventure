const micro = require('micro')
const formurlencoded = require('form-urlencoded')
const test = require('ava')
const listen = require('test-listen')
const faker = require('faker')
const request = require('request-promise')
const fs = require('fs')
const validate = require('micro-joi')
const service = require('./index.js')
const parse = require('urlencoded-body-parser')

const schema = require('./schema')
const html = fs.readFileSync('./index.html').toString()

function fakePayload (opts) {
  opts = opts || {}
  return Object.assign({
    repoName: faker.company.companyName(),
    emails: [faker.internet.email(), faker.internet.email()].join(','),
    deployUrl: faker.internet.url(),
    workplanUrl: faker.internet.url(),
    release: faker.random.number(),
    message: faker.lorem.paragraph()
  }, opts)
}

let srv, getUrl

test.beforeEach(function () {
  getUrl = fn => {
    srv = micro(fn)
    return listen(srv)
  }
})

test.afterEach(function () {
  srv.close()
})

test('Should be able to visit the web form', async t => {
  const url = await getUrl(service)
  const result = await request(url)
  t.is(result, html)
})

test('everything goes well, no validation errors', async t => {
  const url = await getUrl(service)
  const payload = fakePayload()
  const res = await request.post({
    uri: url,
    body: formurlencoded(payload),
    resolveWithFullResponse: true
  })
  t.is(res.statusCode, 201)
  payload.release = payload.release.toString()
  t.deepEqual(payload, JSON.parse(res.body))
})

test('error: schema validation', async t => {
  const url = await getUrl(service)
  const payload = fakePayload({ workplanUrl: 'test' })
  try {
    await request.post({
      uri: url,
      body: formurlencoded(payload),
      resolveWithFullResponse: true
    })
  } catch (err) {
    t.is(err.statusCode, 400)
  }
})
