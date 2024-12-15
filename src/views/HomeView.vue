<script setup>
  import NavBar from '../components/NavBar.vue'
  import UserInfoComponent from '../components/UserInfoComponent.vue';
  import OpenAIComponent from '../components/OpenAIComponent.vue';
  import ReminderText from '../components/ReminderText.vue';
  import HeaderComponent from '../components/HeaderComponent.vue';
  import Footer from '../components/Footer.vue'
</script>

<template>
  <nav>
      <NavBar/> 
  </nav>
  <div class="home-view">
    <HeaderComponent />
    <OpenAIComponent />
    <ReminderText />
  </div>
      <Footer/>
</template>

  
  <style scoped>
  .home-view {
    text-align: center;
    margin: 20px;
  }
  </style>