/*
github-semver-cli

Make sure you've got a .githubrc in the project root with your username and an api key.

USAGE:
  node example/github-semver-cli.js --repo olizilla/tags

*/
const {getVersion, bumpVersion, setVersion} = require('../lib/github-interface')
const argv = require('minimist')(process.argv.slice(2))

function usage () {
  console.log('USAGE:')
  console.log('  node example/github-semver-cli.js --repo org/repo --bump major|minor|patch')
  console.log('  node example/github-semver-cli.js --repo org/repo --version 2.0.0')
}

const { repo, bump, version } = argv
if (!repo || (!bump || !version)) {
  usage()
  process.exit(-1)
}

if (version) {
  setVersion({ repo, version })
    .then(() => {
      console.log('Version successfully updated')
      const url = `https://github.com/${repo}/blob/master/package.json`
      console.log(`Check it out: ${url}`)
    })
    .catch((err) => {
      console.error(err)
      process.exit(-1)
    })
} else {
  getVersion({ repo })
    .then((version) => {
      console.log(`Current version is ${version}`)
      const newVersion = bumpVersion({ version, releaseType: bump })
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
}
