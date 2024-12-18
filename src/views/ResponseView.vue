<script setup>
import '../assets/style/responseView.css'
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

<template>
     <nav>
      <NavBar/> 
    </nav>
    <div class="response-view">
      <AiResponse />
      <OpenAIComponent size="small" placeholderText="Message UmbracoWriter"/>
      <ReminderText />
      <Footer />
    </div>
  </template>
  
  