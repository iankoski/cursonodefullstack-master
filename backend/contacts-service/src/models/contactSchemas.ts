/* Define o formato de uma account, os campos que ela deve ter e validações básicas 
 * Responsabilidade do Schema do JOI => Validação de Objetos*/
import Joi from 'joi';
const contactSchema = Joi.object({
    id: Joi.number()
        .integer()
        .min(1),
    accountId: Joi.number()
        .integer()
        .min(1),    
    name: Joi.string()
        .min(3)
        .max(150)
        .required(),
    email: Joi.string()
        .email()
        .required()
        .min(8)
        .max(150),
    phone: Joi.string()
        .pattern(/^[0-9]{10,11}$/),

    status: Joi.number()
        .integer()
        .min(100)
        .max(400)
})

const contactUpdateSchema = Joi.object({
    name: Joi.string()
        .min(3)
        .max(150)
        .required(),
    phone: Joi.string()
        .pattern(/^[0-9]{10,11}$/),
    status: Joi.number()
        .integer()
        .min(100)
        .max(400)
})


export { contactSchema, contactUpdateSchema};