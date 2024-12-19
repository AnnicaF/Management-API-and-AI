<script setup>
import '../assets/style/footer.css'
import Toast from './Toast.vue'; 
import { ref } from 'vue';
import { getToken, createContentNode as apiCreateContentNode } from '../services/apiService.js';
import { getLastAIMessage } from '../stores/messageStore.js';

const toastVisible = ref(false);
const toastMessage = ref("");
const toastType = ref("success");

// Function to handle content creation
const handleCreateContentNode = async () => {
  try {
    const token = await getToken();
    const latestAIMessage = getLastAIMessage();

    if (!latestAIMessage) {
      throw new Error('You cannot send an empty message. Please add content before submitting.');
    }

    const aiResponse = {
      title: latestAIMessage.title || "Default Title",
      body: latestAIMessage.body || "Default Body",
    };

    const response = await apiCreateContentNode(aiResponse, token);

    // If content is successfully created, show success toast
    toastMessage.value = "Your content has been successfully sent to the Umbraco Backoffice";
    toastVisible.value = true;
    toastType.value = 'success';

    // Hide the toast after 3 seconds
    setTimeout(() => {
      toastVisible.value = false;
    }, 3000);

  } catch (error) {
    toastMessage.value = error.message;
    toastVisible.value = true;
    toastType.value = 'error';

    setTimeout(() => {
      toastVisible.value = false;
    }, 3000);

  }
};
</script>

<template>
  <div>
    <!-- Toast Component -->
    <Toast v-if="toastVisible" :message="toastMessage" :type="toastType" />

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
