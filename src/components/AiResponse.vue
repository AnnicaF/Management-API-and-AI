<template>
    <div class="chat-container">
      <div 
        v-for="(message, index) in messages" 
        :key="index" 
        :class="['message-container', message.role === 'user' ? 'user-message' : 'ai-message']">
      
        <div v-if="message.role === 'user'" class="user-message-content">
          <span class="user-prompt-text">{{ message.prompt }}</span>
          <span class="user-initials">JD</span>
        </div>
  
        <div v-if="message.role === 'ai'" class="ai-response-container">
          <span class="ai-initials">UW</span>
          <div class="ai-textarea-container">
            <textarea v-model="message.title" class="title-field" placeholder="Title"></textarea>
            <textarea v-model="message.body" class="body-field" placeholder="Body"></textarea>
          </div>
        </div>
      </div>
  
      <!-- test knap -->
      <button @click="handleCreateContentNode" class="create-node-btn">Opret Content Node</button>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import { getToken, createContentNode as apiCreateContentNode } from '../services/apiService.js';
  import { messages as messageStore } from '../stores/messageStore.js'; 
  
  const messages = messageStore;
  
  const handleCreateContentNode = async () => {
    try {
      const token = await getToken();
      
      // Opret en objekt for AI-responsen
      const aiResponse = {
        title: messages[0]?.title || "Default Title", 
        body: messages[0]?.body || "Default Body",
      };
  
      // Send data til backend for at oprette content node
      const response = await apiCreateContentNode( token);
      
      console.log('Content node oprettet:', response);
    } catch (error) {
      console.error('Fejl ved oprettelse af content node:', error.message);
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
  align-items: flex-start;
  margin-bottom: 15px;
  padding: 5px;
  position: relative; 
}

.user-message {
  justify-content: flex-end;
}

.ai-message {
  justify-content: flex-start;
}

.user-message-content {
  background-color: #fff;
  padding: 10px;
  border-radius: 20px;
  border: none;
  max-width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.user-prompt-text {
  font-size: 16px;
  color: #000;
  background-color: #fff;
  padding: 10px;
  border: none;
  border-radius: 5px;
  width: 100%;
  height: 50px;
  line-height: 30px;
  box-sizing: border-box;
  pointer-events: none; 
}


.user-initials {
  background-color: #fff;
  border: 2px solid #3545B0; 
  color: #3545B0; 
  border-radius: 50%;
  padding: 10px;
  font-size: 18px;
  cursor: pointer;
  position: absolute;
  right: -50px; 
  top: 35%;
  transform: translateY(-50%);
}


.ai-response-container {
  display: flex;
  align-items: flex-start; 
  gap: 20px; 
  width: 800px; 
  background-color: white; 
  border-radius: 10px;
  padding: 20px;
  position: relative;
}

.ai-initials {
  background-color: #1B254F;
  color: white;
  font-weight: bold;
  padding: 10px;
  border-radius: 50%;
  font-size: 18px;
  position: absolute;
  left: -70px; 
  transform: translateY(-50%);
}

.ai-textarea-container {
  display: flex;
  flex-direction: column;
  width: 100%;
}

.title-field {
  width: 100%;
  font-size: 18px;
  font-weight: bold;
  background-color: #fff;
  border: none;
  border-radius: 5px;
  padding: 10px;
  resize: none;
  outline: none;
  box-sizing: border-box;
}

.body-field {
  width: 100%;
  height: 200px;
  font-size: 16px;
  background-color: #fff;
  border: none;
  border-radius: 5px;
  padding: 10px;
  resize: none;
  outline: none;
  box-sizing: border-box;
}
</style>
