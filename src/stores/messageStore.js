import { reactive } from 'vue';

// Reactive state for messages
export const messages = reactive([]);

export const addMessage = (role, { title = '', body = '', prompt = '' }) => {
  // Vi gemmer både prompten og resten af informationerne
  messages.push({ role, title, body, prompt });
};

// Function to get all AI messages
export const getAIMessages = () => {
  return messages.filter(message => message.role === 'ai');
};

// Function to get the latest AI message
export const getLastAIMessage = () => {
  return messages.filter(message => message.role === 'ai').slice(-1)[0];
};
