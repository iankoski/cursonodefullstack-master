import app from 'ms-commons/api/app';
import contactsRouter from './routes/contacts';
/*Configurações da webapi*/ 
export default app(contactsRouter);