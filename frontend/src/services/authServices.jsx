// src/axiosConfig.js
import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://localhost:3000/auth', // Adjust the base URL if your backend is hosted elsewhere
});

export default instance;
