import express, {Router} from 'express';
import helmet from 'helmet';
import cors from 'cors';
/*Configurações da webapi*/ 
export default(router: Router)=>{
    const app = express();
    app.use(express.json())
    app.use(helmet());
    app.use(cors());
    app.use(router);    
    return app;
}
