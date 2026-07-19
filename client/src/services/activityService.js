import api from './api';

export const getActivities = () => api.get('/api/activities');
export const clearActivities = () => api.delete('/api/activities/clear');
