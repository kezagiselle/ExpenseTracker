import express from 'express';
const authRouter= express.Router();
import authorization from '../middleware/Authorization.js';

authRouter.post('/admin', authorization.roleAuthorization);

export default authRouter;