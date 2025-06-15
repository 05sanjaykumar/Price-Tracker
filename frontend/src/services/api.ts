// frontend/src/services/api.ts
import axios from 'axios';

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000/api',
  headers: { 'Content-Type': 'application/json' },
});

export const signUpUser = (data: { username: string; email: string; password: string }) =>
  API.post('/auth/signin', data);

export const loginUser = (data: { email: string; password: string }) =>
  API.post('/auth/login', data);

export const getUserPrompts = (userId: string) =>
  API.get(`/savePrompt/${userId}`);


const FlaskAPI = axios.create({
  baseURL: import.meta.env.VITE_AI_URL || 'http://localhost:5050',
  headers: { 'Content-Type': 'application/json' },
});

export const askAI = (query: string) =>
  FlaskAPI.post('/api/askAI', { query });

