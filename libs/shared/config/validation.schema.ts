import * as joi from 'Joi';

export const validationSchema = joi.object({
  // API-GATEWAY CONFIGURATION
  API_GATEWAY_PORT: joi.number().port().default(3000).required(),
  JWT_SECRET: joi.string().required(),
  JWT_EXPIRATION_TIME: joi.string().pattern(/^\d+\s*(s|m|h|d|w|y)$/i).required(),

  // REPORT CONFIGURATION
  REPORT_PORT: joi.number().port().default(3003).required(),

  // TIMELOG CONFIGURATION
  TIMELOG_PORT: joi.number().port().default(3002).required(),

  TIMELOG_DB_HOST: joi.string().hostname().default('localhost').required(),
  TIMELOG_DB_PORT: joi.number().port().default(5432).required(),
  TIMELOG_DB_USERNAME: joi.string().required(),
  TIMELOG_DB_PASSWORD: joi.string().required(),
  TIMELOG_DB_NAME: joi.string().required(),

  // USERS CONFIGURATION
  USER_PORT: joi.number().port().default(3001).required(),

  USER_DB_HOST: joi.string().hostname().default('localhost').required(),
  USER_DB_PORT: joi.number().port().default(5432).required(),
  USER_DB_USERNAME: joi.string().required(),
  USER_DB_PASSWORD: joi.string().required(),
  USER_DB_NAME: joi.string().required(),
});
