const { getVersion, bumpVersion, setVersion } = require('../lib/github-interface')

module.exports = async function ({ repo, bump, version }) {
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
