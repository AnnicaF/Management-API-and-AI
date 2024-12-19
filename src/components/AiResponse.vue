<script setup>
import '../assets/style/aiResponse.css'
import FooterComponent from './Footer.vue';
import { messages as messageStore } from '../stores/messageStore.js';

const messages = messageStore;
</script>

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
            <button class="edit-icon-btn" @click="handleEditTitle(message)" aria-label="Edit Title">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#3545B0" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-pencil"><path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z"/><path d="m15 5 4 4"/></svg>
            </button>
            <textarea v-model="message.body" class="body-field" placeholder="Body"></textarea>
          </div>
        </div>
      </div>

      <FooterComponent />
    </div>
  </template>

  <style>
.title-field-container {
  display: flex;
  align-items: center;
  gap: 8px; /* Spacing between title and icon */
}

.title-field {
  flex-grow: 1;
  line-height: 1.5;
}

.edit-icon-btn {
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  display: flex;
  align-items: center;
}

.edit-icon-btn svg {
  width: 20px;
  height: 20px;
  fill: currentColor; /* Matches the text color */
  stroke: currentColor; /* Matches the text color */
}
</style>