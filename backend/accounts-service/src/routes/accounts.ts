import {Router, Request, Response} from 'express';
import accountsController from '../controllers/accounts';
import {validateAccountSchema, validateAuthorization, validateLoginSchema, validateUpdateAccountSchema, validateAuthentication} from './middlewares';

const router = Router();

router.get('/accounts/', validateAuthentication, accountsController.getAccounts);

router.get('/accounts/:id', validateAuthentication, validateAuthorization, accountsController.getAccount);
/* Na rota para novas contas propositalmente não é feita a validação de autenticação
 * Feito dessa forma porque o usuário ainda não está cadastrado, logo ele pode cadastrar-se
 * Caso a validação fosse feita, seria necessário que outro usuário já cadastrado fizesse o cadastro */
router.post('/accounts/', validateAccountSchema, accountsController.addAccount);
//Também não valida
router.post('/accounts/login', validateLoginSchema, accountsController.loginAccount);

router.post('/accounts/logout', validateAuthentication, accountsController.logoutAccount);
/* Optado pelo patch ao invés de put pois aqui acontece um update parcial, para seguir o restfull */
router.patch('/accounts/:id', validateAuthentication, validateAuthorization, validateUpdateAccountSchema, accountsController.setAccount);

router.delete('/accounts/:id', validateAuthentication, validateAuthorization, accountsController.deleteAccount);

export default router;