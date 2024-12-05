<template>
    <div class="home-view">
      <UserInfoComponent />
      <OpenAIComponent />
    </div>
  </template>
  
  <script setup>
  import UserInfoComponent from '../components/UserInfoComponent.vue';
  import OpenAIComponent from '../components/OpenAIComponent.vue';
  </script>
  
  <style scoped>
  .home-view {
    text-align: center;
    margin: 20px;
  }
  </style>
  