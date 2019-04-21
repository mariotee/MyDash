import axios from 'axios';

import { WEB_API_HOST } from 'constants/network.js';

const api = axios.create({ baseURL: WEB_API_HOST });

export function getServiceLocations() {
  return api.get('/api/servicelocations');
}

export function updateServiceLocationStatusById(id, object) {
  return api.put(
    `/api/servicelocations/${id}`,
    object,
  );
}
