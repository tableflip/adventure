const commands = {
  prerelease: require('./github-prerelease-cli'),
  'release-stats': require('./github-release-stats-cli'),
  semver: require('./github-semver-cli'),
  'tester-feedback': require('./github-tester-feedback-cli')
}
const argv = require('minimist')(process.argv.slice(2))

function showUsage () {
  console.log('USAGE:')
  console.log(`github-cli semver --repo org/repo [ --version v1.0.0 ] [ --bump major|minor|patch ]`)
  console.log(`github-cli prerelease --repo org/repo --version v1.0.0`)
  console.log(`github-cli release-stats --repo org/repo --version v1.0.0`)
  console.log(`github-cli tester-feedback --repo org/repo --version v1.0.0`)
  process.exit(0)
}

if (!argv._ || argv._.length !== 1) showUsage()

const command = commands(argv._[0])
if (!command) showUsage()

command(argv)
