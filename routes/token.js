import tokenControllers from "../controllers/token.js";
import express from "express";
const tokenRouter = express.Router();

tokenRouter.post('/addToken', tokenControllers.addToken);
tokenRouter.get('/getById/:id', tokenControllers.findByUser);
tokenRouter.get('/getAll', tokenControllers.getAllTokens);
tokenRouter.delete('/delete/:id', tokenControllers.deleteToken);

export default tokenRouter;