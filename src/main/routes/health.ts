import axios from 'axios';
import config from 'config';
import { Application } from 'express';

const recipesUrl = config.get('backendUrl');

export default function (app: Application): void {
  app.get('/health/liveness', async (req, res) => {
    try {
      const response = await axios.get(`${recipesUrl}/health/readiness`);
      if (response.status === 200) {
        res.status(200).json({ status: 'Backend.UP' });
      } else {
        res.status(500).json({ status: 'Backend.DOWN' });
      }
    } catch (error) {
      res.status(500).json({ status: 'Backend.DOWN' });
    }
  });
}
