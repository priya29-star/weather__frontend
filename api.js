import axios from 'axios';

const api = axios.create({
baseURL: 'http://localhost:5173', // Replace with your backend URL
});

export const fetchWeather = (city) => api.get(`/weather?city=${city}`);
export const fetchFavorites = () => api.get('/weather/favorites');
export const addFavorite = (city) => api.post('/weather/favorite', city);
export const deleteFavorite = (id) => api.delete(`/weather/favorite/${id}`);
export const registerUser = (email, password) => api.post('/auth/register', { email, password });
export const loginUser = (email, password) => api.post('/auth/login', { email, password });