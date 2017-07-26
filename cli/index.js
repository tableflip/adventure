#! /usr/bin/env node
const yargs = require('yargs')
const arrayify = require('arrayify')
const getArguments = require('./get-arguments')
const commands = {
  prerelease: require('./github-prerelease-cli'),
  releaseStats: require('./github-release-stats-cli'),
  semver: require('./github-semver-cli'),
  testerFeedback: require('./github-tester-feedback-cli')
}

const args = yargs
  .usage('$0 <cmd> [args]')

  .command('semver', 'Update the remote package JSON with a new version', (yargs) => {
    yargs
      .option('repo', {
        describe: 'Repo in the format USER/REPO'
      })
      .option('version', {
        describe: 'New version'
      })
      .option('bump', {
        describe: 'Update to make [major/minor/patch]'
      })
  }, async (args) => {
    if (args.repo) args.repos = arrayify(args.repo)
    const required = ['repos']
    if (!args.version) required.push('bump')
    const allArgs = await getArguments(args, required)
    allArgs.repos.forEach((repo) => {
      commands.semver(Object.assign({}, allArgs, { repo }))
    })
  })

  .command('release-stats', 'Retrieves release stats for the given version', (yargs) => {
    yargs
      .option('repo', {
        describe: 'Repo in the format USER/REPO'
      })
      .option('tag', {
        describe: 'Tag of release for which to generate stats'
      })
  }, async (args) => {
    if (args.repo) args.repos = arrayify(args.repo)
    const required = ['repos', 'tag']
    const allArgs = await getArguments(args, required)
    commands.releaseStats(allArgs)
  })

  .command('prerelease', 'Tags and prereleases the supplied repos', (yargs) => {
    yargs
      .option('repo', {
        describe: 'Repo in the format USER/REPO'
      })      
      .option('version', {
        describe: 'Version to release'
      })
      .option('message', {
        describe: 'Release message'
      })
  }, async (args) => {
    if (args.repo) args.repos = arrayify(args.repo)
    const required = ['repos', 'version', 'message']
    const allArgs = await getArguments(args, required)
    commands.prerelease(allArgs)
  })

  .command('tester-feedback', 'Retrieves tester feedback for the given release', (yargs) => {
    yargs
      .option('repo', {
        describe: 'Repo in the format USER/REPO'
      })
      .option('tag', {
        describe: 'Tag of release for which to gather feedback'
      })
  }, async (args) => {
    if (args.repo) args.repos = arrayify(args.repo)    
    const required = ['repos', 'tag']
    const allArgs = await getArguments(args, required)
    allArgs.repo = allArgs.repos[0]
    commands.testerFeedback(allArgs)
  })

  .help()

  .argv

  if (!args._.length) {
    yargs.showHelp()
  }
