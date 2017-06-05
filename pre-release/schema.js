const Joi = require('joi-browser')

module.exports = Joi.object({
  repoName: Joi.string().required(),
  emails: Joi.string().required(),
  deployUrl: Joi.string().uri().required(),
  workplanUrl: Joi.string().uri().required(),
  release: Joi.number().required(),
  message: Joi.string()
})
