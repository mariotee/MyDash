import axios from 'axios';

import { WEB_API_HOST } from 'constants/network.js';

const api = axios.create({ baseURL: WEB_API_HOST });

export function getAllIncompleteTasks() {
  return process.env.REACT_APP_DEMO
  ? new Promise((res,rej) => res({data: []}))
  : api.get('/api/incompletetasks');
}

export function deleteIncompleteTaskById(id) {
  return process.env.REACT_APP_DEMO
  ? new Promise((res,rej) => res({data: id}))
  : api.delete(`/api/incompletetasks/${id}`);
}

export function postCompletedTask(incomplete) {
  let complete = { 
    title: incomplete.title,
    dateCompleted: Date.now()
  };
  return process.env.REACT_APP_DEMO
  ? new Promise((res,rej) => res({data: complete}))
  : api.post('/api/completedtasks/', complete);
}