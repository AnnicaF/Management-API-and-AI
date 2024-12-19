<script setup>
import '../assets/style/toast.css'
import { ref, defineProps } from 'vue';

const props = defineProps({
  message: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    default: "success", 
  },
});

const visible = ref(true);
</script>

<template>
    <div
    v-if="visible"
    :class="['toast-container', type]"
  >
    <span>{{ message }}</span>
    <button @click="visible = false" class="close-btn">×</button>
  </div>  
</template>