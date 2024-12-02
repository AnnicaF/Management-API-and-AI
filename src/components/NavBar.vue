<script setup>
    import '../assets/style/navBar.css';
</script>

<template>
    <nav class="navbar">
        <div class="logo-container">
            <img class="logo" src="../assets/images/umbraco_logo_white_horizontal.svg" alt="Umbraco logo - white">
        </div>
        <div class="nav-btns"> 
            <!-- TODO: Add @click="" -->
            <button class="login-btn">Login</button> 
            <div class="settings-container">
                <img class="settings-icon" src="../assets/images/settings.svg" alt="Settings icon">
            </div>
        </div>
    </nav>
</template>
