<script setup>
import NavBar from '../components/NavBar.vue'
import Footer from '../components/Footer.vue'
import UserInfoComponent from '../components/UserInfoComponent.vue';
import OpenAIComponent from '../components/OpenAIComponent.vue';
</script>

<template>
<div>
    <NavBar/> 
     <div class="home-view">
      <OpenAIComponent />
    </div>
    <Footer/>
</div>
</template>

<style scoped>
.home-view {
  text-align: center;
  margin: 20px;
}
</style>