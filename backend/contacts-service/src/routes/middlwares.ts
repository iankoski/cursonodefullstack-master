import {Request, Response} from 'express';
import {contactSchema, contactUpdateSchema} from '../models/contactSchemas';
import commondsMiddleware from 'ms-commons/api/routes/middlewares';

/*Valida o schema recebido como parâmetro de entrada*/

/* Valida o formato da requisição, se é de fato um contact
 * que está sendo passada*/ 
function validateContactSchema(req: Request, res: Response, next: any){
    return commondsMiddleware.validateSchema(contactSchema, req, res, next);
}

function validateUpdateContactSchema(req: Request, res: Response, next: any){
    return commondsMiddleware.validateSchema(contactUpdateSchema, req, res, next);
}

export {validateContactSchema, validateUpdateContactSchema};