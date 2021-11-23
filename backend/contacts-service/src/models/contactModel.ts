import Sequelize, {Optional, Model} from 'sequelize';
import database from 'ms-commons/data/db';
import {IContact} from './contacts';
/*Interfaces necessárias para que os types do sequelize (banco) possam bater com os types do typescript */
interface IContactCreationAttributes extends Optional <IContact, "id">{}

export interface IContactModel extends Model<IContact, IContactCreationAttributes>, IContact{}

export default database.define<IContactModel>('contact', {
    id: {
        type: Sequelize.INTEGER.UNSIGNED,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },
    accountId: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,        
    },
    name: {
        type: Sequelize.STRING(150),
        allowNull: true
    },
    email: {
        type: Sequelize.STRING(150),
        allowNull: false
    },
    phone: {
        type: Sequelize.STRING(11),
        allowNull: true
    },
    status: {
        type: Sequelize.SMALLINT.UNSIGNED,
        allowNull: false, 
        defaultValue: 100
    }
}, {
    /* indexes é uma opção do sequelize para criar chaves compostas
     * esta no caso garante que não tenha mais de um contato com o mesmo email
     * para a mesma conta de email.
     * para outras contas é possível que tenha, pois dois clientes podem ter clientes em comum
     * em suas listas de contatos*/
    indexes: [{
        unique: true,
        fields: ['accountId', 'email']
    }]

})