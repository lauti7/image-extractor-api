import express from 'express';
import supertest from 'supertest';

const testServer = (router) => {
  const app = express();
  app.use(express.json());
  router(app);
  return supertest(app);
};

export default testServer;
