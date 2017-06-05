/*
github-release-stats-cli

Make sure you've got a github.rc in the project root with your username and an api key.

USAGE:
  node example/github-release-stats-cli.js --repo olizilla/tags --version v2.0.0

*/
const {releaseStats} = require('../lib/github-interface')
const argv = require('minimist')(process.argv.slice(2))

function usage () {
  console.log(`USAGE: node example/github-release-stats-cli.js --repo org/repo --version v2.0.0`)
}

const { repo, version } = argv
if (!repo || !version) {
  usage()
  process.exit(-1)
}

let repos = repo
if (!Array.isArray(repos)) {
  repos = [repo]
}

releaseStats({repos, version})
  .then(({ commits, additions, deletions }) => {
    console.log(`This release saw ${commits} commits, with ${additions} lines of code added and ${deletions} removed across all the supplied repos`)
  })
  .catch((err) => {
    console.error(err)
    process.exit(-1)
  })
