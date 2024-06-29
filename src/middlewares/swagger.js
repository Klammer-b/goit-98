import createHttpError from 'http-errors';
import fs from 'node:fs';
import swaggerUi from 'swagger-ui-express';
import { SWAGGER_PATH } from '../constants/index.js';

export const swagger = () => {
  try {
    const swaggerDocument = JSON.parse(
      fs.readFileSync(SWAGGER_PATH).toString(),
    );
    return [...swaggerUi.serve, swaggerUi.setup(swaggerDocument)];
  } catch (err) {
    return (req, res, next) =>
      next(createHttpError(500, "Can't load swagger docs"));
  }
};
