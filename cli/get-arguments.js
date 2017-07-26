const inquirer = require('inquirer')
const semverRegex = require('semver-regex')
const { getRepo } = require('../lib/git-utils')
const { getVersion, getTags } = require('../lib/github-interface')

const makeFields = (args) => ({
  repos: {
    name: 'repos',
    type: 'input',
    message: 'Repo(s) (comma-delimited):',
    filter: (response) => {
      return response.split(',').map((repo) => repo.trim())
    },
    default: args.localRepo
  },
  version: {
    name: 'version',
    type: 'input',
    message: 'Version number (use semver):',
    default: args.currentVersion,
    validate: (version) => {
      return semverRegex().test(version)
        ? true
        : 'version must be a valid semver'
    },
    filter: (version) => {
      return (version[0] === 'v') 
        ? version
        : `v${version}`      
    }
  },
  tag: {
    name: 'tag',
    type: 'input',
    message: 'Release tag:',
    default: args.latestTag
  },
  bump: {
    name: 'bump',
    type: 'list',
    choices: ['major', 'minor', 'patch'],
    message: 'Bump type:'
  },
  message: {
    name: 'message',
    type: 'input',
    message: 'Release message:'
  }
})

async function getArguments (args, required) {
  function fetchRepos (args) {
    return (required.includes('repos') && !args.repos)
      ? getRepo()
        .then((localRepo) => Object.assign({}, args, { localRepo }))
        .then((args) => getArgument(args, 'repos'))
        .catch(() => getArgument(args, 'repos'))
      : Promise.resolve(args)
  }

  function fetchTag (args) {
    return (required.includes('tag') && !args.tag)
      ? getTags({ repo: args.repos[0] })
        .then((tags) => Object.assign({}, args, { latestTag: tags[0] }))
        .then((args) => getArgument(args, 'tag'))
        .catch((err) => { console.log(err); return getArgument(args, 'tag') })
      : Promise.resolve(args)
  }

  function fetchVersion (args) {
    return getVersion({ repo: args.repos[0] })
      .then((currentVersion) => Object.assign({}, args, { currentVersion }))
      .catch((err) => args)
  }

  args = await fetchRepos(args)
  args = await fetchTag(args)
  args = await fetchVersion(args)

  return required.reduce((promise, argument) => {
      return promise.then((args) => getArgument(args, argument))
    }, Promise.resolve(args))
    .catch((err) => console.error(err))
}

function getArgument (args, argument) {
  if (args[argument]) return args
  const question = makeFields(args)[argument]

  if (!question) throw new Error(`No question config for field ${argument}`)
  return inquirer.prompt([question]).then((answers) => {
    return Object.assign({}, args, answers)
  })
}

module.exports = getArguments
