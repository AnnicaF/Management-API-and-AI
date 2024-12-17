<template>
    <div class="chat-container">
      <!-- Iterér over alle beskeder i messages -->
      <div 
        v-for="(message, index) in messages" 
        :key="index" 
        :class="['message-container', message.role === 'user' ? 'user-message' : 'ai-message']">
    
        <!-- Hvis det er en brugerbesked -->
        <div v-if="message.role === 'user'" class="user-message-content">
          <!-- Vis prompt som ikke-redigerbar tekst -->
          <span class="user-prompt-text">{{ message.prompt }}</span>
          <span class="user-initials">JD</span>
        </div>

    
        <!-- Hvis det er en AI-besked -->
        <div v-if="message.role === 'ai'" class="ai-response-container">
          <!-- UW initialer til venstre for AI-respons (udenfor boks) -->
          <span class="ai-initials">UW</span>
    
          <!-- AI responsen (Title og Body under hinanden) -->
          <div class="ai-textarea-container">
            <!-- Vis title (nu redigerbar) -->
            <textarea 
              v-model="message.title" 
              class="title-field" 
              placeholder="Title">
            </textarea>
            <!-- Vis body (nu redigerbar) -->
            <textarea 
              v-model="message.body" 
              class="body-field" 
              placeholder="Body">
            </textarea>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  
  
  
  <script setup>
  import { messages as messageStore } from '../stores/messageStore.js'; // Importér messages fra storet
  
  // messageStore til at få adgang til beskederne
  const messages = messageStore;
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
  position: relative; /* Make sure positioning is relative to this container */
}

.user-message {
  justify-content: flex-end;
}

.ai-message {
  justify-content: flex-start;
}

/* Styling for user messages */
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
  pointer-events: none; /* Ensures the prompt is not editable */
}

/* Styling for JD initial (User) */
.user-initials {
  background-color: #fff;
  border: 2px solid #3545B0; /* Blue border */
  color: #3545B0; /* Blue color for initials */
  border-radius: 50%;
  padding: 10px;
  font-size: 18px;
  cursor: pointer;
  position: absolute;
  right: -50px; /* Move JD outside of the user message */
  top: 35%;
  transform: translateY(-50%);
}

/* Styling for AI response container */
.ai-response-container {
  display: flex;
  align-items: flex-start; /* Aligns the items to the top */
  gap: 20px; /* Space between initial and content */
  width: 800px; /* Ensures that the AI response box is 800px wide */
  background-color: white; /* AI response has white background */
  border-radius: 10px; /* Rounded corners */
  padding: 20px;
  position: relative; /* Ensures that the initial is positioned relative to this container */
}

/* Styling for AI initial (UW) */
.ai-initials {
  background-color: #1B254F;
  color: white;
  font-weight: bold;
  padding: 10px;
  border-radius: 50%;
  font-size: 18px;
  position: absolute;
  left: -70px; /* Move UW outside of the AI message box */
  transform: translateY(-50%);
}

/* Container for AI's title and body (stacked vertically) */
.ai-textarea-container {
  display: flex;
  flex-direction: column;
  width: 100%;
}

/* Title textarea */
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

/* Body textarea */
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
