import contactModel, {IContactModel} from './contactModel';
import {IContact} from './contacts';

function findAll(accountId: number){
    return contactModel.findAll<IContactModel>({where: {accountId: accountId}});
}

function findById(contactId: number, accountId: number){
    return contactModel.findOne<IContactModel>({where: {id: contactId, accountId: accountId}});
}

async function add(contact: IContact, accountId: number){
    contact.accountId = accountId;
    const result = await contactModel.create(contact);
    contact.id = result.id!;
    return contact;
}

function removeById(contactId: number, accountId: number){
    return contactModel.destroy({where: {id: contactId, accountId: accountId}});
}

function removeByEmail(email: string, accountId: number){
    return contactModel.destroy({where: {email: email, accountId: accountId}});
}

async function set(contactId: number, contact: IContact, accountId: number){
    /* Em tese findById funcionaria, porém é recomendado usar findOne passando
     * o id da tabela e também o id da tabela mãe (accountId no caso) */
    const originalContact = await contactModel.findOne({where: {id: contactId, accountId: accountId}});
    if (!originalContact) return null;

    if (contact.name) originalContact.name = contact.name;
    if (contact.phone) originalContact.phone = contact.phone;
    if (contact.status) originalContact.status = contact.status;

    const result = await originalContact.save();
    contact.id = result.id;
    return contact;
}
export default {findAll, add, removeById, removeByEmail, findById, set};