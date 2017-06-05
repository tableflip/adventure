const Joi = require('joi-browser')

module.exports = Joi.object({
  repoName: Joi.string().required(),
  emails: Joi.array().items(Joi.string().email()).min(1).required(),
  deployUrl: Joi.string().uri().required(),
  workplanUrl: Joi.string().uri().required(),
  release: Joi.number().required(),
  message: Joi.string()
})
