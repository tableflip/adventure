/*
github-prerelease-cli

Make sure you've got a .githubrc in the project root with your username and an personal access token.

USAGE:
  adventure-cli prerelease --repo olizilla/tags --version v2.0.0 --message "good one"

*/

const arrayify = require('arrayify')
const Text = require('prompt-text')
const semverRegex = require('semver-regex')

module.exports = async function (argv) {
  const {getVersion, prerelease} = require('../lib/github-interface')

  function usage () {
    console.log(`USAGE: github-cli prerelease [ --repo org/repo ] [ --version v2.0.0 ] [ --message 'Best release ever' ]`)
  }

  let { repo, version, message } = argv

  if (!version) {
    let currentVersion
    try {
      currentVersion = await getVersion({ repo })
    } catch (err) {
      currentVersion = null
    }

    const text = new Text({
      name: 'version',
      message: `Version to release [${currentVersion || 'unknown'}]`
    })
    version = await text.run()
    if (!version) version = currentVersion
    if (!version) {
      console.error('Cannot infer version from repo - you need to specify a version to release')
      process.exit(1)
    }
  }

  if (!message) {
    const text = new Text({
      name: 'message',
      message: 'Release message'
    })
    message = await text.run()
    if (!message) {
      console.error('You must supply a release message')
      process.exit(1)
    }
  }

  if (!repo || !version || !message) {
    usage()
    process.exit(-1)
  }

  if (!semverRegex().test(version)) throw new Error('version must be a valid semver')
  if (version[0] !== 'v') version = `v${version}`

  const repos = arrayify(repo)

  prerelease({repos, version, message})
    .then(() => {
      const url = `https://github.com/${repos[0]}/releases/tag/${version}`
      console.log(`Released ${repos[0]}.`)
      console.log(`Check it out: ${url}`)
    })
    .catch((err) => {
      console.error(err.message)
      process.exit(-1)
    })
}
