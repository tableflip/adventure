const inquirer = require('inquirer')
const { getRepo } = require('../lib/git-utils')
const { getVersion } = require('../lib/github-interface')

const makeFields = (args) => ({
  repos: {
    name: 'repos',
    type: 'input',
    message: 'Please specify repo(s) (comma-delimited):',
    filter: (response) => {
      return response.split(',').map((repo) => repo.trim())
    },
    default: args.localRepo
  },
  version: {
    name: 'version',
    type: 'input',
    message: 'Version number (use semver):'
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

function getArguments (args, required) {
  const getRepos = (required.includes('repos') && !args.repos)
    ? getRepo()
      .then((localRepo) => Object.assign({}, args, { localRepo }))
      .then((args) => getArgument(args, 'repos'))
      .catch(() => getArgument(args, 'repos'))
    : Promise.resolve(args)

  required = required.filter((arg) => arg !== 'repos')

  return getRepos
    .then((args) => {
      return getVersion({ repo: args.repos[0] })
        .then((currentVersion) => Object.assign({}, args, { currentVersion }))
        .catch((err) => { console.log(err); return args })
    })
    .then((args) => {
      return required.reduce((promise, argument) => {
        return promise.then((args) => getArgument(args, argument))
      }, Promise.resolve(args))
    })
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
