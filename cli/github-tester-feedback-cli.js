const { getTesterFeedback } = require('../lib/github-interface')

module.exports = function ({ repo, tag }) {
  getTesterFeedback({ repo, tag })
    .then((issues) => {
      const bugs = issues.filter((i) => {
        return i.labels.some((l) => l.name === 'tester bug')
      })

      const comments = issues.filter((i) => {
        return i.labels.some((l) => l.name === 'tester comment')
      })

      console.log(`# Tester feedback for ${repo}#${tag}:\n`)

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
