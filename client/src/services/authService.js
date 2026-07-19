import api from './api';

export const login = (data) => api.post('/api/auth/login', data);
export const getMe = () => api.get('/api/auth/me');
