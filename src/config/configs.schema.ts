import * as Joi from 'joi';


export default Joi.object({
    NODE_ENV: Joi.string()
    .valid('development', 'production', 'test', 'provision')
    .default('development'),

    MONGO_HOST: Joi.string().required(),
    MONGO_PORT: Joi.number().required(),
    MONGO_DB: Joi.string().required(),

    RABBITMQ_HOST: Joi.string().required(),
    RABBITMQ_PORT: Joi.number().required(),

    JWT_SECRET_KEY: Joi.string().required(),
})
