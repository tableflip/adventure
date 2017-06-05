const Fs = require('fs')
const Path = require('path')
const scuttlebot = require('scuttlebot')
const ssbKeys = require('ssb-keys')
const inject = require('ssb-config/inject')

function createServer (name, opts, cb) {
  if (!cb) {
    cb = opts
    opts = {}
  }

  const ssbConfig = inject(name || 'ssb-pre-release', opts)
  const keyPath = Path.join(ssbConfig.path, 'secret.key')

  ssbKeys.loadOrCreate(keyPath, (err, keys) => {
    if (err) return cb(err)

    const server = scuttlebot(Object.assign({ keys }, ssbConfig))
    const manifest = server.getManifest()
    const manifestPath = Path.join(ssbConfig.path, 'manifest.json')

    Fs.writeFile(manifestPath, JSON.stringify(manifest), (err) => cb(err, server))
  })
}

module.exports = createServer
