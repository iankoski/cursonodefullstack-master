import {Router} from 'express';
import middlewareCommons from 'ms-commons/api/routes/middlewares';
import controller from '../controllers/contacts';
import {validateContactSchema, validateUpdateContactSchema} from './middlwares';
const router = Router();
/*Lista todos os contatos(contacts) de uma conta (account), o account id vem do token jwt de accounts*/
router.get('/contacts/:id', middlewareCommons.validateAuth, controller.getContact);

router.get('/contacts/', middlewareCommons.validateAuth, controller.getContacts);

router.post('/contacts/', middlewareCommons.validateAuth, validateContactSchema, controller.addContact);

router.patch('/contacts/:id', middlewareCommons.validateAuth, validateUpdateContactSchema, controller.setContact)
export default router;