const { releaseStats } = require('../lib/github-interface')

module.exports = function ({ repos, tag }) {
  releaseStats({ repos, tag })
    .then(({ commits, additions, deletions, files }) => {
      console.log(`This release saw ${commits} commits, with ${additions} lines of code added and ${deletions} removed in ${files} files across all the supplied repos`)
    })
    .catch((err) => {
      console.error(err)
      process.exit(-1)
    })
}
