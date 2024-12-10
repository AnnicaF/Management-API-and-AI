<template>
    <nav>
        <NavBar/> 
    </nav>
    <div class="home-view">
      <OpenAIComponent />
    </div>
  </template>
  
  <script setup>
  import NavBar from '../components/NavBar.vue'
  import UserInfoComponent from '../components/UserInfoComponent.vue';
  import OpenAIComponent from '../components/OpenAIComponent.vue';
  </script>
  
  <style scoped>
  .home-view {
    text-align: center;
    margin: 20px;
  }
  </style>