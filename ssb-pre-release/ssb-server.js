const scuttlebot = require('scuttlebot')
const ssbKeys = require('ssb-keys')
const inject = require('ssb-config/inject')

const createSbot = scuttlebot
  .use(require('scuttlebot/plugins/master'))
  .use(require('scuttlebot/plugins/invite'))
  .use(require('scuttlebot/plugins/friends'))
  .use(require('scuttlebot/plugins/gossip'))
  .use(require('scuttlebot/plugins/replicate'))
  .use(require('ssb-ws'))

function createServer (name, opts, cb) {
  if (!cb) {
    cb = opts
    opts = {}
  }

  const ssbConfig = inject(name || 'ssb-pre-release', opts)

  if (!opts.keyPath) {
    return setTimeout(() => cb(null, createSbot(opts)))
  }

  ssbKeys.loadOrCreate(opts.keyPath, (err, keys) => {
    if (err) return cb(err)
    ssbConfig.keys = keys
    cb(null, createSbot(ssbConfig))
  })
}

module.exports = createServer
