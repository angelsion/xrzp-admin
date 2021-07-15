import axios from 'axios';

axios.defaults.withCredentials = true; // 允许携带cookie
// axios.defaults.baseURL = '/api'

export default function ajax(url:string,params:any,method = 'GET'){
    return new Promise((resolve,reject)=>{
        let promise;
        if (method === 'GET'){
            promise = axios({
                url,
                params
            })
        }else if(method === 'POST'){
            promise = axios({
                method: 'post',
                url,
                data: params
            })
        }
        promise?.then((result) => {
            resolve(result);
        }).catch((err) => {
            reject(err);
        });
    });
}