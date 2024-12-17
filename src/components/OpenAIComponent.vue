<template>
  <div class="textarea-container">
    <textarea 
      v-model="userPrompt" 
      :class="['custom-textarea', sizeClass]" 
      :placeholder="placeholderText"
      rows="4" 
      cols="50">
    </textarea>
    <button 
      @click="handleSend" 
      :disabled="isNodeLoading" 
      class="send-button">
      <i class="fas fa-paper-plane"></i>
    </button>

    <div v-if="successMessage" class="success-message">
      <p>{{ successMessage }}</p>
    </div>
    
    <div v-if="error" class="error-message">
      <p>Fejl: {{ error }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router'; 
import { addMessage } from '../stores/messageStore.js'; 
import { getToken } from '../services/apiService';
import { fetchOpenAIResponse } from '../services/apiservice.js'; 

const props = defineProps({
  size: {
    type: String,
    default: 'large',
  },
  placeholderText: {
    type: String,
    default: 'Enter your prompt here...', 
  },
});

const userPrompt = ref('');
const aiResponse = ref(null);
const isNodeLoading = ref(false);
const successMessage = ref(null);
const error = ref(null);
const router = useRouter(); // Vue Router

const sizeClass = computed(() => {
  return props.size === 'small' ? 'textarea-small' : 'textarea-large';
});

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
    const response = await fetchOpenAIResponse(prompt, token);

    if (!response || typeof response !== 'object' || !response.response) {
      throw new Error("Ugyldigt svar fra serveren.");
    }

    // response gemmes i aiResponse 
    aiResponse.value = response.response;
    console.log("Modtaget OpenAI-respons:", aiResponse.value);

    const umbracoResponse = await createContentNode(aiResponse.value, token);
    successMessage.value = "Content node er oprettet i Umbraco!";

  } catch (err) {
    error.value = err.message || "En ukendt fejl opstod.";
    console.error("Fejl ved OpenAI-anmodning:", err);
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

const handleSend = async () => {
  const token = await getToken();
  try {
    // Hent OpenAI svar via backend
    const response = await fetchOpenAIResponse(userPrompt.value, token);

    // Logg den rå JSON respons for at inspicere strukturen
    console.log('Raw OpenAI Response:', response);

    if (!response || typeof response !== 'object' || !response.response) {
      throw new Error('Ugyldigt svar fra OpenAI.');
    }

    // Forvent at responsen allerede har 'title' og 'body'
    const { title, body } = response.response;

    if (!title || !body) {
      throw new Error('Responsen indeholder ikke de nødvendige felter.');
    }

    // Tilføj brugerens besked og gem prompten
    addMessage('user', { title: userPrompt.value, body: '', prompt: userPrompt.value });

    // Tilføj AI responsen som title og body
    addMessage('ai', { title, body, prompt: '' });

    // Nulstil input
    userPrompt.value = '';

    // Naviger til "responseview" ruten
    router.push({ name: 'response' });

  } catch (error) {
    console.error('Fejl ved hentning af OpenAI svar:', error);
    error.value = error.message || 'En ukendt fejl opstod.';
  }
};






</script>


<style scoped>
.textarea-container {
  position: relative;
  display: inline-block;
  width: 800px;
}

.custom-textarea {
  width: 100%;
  background-color: #fff;
  border: 1px solid #C2C2C2;
  color: #000;
  border-radius: 5px;
  padding: 10px 50px 10px 10px;
  font-size: 15px;
  font-family: Arial, sans-serif;
  outline: none;
  box-sizing: border-box;
}

.textarea-large {
  height: 132px;
}

.textarea-small {
  height: 100px;
}

.send-button {
  position: absolute;
  top: 80%;
  right: 20px;
  transform: translateY(-50%) rotate(30deg);
  background-color: transparent;
  border: none;
  width: auto;
  height: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: #3545B0;
  font-size: 20px;
  padding: 0;
}

.success-message,
.error-message {
  margin-top: 10px;
}

.message-container {
  display: flex;
  align-items: center;
  margin-bottom: 15px;
}

.user-initials {
  background-color: #f2f2f5;
}

.ai-initials {
  background-color: #1B254F;
  color: white;
}

.message-content {
  background-color: #f9f9f9;
  padding: 10px;
  border-radius: 10px;
  max-width: 70%;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  margin-right: 10px;
  word-wrap: break-word;
}
</style>
