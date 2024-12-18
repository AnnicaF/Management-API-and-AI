<template>
    <footer class="footer">
      <div class="footer-btn">
        <button class="send-btn" @click="handleCreateContentNode">
          Send to Umbraco
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-chevron-up">
            <path d="m18 15-6-6-6 6" />
          </svg>
        </button>
      </div>
    </footer>
  </template>
  
  <script setup>
  import '../assets/style/footer.css';
  import { getToken, createContentNode as apiCreateContentNode } from '../services/apiService.js';
  import { getLastAIMessage } from '../stores/messageStore.js';
  
  const handleCreateContentNode = async () => {
    try {
      const token = await getToken();
      const latestAIMessage = getLastAIMessage();
  
      if (!latestAIMessage) {
        throw new Error('Ingen AI-besked fundet!');
      }
  
      const aiResponse = {
        title: latestAIMessage.title || "Default Title",
        body: latestAIMessage.body || "Default Body",
      };
  
      const response = await apiCreateContentNode(aiResponse, token);
  
      console.log('Content node oprettet:', response);
    } catch (error) {
      console.error('Fejl ved oprettelse af content node:', error.message);
    }
  };
  </script>