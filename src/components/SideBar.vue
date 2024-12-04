<template>
    <div class="sidebar-container">
        <div class="sidebar-header">
            <h3>Content</h3>
            <img class="add-icon" src="../assets/images/plus.svg" alt="Add icon">
        </div>

        
    </div>
</template>

<style>
.sidebar-container {
  width: 300px;
  background-color: white;
  color: #050505;
  height: 100vh; /* Adjust height dynamically */
  padding: 12px;
  position: fixed; /* Fix it to the side */
  left: 0;
  transition: width 0.3s ease;
  overflow-y: auto; /* Adds scroll for long content */
  border-right: 1px solid #d8d7d9;
}

.sidebar-header {
  display: flex;
  justify-content: space-between;
  align-items: center; /* Vertically center the elements */
}

.sidebar-header h3 {
    padding: 12px 24px;
    font-size: 16px;
}

.sidebar-header img {
    padding: 6px 0px 6px 3px;
    height: 30px;
}

</style>