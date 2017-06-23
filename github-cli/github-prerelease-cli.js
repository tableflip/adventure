/*
github-prerelease-cli

Make sure you've got a .githubrc in the project root with your username and an personal access token.

USAGE:
  github-cli prerelease --repo olizilla/tags --version v2.0.0 --message "good one"

*/

module.exports = function (argv) {
  const arrayify = require('arrayify')
  const semverRegex = require('semver-regex')
  const {prerelease} = require('../lib/github-interface')

  function usage () {
    console.log(`USAGE: github-cli prerelease --repo org/repo --version v2.0.0 --message 'Best release ever'`)
  }

  let { repo, version, message } = argv
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
      console.error(err)
      process.exit(-1)
    })
}
