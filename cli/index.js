#! /usr/bin/env node
const yargs = require('yargs')
const getArguments = require('./get-arguments')
const commands = {
  prerelease: require('./github-prerelease-cli'),
  'release-stats': require('./github-release-stats-cli'),
  semver: require('./github-semver-cli'),
  'tester-feedback': require('./github-tester-feedback-cli')
}

yargs
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
    const required = ['repo']
    if (!args.version) required.push('bump')
    const allArgs = await getArguments(args, required)
    commands.semver(allArgs)
  })
  .argv

function showUsage () {
  console.log('USAGE:')
  console.log(`github-cli semver --repo org/repo [ --version v1.0.0 ] [ --bump major|minor|patch ]`)
  console.log(`github-cli prerelease --repo org/repo --version v1.0.0`)
  console.log(`github-cli release-stats --repo org/repo --version v1.0.0`)
  console.log(`github-cli tester-feedback --repo org/repo --version v1.0.0`)
  process.exit(-1)
}
