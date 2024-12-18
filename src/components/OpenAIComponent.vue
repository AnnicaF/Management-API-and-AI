<script setup>
import '../assets/style/openAIComponent.css';
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router'; 
import { addMessage } from '../stores/messageStore.js'; 
import { getToken, fetchOpenAIResponse } from '../services/apiService';

const props = defineProps({
  size: {
    type: String,
    default: 'large',
  },
  placeholderText: {
    type: String,
    default: 'Enter your prompt here to help me generate your next blog post...', 
  },
});

const userPrompt = ref('');
const aiResponse = ref(null);
const isNodeLoading = ref(false);
const successMessage = ref(null);
const error = ref(null);
const router = useRouter();

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

    const response = await fetchOpenAIResponse(userPrompt.value, token);

    console.log('Raw OpenAI Response:', response);

    if (!response || typeof response !== 'object' || !response.response) {
      throw new Error('Ugyldigt svar fra OpenAI.');
    }

    const { title, bodytext } = response.response;

    if (!title || !bodytext) {
      throw new Error('Responsen indeholder ikke de nødvendige felter.');
    }

    // Tilføj brugerens besked og gem prompten
    addMessage('user', { title: userPrompt.value, body: '', prompt: userPrompt.value });

    // Tilføj AI responsen som title og body
    addMessage('ai', { title, body: bodytext, prompt: '' });

    userPrompt.value = '';

    router.push({ name: 'response' });

  } catch (error) {
    console.error('Fejl ved hentning af OpenAI svar:', error);
    error.value = error.message || 'En ukendt fejl opstod.';
  }
};
</script>

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
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-send-horizontal"><path d="M3.714 3.048a.498.498 0 0 0-.683.627l2.843 7.627a2 2 0 0 1 0 1.396l-2.842 7.627a.498.498 0 0 0 .682.627l18-8.5a.5.5 0 0 0 0-.904z"/><path d="M6 12h16"/></svg>
    </button>

    <div v-if="successMessage" class="success-message">
      <p>{{ successMessage }}</p>
    </div>
    
    <div v-if="error" class="error-message">
      <p>Fejl: {{ error }}</p>
    </div>
  </div>
</template>

