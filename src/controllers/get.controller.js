import { Router as ExpressRouter } from 'express';
import { getRoles, getValidUsername } from '../services/get.service.js';
const Router = ExpressRouter();

Router.get('/roles', getRoles);

Router.get('/check_valid_username/:username', getValidUsername);

export default Router;