/*
github-tester-feedback-cli

Make sure you've got a .githubrc in the project root with your username and an api key.

USAGE:
  adventure-cli tester-feedback --repo alanshaw/tester-feedback --version v1.0.0

*/

const { getTesterFeedback } = require('../lib/github-interface')

module.exports = function (argv) {
  function usage () {
    console.log(`USAGE: github-cli tester-feedback [ --repo org/repo ] --version v1.0.0`)
  }

  const { repo, version } = argv

  if (!repo || !version) {
    usage()
    process.exit(-1)
  }

  getTesterFeedback({ repo, version })
    .then((issues) => {
      const bugs = issues.filter((i) => {
        return i.labels.some((l) => l.name === 'tester bug')
      })

      const comments = issues.filter((i) => {
        return i.labels.some((l) => l.name === 'tester comment')
      })

      console.log(`# Tester feedback for ${repo}#${version}:\n`)

      console.log(`## ${bugs.length} bug(s) reported`)
      if (bugs.length) console.log('')
      bugs.forEach((b) => console.log(`  * ${b.title} (${b.state})`))

      console.log('')

      console.log(`## ${comments.length} comment(s)/suggestion(s)`)
      if (comments.length) console.log('')
      comments.forEach((c) => console.log(`  * ${c.title} (${c.state})`))

      console.log('')
    })
    .catch((err) => {
      console.error(err)
      process.exit(-1)
    })
}
