<script setup>
    import '../assets/style/navBar.css';
    import { useAuthService } from '../services/authService'; 
    const { logout } = useAuthService(); 
</script>

<template>
  <nav class="navbar">
        <div class="logo-container">
            <img class="logo" src="../assets/images/umbraco_logo_white_horizontal.svg" alt="Umbraco logo - white">
        </div>
        <div class="nav-btns"> 
            <button @click="logout" class="logout-btn">Logout</button> 
        </div>
    </nav>
</template>


