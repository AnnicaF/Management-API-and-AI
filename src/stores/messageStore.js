// src/stores/messageStore.js
import { ref } from 'vue';

export const messages = ref([]);

export const addMessage = (role, content) => {
  messages.value.push({ role, content });
};
