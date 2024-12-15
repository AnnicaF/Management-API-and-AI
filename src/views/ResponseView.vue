<template>
     <nav>
      <NavBar/> 
    </nav>
    <div class="response-view">
      <AiResponse />
      <OpenAIComponent size="small" placeholderText="Want to change your question or generate a new promt?"/>
      <ReminderText />
      <Footer />
    </div>
  </template>
  
  <script setup>
    import NavBar from '../components/NavBar.vue'
    import { useRouter } from 'vue-router';
    import AiResponse from '../components/AiResponse.vue';
    import ReminderText from '../components/ReminderText.vue';
    import OpenAIComponent from '../components/OpenAIComponent.vue';
    import Footer from '../components/Footer.vue';
    
  const router = useRouter();
  
  const goBack = () => {
    router.push('/');
  };
  </script>
  
  <style scoped>
  .response-view {
    margin: 50px auto;
    max-width: 800px;
    text-align: center;
  }
  
  .back-button {
    margin-top: 20px;
    padding: 10px 20px;
    background-color: #4CAF50;
    color: #fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
  </style>
  