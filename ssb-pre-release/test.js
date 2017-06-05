const test = require('tape')
const pull = require('pull-stream')
const createSbotServer = require('./ssb-server')
const addPreRelease = require('./add-pre-release')

test('should be able to add pre release message', (t) => {
  t.plan(4)

  const APP_NAME = 'ssb-pre-release-test'

  createSbotServer(APP_NAME, (err, server) => {
    t.ifError(err, 'server started')

    const releaseData = { version: '1.0.1' }

    // Setup the log stream to receive 'add-pre-release' messages
    pull(
      server.messagesByType({ type: 'add-pre-release', live: true, gt: Date.now() }),
      pull.drain((message) => {
        t.equal(message.value.content.version, releaseData.version)
        server.close((err) => {
          t.ifError(err, 'server stopped')
          t.end()
        })
      })
    )

    // Publish the add-pre-release message
    addPreRelease(server, releaseData, (err) => {
      t.ifError(err, 'added pre release message')
    })
  })
})
