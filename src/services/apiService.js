import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'https://your-umbraco-url/management/api/v1',
  headers: {
    Authorization: `Bearer YOUR_ACCESS_TOKEN`,
  },
});

export default {
  getContentNodes() {
    return apiClient.get('/content');
  },
  createContentNode(data) {
    return apiClient.post('/content', data);
  },
  updateContentNode(id, data) {
    return apiClient.put(`/content/${id}`, data);
  },
  deleteContentNode(id) {
    return apiClient.delete(`/content/${id}`);
  },
};
