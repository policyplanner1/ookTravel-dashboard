import api from '@/utils/axios';

export const reportsApi = {
  getPerformance: (period)  => api.get(`/reports/performance?period=${period}`),
  downloadPdf:    (period)  => api.get(`/reports/performance/pdf?period=${period}`, { responseType: 'blob' }),
};
