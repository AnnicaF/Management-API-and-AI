<script setup>
  import { ref } from "vue";
  import Toast from "../components/Toasts.vue";
  import NavBar from '../components/NavBar.vue'
  import UserInfoComponent from '../components/UserInfoComponent.vue';
  import OpenAIComponent from '../components/OpenAIComponent.vue';
  import ReminderText from '../components/ReminderText.vue';
  import HeaderComponent from '../components/HeaderComponent.vue';
  import Footer from '../components/Footer.vue'

  const showToast = ref(false);
  const toastMessage = ref("");
  const toastType = ref("success");

const showSuccess = () => {
  toastMessage.value = "Your content has been successfully sent to the Umbraco Backoffice";
  toastType.value = "success";
  showToast.value = true;
  hideToast();
};

const showError = () => {
  toastMessage.value = "Error: You cannot send an empty message. Please add content before submitting.";
  toastType.value = "error";
  showToast.value = true;
  hideToast();
};

const hideToast = () => {
  setTimeout(() => {
    showToast.value = false;
  }, 3000); // Auto-hide toast after 3 seconds
};  
</script>

<template>
  <nav>
      <NavBar/> 
  </nav>
  <div>
    <button @click="showSuccess">Show Success</button>
    <button @click="showError">Show Error</button>

    <Toast
      v-if="showToast"
      :message="toastMessage"
      :type="toastType"
    />
  </div>
  <div class="home-view">
    <HeaderComponent />
    <OpenAIComponent />
    <ReminderText />
    <Footer/>
  </div>
</template>

  
  <style scoped>
  .home-view {
    text-align: center;
    margin: 20px;
  }
  </style>