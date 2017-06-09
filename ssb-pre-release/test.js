const test = require('tape')
const pull = require('pull-stream')
const addPreRelease = require('./add-pre-release')
const ssbKeys = require('ssb-keys')
const createSbotServer = require('./ssb-server')

const APP_NAME = 'ssb-pre-release-test'

test('should be able to add pre release message', (t) => {
  t.plan(4)

  createSbotServer(APP_NAME, { temp: true, keys: ssbKeys.generate() }, (err, server) => {
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

test('should be able to receive message on following pub', (t) => {
  t.plan(8)

  createSbotServer(APP_NAME, { temp: true, keys: ssbKeys.generate(), allowPrivate: true }, (err, primary) => {
    t.ifError(err, 'server started')

    createSbotServer(APP_NAME, { temp: true, keys: ssbKeys.generate() }, (err, secondary) => {
      t.ifError(err, 'follower started')

      primary.invite.create(1, (err, invite) => {
        t.ifError(err, 'invite created')

        secondary.invite.accept(invite, (err, res) => {
          t.ifError(err, 'invite accepted')

          const releaseData = { version: '1.0.1' }

          // Setup the log stream to receive 'add-pre-release' messages, on the secondary
          pull(
            secondary.messagesByType({ type: 'add-pre-release', live: true, gt: Date.now() }),
            pull.drain((message) => {
              t.equal(message.value.content.version, releaseData.version)
              primary.close((err) => {
                t.ifError(err, 'primary stopped')
                secondary.close((err) => {
                  t.ifError(err, 'secondary stopped')
                  t.end()
                })
              })
            })
          )

          // Publish the add-pre-release message to the primary
          addPreRelease(primary, releaseData, (err) => {
            t.ifError(err, 'added pre release message')
          })
        })
      })
    })
  })
})
