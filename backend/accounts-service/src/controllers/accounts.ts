import { Request, Response } from 'express';
import { IAccount } from '../models/accounts';
import repository from '../models/accountRepository';
import auth from '../auth';
import controllerCommons from 'ms-commons/api/controllers/controller';
import {Token} from 'ms-commons/api/auth';

const accounts: IAccount[] = [];


async function getAccounts(req: Request, res: Response, next: any) {
    /* retorna um array de accounts, utilizando generics <> para deixar
     * explicito que é um findAll de AccountModel*/
    const accounts : IAccount[] = await repository.findAll();
    res.json(accounts.map(item => {
        item.password = '';
        return item;
    }));
}

async function getAccount(req: Request, res: Response, next: any) {
    try {
        const id = parseInt(req.params.id);
        if(!id) return res.status(400).end();
        /* Compara o id que será retornada com o que está tentando buscar
         * somente quem pode pegar uma conta é o dono dela  */
        const token = controllerCommons.getToken(res) as Token;
        if (id !== token.accountId) return res.status(403).end();        
        /* Função para encontrar o indice do vetor
         * a condição é aquele cujo id for = id*/
        const account = await repository.findById(id);
        /*Await -> só executa a próxima linha se tiver a conta*/
        if (account === null) {
            return res.status(404).end();
        } else{
            /*Removendo o password, por segurança*/
            account.password = '';
            res.json(account);
        }
    } catch (error) {
        console.log(error);
        res.status(400).end();
    }

};

async function addAccount(req: Request, res: Response, next: any) {
    try {
        
        const newAccount = req.body as IAccount;
        /*Sobrescreve o password, fazendo o hash*/
        newAccount.password = auth.hashPassword(newAccount.password);
        console.log(newAccount.password);
        const result = await repository.add(newAccount);
        newAccount.id = result.id;
        newAccount.password = '';        
        res.status(201).json(newAccount);
    } catch {
        console.log(Error);
        res.status(400).end();
    }
}

async function setAccount(req: Request, res: Response, next: any) {
    try{
        const accountId = parseInt(req.params.id);
        /*Testa se o parseInt converteu para de fato um número*/
        if(!accountId) return res.status(400).end();

        /* Compara o id que será atualizado com o que está tentando atualizar
         * somente quem pode atualizar uma conta é o dono dela  */
        const token = controllerCommons.getToken(res) as Token;
        if (accountId !== token.accountId) return res.status(403).end();        
        
        const accountParams = req.body as IAccount;

        if(accountParams.password){
            accountParams.password = auth.hashPassword(accountParams.password);
        }
        
        const updateAccount = await repository.set(accountId, accountParams);
        if (updateAccount !== null){
            updateAccount.password = '';
            res.status(200).json(updateAccount);
        } else {
            res.status(404).end();
        }

    }catch(error){
        console.log(error);
        res.status(400).end();
    }
}

async function loginAccount(req: Request, res: Response, next: any){
       
    try{
        const loginParams = req.body as IAccount;
        const account = await repository.findByEmail(loginParams.email);
        if (account !== null){
            const isValid = auth.comparePassword(loginParams.password, account.password)
            if (isValid){
                const token = await auth.sign(account.id!);
                return res.json({auth: true, token});
            }
        } 
        //Usuário não autorizado
        return res.status(401).end();        
           
        res.json({auth: true, token: {} });
    }catch(error){
        console.log(error);
        res.status(400).end();
    }
}

function logoutAccount(req: Request, res: Response, next: any){
    res.json({auth: false, token: null});
}

async function deleteAccount(req: Request, res: Response, next: any){
    try{
        
        const accountId = parseInt(req.params.id);
        
        if (!accountId) return res.status(400).end();
        /* Compara o id que será excluído com o que está tentando excluir
         * somente quem pode excluir uma conta é o dono dela  */
        const token = controllerCommons.getToken(res) as Token;
        if (accountId !== token.accountId) return res.status(403).end();

        await repository.remove(accountId);
        res.status(200).end();

    }catch(error){
        console.log(`deleteAccount: ${error}`);
        res.status(400).end();
    }
}

export default { getAccounts, addAccount, getAccount, setAccount, loginAccount, logoutAccount, deleteAccount };