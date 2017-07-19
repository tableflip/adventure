/*
github-semver-cli

Make sure you've got a .githubrc in the project root with your username and an api key.

USAGE:
  adventure-cli semver --repo olizilla/tags --bump major
  adventure-cli semver --repo olizilla/tags --version 2.0.0
*/
const Text = require('prompt-text')

const {getVersion, bumpVersion, setVersion} = require('../lib/github-interface')

module.exports = async function (argv) {
  let { repo, bump, version } = argv

  if (!version && !bump) {
    let currentVersion
    try {
      currentVersion = await getVersion({ repo })
    } catch (err) {
      currentVersion = null
    }

    const text = new Text({
      name: 'version',
      message: `Version to release [current version is ${currentVersion || 'unknown'}]`
    })
    version = await text.run()
    if (!version) version = currentVersion
    if (!version) {
      console.error('Cannot infer version from repo - you need to specify a version to release')
      process.exit(1)
    }
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
}
