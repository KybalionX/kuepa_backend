import { Router as ExpressRouter } from 'express';
import { login, register, validateToken } from '../services/auth.service.js';
const Router = ExpressRouter();

Router.post('/validate_token', validateToken);

Router.post('/register', register);

Router.post('/login', login);

export default Router;
