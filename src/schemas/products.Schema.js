import joi from 'joi'

export const productsSchema = joi.object({
    name: joi.string().required(),
    image: joi.string().uri().required(),
    price: joi.number().positive().required(),
    discount:joi.number().positive().min(0).max(100).required(),
    type:joi.string().required()
  });