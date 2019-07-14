import axios from 'axios';

import { WEB_API_HOST } from 'constants/network.js';

const api = axios.create({ baseURL: WEB_API_HOST });

export function getCustomers() {
  return process.env.REACT_APP_DEMO
    ? new Promise((res,rej) => res({data:[]}))
    : api.get('api/customers');
}

export function updateCustomer(object) {
  return process.env.REACT_APP_DEMO
    ? new Promise((res,rej) => res({data:object}))
    : api.put(`/api/customers/${object.id}`, object);
}

export function postCustomer(object) {
  return process.env.REACT_APP_DEMO
    ? new Promise((res,rej) => res({data:object}))
    : api.post('/api/customers', object);
}
