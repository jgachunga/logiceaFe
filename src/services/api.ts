import axios from "axios";

const instance = axios.create({
    baseURL: 'https://retoolapi.dev/zu9TVE/',
    timeout: 15000,
});

export default instance;


const responseBody = (response: any) => response.data;

const responseError = (error: any) => {
    return Promise.reject(error)
}

export const requests = {
    get: (url: string, headers?: any) => instance.get(url, headers).then(responseBody).catch(responseError),
    post: (url: string, body: any, headers?: any) => instance.post(url, body, headers).then(responseBody).catch(responseError),
    put: (url: string, body: any, headers?: any) => instance.put(url, body, headers).then(responseBody).catch(responseError),
    delete: (url: string, headers?: any) => instance.delete(url, headers).then(responseBody).catch(responseError),
};