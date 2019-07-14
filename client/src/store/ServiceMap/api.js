import axios from 'axios';

import { WEB_API_HOST } from 'constants/network.js';

const api = axios.create({ baseURL: WEB_API_HOST });

export function getServiceLocations() {
  return process.env.REACT_APP_DEMO
  ? new Promise((res,rej) => res({data: []}))
  : api.get('/api/servicelocations');
}

export function updateServiceLocationStatusById(id, object) {
  return process.env.REACT_APP_DEMO
  ? new Promise((res,rej) => res({data: object}))
  : api.put(`/api/servicelocations/${id}`,object,);
}