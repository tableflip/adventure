/*
github-release-stats-cli

Make sure you've got a .githubrc in the project root with your username and an personal access token.

USAGE:
  adventure-cli release-stats --repo olizilla/tags --version v2.0.0

*/

const {releaseStats} = require('../lib/github-interface')

module.exports = function (argv) {
  function usage () {
    console.log(`USAGE: github-cli release-stats [ --repo org/repo ] --version v2.0.0`)
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
    .then(({ commits, additions, deletions, files }) => {
      console.log(`This release saw ${commits} commits, with ${additions} lines of code added and ${deletions} removed in ${files} files across all the supplied repos`)
    })
    .catch((err) => {
      console.error(err)
      process.exit(-1)
    })
}
