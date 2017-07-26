module.exports = async function ({ repos, version, message }) {
  const { prerelease } = require('../lib/github-interface')

  prerelease({ repos, version, message })
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
