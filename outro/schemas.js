import Joi from 'joi-browser'

export const preReleaseFormSchema = Joi.object({
  masterRepo: Joi.string().required(),
  repos: Joi.array().items(Joi.string()),
  testersEmails: Joi.array().items(Joi.string().email()).min(1).required(),
  deployment: Joi.string().uri().required(),
  workplan: Joi.string().uri().required(),
  version: Joi.number().required(),
  instructions: Joi.string()
})
