import api from './api';

export const getSummary = () => api.get('/api/reports/summary');
