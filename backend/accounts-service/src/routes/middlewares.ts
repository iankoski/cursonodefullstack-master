import {Router, Request, Response} from 'express';
import {accountSchema, accountUpdateSchema, loginSchema} from '../models/accountSchemas';
import commondsMiddleware from 'ms-commons/api/routes/middlewares';
import controllerCommons from 'ms-commons/api/controllers/controller';
import {Token} from 'ms-commons/api/auth';

/*Valida o schema recebido como parâmetro de entrada*/

/* Valida o formato da requisição, se é de fato uma account
 * que está sendo passada*/ 
function validateAccountSchema(req: Request, res: Response, next: any){
    return commondsMiddleware.validateSchema(accountSchema, req, res, next);
}

function validateUpdateAccountSchema(req: Request, res: Response, next: any){
    return commondsMiddleware.validateSchema(accountUpdateSchema, req, res, next);
}
/* Valida o formato da requisição, se é de fato um login que
 * está sendo enviado*/
function validateLoginSchema(req: Request, res: Response, next: any){
    return commondsMiddleware.validateSchema(loginSchema, req, res, next);
}

async function validateAuthentication(req: Request, res: Response, next: any){
    return commondsMiddleware.validateAuth(req, res, next);
}

function validateAuthorization(req: Request, res: Response, next: any){
    const accountId = parseInt(req.params.id);
    /*Testa se o parseInt converteu para de fato um número*/
    if(!accountId) return res.status(400).end();

    /* Compara o id que será atualizado/excluindo com o que está tentando manipular
     * somente quem pode manipular uma conta é o dono dela  */
    const token = controllerCommons.getToken(res) as Token;
    if (accountId !== token.accountId) return res.status(403).end();     
    
    next();
}

export {validateAccountSchema, validateAuthorization, validateLoginSchema, validateUpdateAccountSchema, validateAuthentication};