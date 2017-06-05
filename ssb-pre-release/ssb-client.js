const Fs = require('fs')
const Path = require('path')
const ssbClient = require('ssb-client')
const ssbKeys = require('ssb-keys')
const inject = require('ssb-config/inject')

function createClient (name, opts, cb) {
  if (!cb) {
    cb = opts
    opts = {}
  }

  const ssbConfig = inject(name || 'ssb-pre-release', opts)
  const keyPath = Path.join(ssbConfig.path, 'secret.key')

  ssbKeys.load(keyPath, (err, keys) => {
    if (err) return cb(err)

    const manifestPath = Path.join(ssbConfig.path, 'manifest.json')

    Fs.readFile(manifestPath, (err, json) => {
      if (err) return cb(err)

      try {
        ssbConfig.manifest = JSON.parse(json)
      } catch (err) {
        return cb(err)
      }

      ssbClient(keys, ssbConfig, (err, client) => cb(err, client))
    })
  })
}

module.exports = createClient
