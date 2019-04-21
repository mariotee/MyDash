import axios from 'axios';

import { WEB_API_HOST } from 'constants/network.js';

const api = axios.create({ baseURL: WEB_API_HOST });

export function getCustomers() {
  return api.get('api/customers');
}

export function updateCustomer(object) {
  return api.put(`/api/customers/${object.id}`, object);
}

export function postCustomer(object) {
  return api.post('/api/customers', object);
}
