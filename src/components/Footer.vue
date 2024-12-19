<script setup>
import '../assets/style/footer.css'
import Toast from '../components/Toats.vue'; 
import { ref } from 'vue';
import { getToken, createContentNode as apiCreateContentNode } from '../services/apiService.js';
import { getLastAIMessage } from '../stores/messageStore.js';

const toastVisible = ref(false);
const toastMessage = ref("");

// Function to handle content creation
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

    // If content is successfully created, show success toast
    console.log('Content node oprettet:', response);
    toastMessage.value = "Your content has been successfully sent to the Umbraco Backoffice";
    toastVisible.value = true;

    // Hide the toast after 3 seconds
    setTimeout(() => {
      toastVisible.value = false;
    }, 3000);

  } catch (error) {
    console.error('Fejl ved oprettelse af content node:', error.message);
  }
};
</script>

<template>
  <div>
    <!-- Toast Component -->
    <Toast v-if="toastVisible" :message="toastMessage" type="success" />

    <!-- Footer with the Send to Umbraco button -->
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
  </div>
</template>
