/*
github-taggedCommits-cli

Make sure you've got a .githubrc in the project root with your username and an personal access token.

USAGE:
  node example/github-taggedCommits-stats-cli.js --repo olizilla/tags --version v2.0.0

*/
const {getPullRequests} = require('../lib/github-interface')
const argv = require('minimist')(process.argv.slice(2))

function usage () {
  console.log(`USAGE: node example/github-pulls-cli.js --repo org/repo --version v2.0.0`)
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

getTaggedCommits({repos, version})
  .then(() => {
    console.log(`ok pulls done`)
  })
  .catch((err) => {
    console.error(err)
    process.exit(-1)
  })
