<!-- <template>
    <footer class="footer">
        <div class="footer-btn">
            <button class="send-btn" @click="sendToUmbraco">
                Send to Umbraco
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-chevron-up"><path d="m18 15-6-6-6 6"/></svg>
            </button>
        </div>
    </footer>
</template>

<script setup>
import { ref } from 'vue';
import { getLastAIMessage } from '../stores/messageStore'; // Hent sidste AI besked fra store
import { createContentNode } from '../services/apiservice'; // Importér din apiservice

// Send den nyeste AI response til Umbraco
async function sendToUmbraco() {
    try {
        // Hent den sidste AI message fra store
        const latestAiMessage = getLastAIMessage();
        
        if (latestAiMessage && latestAiMessage.title && latestAiMessage.body) {
            // Send data til Umbraco via apiservice
            const response = await createContentNode(latestAiMessage);
            console.log('Data sendt til Umbraco:', response);
        } else {
            console.log('Ingen AI-besked at sende.');
        }
    } catch (error) {
        console.error('Fejl ved sending af data til Umbraco:', error);
    }
}
</script> -->
<template>
    hej
</template>
