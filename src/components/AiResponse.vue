<template>
    <div class="chat-container">
      <div v-for="(message, index) in messages" :key="index" :class="['message-container', message.role === 'user' ? 'user-message' : 'ai-message']">
        <div :class="['initials', message.role === 'user' ? 'user-initials' : 'ai-initials']">
          <span>{{ message.role === 'user' ? 'JD' : 'UW' }}</span>
        </div>
        <div class="message-content">
          <p>{{ message.content }}</p>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import { messages as messageStore, addMessage } from '../stores/messageStore.js'; 
  import { fetchOpenAIResponse } from '../services/apiservice.js';
  
  // messageStore til at få adgang til beskederne
  const messages = messageStore;
  
  const userPrompt = ref('');
  const aiResponse = ref({
    title: '',
    body: '',
  });
  
  // prompt til backend
  const handleSend = async () => {
    const token = await getToken(); 
    try {
      // Hent OpenAI svar via backend
      const response = await fetchOpenAIResponse(userPrompt.value, token);
  
      aiResponse.value = response.response;
  
      // Tilføj brugerens prompt og AI svaret til chatten
      messages.push({ role: 'user', content: userPrompt.value });
      messages.push({ role: 'ai', content: `${aiResponse.value.title}\n${aiResponse.value.body}` });
  
    } catch (error) {
      console.error('Fejl ved hentning af OpenAI svar:', error);
    }
  };
  </script>
  
  <style scoped>
  .chat-container {
    max-width: 800px;
    margin: 0 auto;
    padding-top: 20px;
  }
  
  .message-container {
    display: flex;
    align-items: center;
    margin-bottom: 15px;
  }
  
  .user-message {
    justify-content: flex-end;
  }
  
  .ai-message {
    justify-content: flex-start;
  }
  
  .user-initials {
    background-color: #f2f2f5;
    margin-left: 10px;
  }
  
  .ai-initials {
    background-color: #1B254F;
    color: white;
    margin-right: 10px;
  }
  
  .message-content {
    background-color: #f9f9f9;
    padding: 10px;
    border-radius: 10px;
    max-width: 70%;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    word-wrap: break-word;
  }
  
  .user-message .message-content {
    background-color: #d3f8e2; 
  }
  
  .ai-message .message-content {
    background-color: #f0f0f0;
  }
  </style>
  