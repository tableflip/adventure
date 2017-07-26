const git = require('simple-git')(process.cwd())

const githubUrlRegex = /^git@github\.com:(.+)\.git$/

async function getRepo () {
  return new Promise((resolve, reject) => {
    git.getRemotes(true, (err, remotes) => {
      if (err) return reject(err)

      const origin = remotes.find(({ name }) => name === 'origin')
      if (!origin) return reject('No origin specified on repo')

      const decomposed = githubUrlRegex.exec(origin.refs.fetch)
      resolve(decomposed[1])
    })
  })
}

module.exports = {
  getRepo
}
