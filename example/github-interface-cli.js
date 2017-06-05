/*
github-interface-cli

Make sure you've got a github.rc in the project root with your username and an api key.

USAGE:
  node example/github-interface-cli.js --repo olizilla/tags --version v2.0.0 --message "good one"

*/
const {prerelease} = require('../lib/github-interface')
const argv = require('minimist')(process.argv.slice(2))

function usage () {
  console.log(`USAGE: node github-interface.js --repo org/repo --version v2.0.0 --message 'Best releae ever'`)
}

const { repo, version, message } = argv
if (!repo || !version || !message) {
  usage()
  process.exit(-1)
}

let repos = repo
if (!Array.isArray(repos)) {
  repos = [repo]
}

prerelease({repos, version, message})
  .then(() => {
    const url = `https://github.com/${repos[0]}/releases/tag/${version}`
    console.log(`Released ${repos[0]}.`)
    console.log(`Check it out: ${url}`)
  })
  .catch((err) => {
    console.error(e)
    process.exit(-1)
  })
