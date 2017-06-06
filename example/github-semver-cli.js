/*
github-semver-cli

Make sure you've got a github.rc in the project root with your username and an api key.

USAGE:
  node example/github-semver-cli.js --repo olizilla/tags

*/
const {getVersion, bumpVersion, setVersion} = require('../lib/github-interface')
const argv = require('minimist')(process.argv.slice(2))

function usage () {
  console.log(`USAGE: node example/github-semver.js --repo org/repo`)
}

const { repo, version, message } = argv
if (!repo || !version || !message) {
  usage()
  process.exit(-1)
}

getVersion({ repo })
  .then((version) => {
    console.log(`Current version is ${version}`)
    const newVersion = bumpVersion({ version, releaseType: 'patch' })
    console.log(`Bumping to version ${newVersion}`)
    return setVersion({ repo, version: newVersion })
  })
  .then(() => {
    console.log('Version successfully bumped')
    const url = `https://github.com/${repo}/blob/master/package.json`
    console.log(`Check it out: ${url}`)
  })
  .catch((err) => {
    console.error(err)
    process.exit(-1)
  })
