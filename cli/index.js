#! /usr/bin/env node
const commands = {
  prerelease: require('./github-prerelease-cli'),
  'release-stats': require('./github-release-stats-cli'),
  semver: require('./github-semver-cli'),
  'tester-feedback': require('./github-tester-feedback-cli')
}
const argv = require('minimist')(process.argv.slice(2))

const githubUrlRegex = /^git@github\.com:(.+)\.git$/

function getRepo () {
  const git = require('simple-git')(process.cwd())
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

function showUsage () {
  console.log('USAGE:')
  console.log(`github-cli semver --repo org/repo [ --version v1.0.0 ] [ --bump major|minor|patch ]`)
  console.log(`github-cli prerelease --repo org/repo --version v1.0.0`)
  console.log(`github-cli release-stats --repo org/repo --version v1.0.0`)
  console.log(`github-cli tester-feedback --repo org/repo --version v1.0.0`)
  process.exit(-1)
}

if (!argv._ || argv._.length !== 1) showUsage()

const command = commands[argv._[0]]
if (!command) showUsage()

if (argv.repo) {
  command(argv)
} else {
  getRepo()
    .then((repo) => {
      command(Object.assign({}, argv, { repo }))
    })
    .catch((err) => console.error(err))
}
