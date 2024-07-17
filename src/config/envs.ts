import 'dotenv/config';
import * as joi from 'joi';

interface EnvVars {
    PORT: string;
    PRODUCT_MICROSERVICE_HOST: string;
    PRODUCT_MICROSERVICE_PORT: number;
    ORDER_MICROSERVICE_HOST: string;
    ORDER_MICROSERVICE_PORT: number;
}

const envsSchema = joi
    .object({
        PORT: joi.number().required(),
        PRODUCT_MICROSERVICE_HOST: joi.string().required(),
        PRODUCT_MICROSERVICE_PORT: joi.number().required(),
        ORDER_MICROSERVICE_HOST: joi.string().required(),
        ORDER_MICROSERVICE_PORT: joi.number().required(),
    })
    .unknown(true);

const { error, value } = envsSchema.validate(process.env);

if (error) {
    throw new Error(`Config validation error: ${error.message}`);
}

const envsVars: EnvVars = value;

export const envs = {
    port: envsVars.PORT,
    productMicroserviceHost: envsVars.PRODUCT_MICROSERVICE_HOST,
    productMicroservicePort: envsVars.PRODUCT_MICROSERVICE_PORT,
    orderMicroserviceHost: envsVars.ORDER_MICROSERVICE_HOST,
    orderMicroservicePort: envsVars.ORDER_MICROSERVICE_PORT,
};
