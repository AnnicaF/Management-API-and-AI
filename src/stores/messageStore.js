import { reactive } from 'vue';

export const messages = reactive([]);

export const addMessage = (role, { title = '', body = '', prompt = '' }) => {
  messages.push({ role, title, body, prompt });
};

export const getAIMessages = () => {
  return messages.filter(message => message.role === 'ai');
};

export const getLastAIMessage = () => {
  return messages.filter(message => message.role === 'ai').slice(-1)[0]; 
};