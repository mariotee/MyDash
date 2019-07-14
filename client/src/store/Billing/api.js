import axios from 'axios';

import { WEB_API_HOST } from 'constants/network.js';

const api = axios.create({ baseURL: WEB_API_HOST });

export function getUsageData() {
  return process.env.REACT_APP_DEMO
  ? new Promise((res,rej) => res({data: []}))
  : api.get('/api/billingreports');
}
