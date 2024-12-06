<template>
    <div class="openai-input">
      <textarea v-model="userPrompt" placeholder="Skriv din prompt her..." rows="4" cols="50"></textarea>
      
      <button @click="fetchOpenAI" :disabled="isNodeLoading" class="fetch-openai-button">
        {{ isNodeLoading ? "Henter OpenAI..." : "Send Prompt til OpenAI" }}
      </button>
      
      <div v-if="aiResponse">
        <h3>{{ aiResponse.title }}</h3>
        <p>{{ aiResponse.body }}</p>
      </div>
      
      <div v-if="successMessage" class="success-message">
        <p>{{ successMessage }}</p>
      </div>
      
      <div v-if="error" class="error-message">
        <p>Fejl: {{ error }}</p>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import { getToken } from '../services/apiService';
  import { fetchOpenAIResponse, createContentNode } from '../services/apiService';
  
  const userPrompt = ref('');
  const aiResponse = ref(null);
  const isNodeLoading = ref(false);
  const successMessage = ref(null);
  const error = ref(null);
  
  const fetchOpenAI = async () => {
    isNodeLoading.value = true;
    error.value = null;
    aiResponse.value = null;
  
    try {
      const prompt = userPrompt.value.trim();
      if (!prompt) {
        throw new Error("Prompt kan ikke være tom.");
      }
  
      const token = await getToken();
      console.log("Token hentet:", token);
  
      const response = await fetchOpenAIResponse(prompt, token);
      console.log("Respons modtaget:", response);
  
      if (!response || typeof response !== 'object' || !response.response) {
        throw new Error("Ugyldigt svar fra serveren.");
      }
  
      aiResponse.value = response.response;
      const umbracoResponse = await createContentNode({ title: aiResponse.value.title }, token);
      successMessage.value = "Content node er oprettet i Umbraco!";
    } catch (err) {
      error.value = err.message || "En ukendt fejl opstod.";
      console.error('Fejl ved OpenAI-anmodning:', err);
    } finally {
      isNodeLoading.value = false;
    }
  };
  
  defineExpose({
    fetchOpenAI,
    aiResponse,
    isNodeLoading,
    successMessage,
    error,
    userPrompt
  });
  </script>
  
  <style scoped>
  .fetch-openai-button {
    padding: 10px 20px;
    margin: 10px;
    background-color: #4caf50;
    color: white;
    border: none;
    border-radius: 5px;
  }
  
  .fetch-openai-button:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
  
  textarea {
    width: 100%;
    max-width: 600px;
    padding: 10px;
    margin-bottom: 10px;
    font-size: 16px;
    border-radius: 5px;
    border: 1px solid #ccc;
  }
  
  .success-message {
    color: green;
  }
  
  .error-message {
    color: red;
  }
  </style>
  