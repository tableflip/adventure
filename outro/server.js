const { createServer } = require('http')
const { parse } = require('url')
const next = require('next')
const atob = require('atob')
const { prerelease } = require('../lib/github-interface')

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

function handlePost (req, res, parsedUrl, formdata) {
  const formData = JSON.parse(atob(formdata))
  const { masterRepo, repos = [], version, instructions } = formData
  repos.unshift(masterRepo)
  prerelease({ repos, version, message: instructions })
  handle(req, res, parsedUrl)
}

app.prepare().then(() => {
  createServer((req, res) => {
    const parsedUrl = parse(req.url, true)
    const { query: { formdata } } = parsedUrl
    if (formdata) return handlePost(req, res, parsedUrl, formdata)
    handle(req, res, parsedUrl)
  })
  .listen(3000, (err) => {
    if (err) throw err
    console.log('> Ready on http://localhost:3000')
  })
})
