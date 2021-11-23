import app from 'ms-commons/api/app';
import accountsRouter from './routes/accounts';
/*Configurações da webapi*/ 
export default app(accountsRouter);