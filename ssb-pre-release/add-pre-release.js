function addPreRelease (client, data, cb) {
  client.publish(Object.assign(data, { type: 'add-pre-release' }), cb)
}

module.exports = addPreRelease
