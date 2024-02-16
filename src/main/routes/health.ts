import axios from 'axios';
import config from 'config';
import { Application } from 'express';

const healthcheck = require('@hmcts/nodejs-healthcheck');
const recipesUrl = config.get('backendUrl');
export default function (app: Application): void {
  const healthCheckConfig = {
    checks: {
      backendCheck: healthcheck.raw(async () => {
        try {
          const response = await axios.get(`${recipesUrl}/health/readiness`);
          return response.status === 200 ? backend.up() : backend.down();
        } catch (error) {
          return backend.down();
        }
      }),
    },
  };
  healthcheck.addTo(app, healthCheckConfig);
}
