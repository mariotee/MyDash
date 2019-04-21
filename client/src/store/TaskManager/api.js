import axios from 'axios';

import { WEB_API_HOST } from 'constants/network.js';

const api = axios.create({ baseURL: WEB_API_HOST });

export function getAllIncompleteTasks() {
  return api.get('/api/incompletetasks');
}

export function deleteIncompleteTaskById(id) {
  return api.delete(`/api/incompletetasks/${id}`);
}

export function postCompletedTask(incomplete) {
  let complete = { 
    title: incomplete.title,
    dateCompleted: Date.now()
  };
  return api.post('/api/completedtasks/', complete);
}
