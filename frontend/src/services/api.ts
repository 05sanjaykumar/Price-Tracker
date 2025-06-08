// frontend/src/services/api.ts
import axios from 'axios'

const API = axios.create({
    baseURL: 'http://localhost:3000/api',
    headers: { 'Content-Type': 'application/json' },
})

export const signUpUser = (data: { username: string; email: string; password: string }) =>
  API.post('/signin', data);

export const loginUser = (data: { email: string; password: string }) =>
  API.post('/login', data);