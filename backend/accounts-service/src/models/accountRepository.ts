import accountModel, {IAccountModel} from './accountModel';
import {IAccount} from './accounts';
import {DestroyOptions} from 'sequelize';

function findAll(){
    return accountModel.findAll<IAccountModel>();
};

function findByEmail(emailFilter: string){
    return accountModel.findOne<IAccountModel>({where: {email: emailFilter}});
};

function findById(id: number){
    return accountModel.findByPk<IAccountModel>(id);
}

function add(account: IAccount){
    return accountModel.create(account);
}

async function set(id: number, account: IAccount){
    const originalAccount = await accountModel.findByPk<IAccountModel>(id);
    if (originalAccount !== null){
        if(originalAccount.name){
            originalAccount.name = account.name;
        }
        if(originalAccount.domain){
            originalAccount.domain = account.domain;
        }
        if(originalAccount.status){
            originalAccount.status = account.status;
        }        
        if (account.password){
            originalAccount.password = account.password;
        }
        /*Envia o update para o mysql*/
        await originalAccount.save();
        return originalAccount;
    }
    return null;    
}

function remove (id: number){
    return accountModel.destroy({where: {id: id}} as DestroyOptions<IAccount>);
}

function removeByEmail (email: string){
    return accountModel.destroy({where: {email: email}} as DestroyOptions<IAccount>);
}

export default {findAll, findById, add, set, findByEmail, remove, removeByEmail};