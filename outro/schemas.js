import Joi from 'joi-browser'

// https://github.com/sindresorhus/semver-regex
const semverRegex = /\bv?(?:0|[1-9]\d*)\.(?:0|[1-9]\d*)\.(?:0|[1-9]\d*)(?:-[\da-z\-]+(?:\.[\da-z\-]+)*)?(?:\+[\da-z\-]+(?:\.[\da-z\-]+)*)?\b/ig

const semverErrorMessage = {
  language: {
    string: {
      regex: {
        base: 'Please use a valid semver format i.e. 1.2.3 or v1.2.3-beta'
      }
    }
  }
}

export const preReleaseFormSchema = {
  masterRepo: Joi.string().required().label('Name of master repository'),
  repos: Joi.array().items(Joi.string()).label('Optional other repos'),
  emails: Joi.array().items(Joi.string().email()).min(1).required().label('Tester\'s emails'),
  deployment: Joi.string().uri().required().label('Deployment URL'),
  workplan: Joi.string().uri().required().label('Workplan URL'),
  version: Joi.string().regex(semverRegex).label('Version number').options(semverErrorMessage),
  instructions: Joi.string().allow('').allow(null).label('Instructions for testers')
}

export const releaseFormSchema = {
  masterRepo: Joi.string().required().label('Name of master repository'),
  repos: Joi.array().items(Joi.string()).label('Optional other repos'),
  deployment: Joi.string().uri().required().label('Deployment URL'),
  workplan: Joi.string().uri().required().label('Workplan URL'),
  version: Joi.string().regex(semverRegex).label('Version number').options(semverErrorMessage)
}
