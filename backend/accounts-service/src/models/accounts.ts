import { AccountStatus } from './accountStatus';
/* Schema do TypeScript => validação de tipos */
export interface IAccount {
    /*O id pode ser opcional, pois o sequelize vai gerear um*/
    id?: number,
    name: string,
    email: string,
    password: string,
    status?: number,
    domain: string
}
