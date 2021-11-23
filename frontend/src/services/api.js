import axios from 'axios';
import {getToken} from './auth';

const api = axios.create(
    {baseURL: 'http://localhost:4001/'});
/* Pega o token e coloca na no header x-access-token */
api.interceptors.request.use(async(config)=>{
    const token = getToken();
    if (token){
        config.headers['x-access-token'] = token;
        return config;
    }
    return config;
});    
export default api;