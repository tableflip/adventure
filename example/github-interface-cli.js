/*
github-interface-cli

Make sure you've got a .githubrc in the project root with your username and an personal access token.

USAGE:
  node example/github-interface-cli.js --repo olizilla/tags --version v2.0.0 --message "good one"

*/
const arrayify = require('arrayify')
const semverRegex = require('semver-regex')
const {prerelease} = require('../lib/github-interface')
const argv = require('minimist')(process.argv.slice(2))

function usage () {
  console.log(`USAGE: node example/github-interface-cli.js --repo org/repo --version v2.0.0 --message 'Best release ever'`)
}

const { repo, version, message } = argv
if (!repo || !version || !message) {
  usage()
  process.exit(-1)
}

if (!semverRegex().test(version)) throw new Error('version must be a valid semver')

repos = arrayify(repo)

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
