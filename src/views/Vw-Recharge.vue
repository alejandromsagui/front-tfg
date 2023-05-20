<template>
  <v-app>
    <v-container>
      <v-card class="chat-window">
        <v-card-title class="header">
          <span class="username">Chat</span>
        </v-card-title>
        <v-card-text class="chat-box" ref="chatBox">
          <div v-for="(message, index) in messages" :key="index" class="message" :class="message.from === 'me' ? 'from-me' : 'from-others'">
            <span>{{ message.text }}</span>
          </div>
        </v-card-text>
        <v-card-actions class="text-area">
          <v-text-field v-model="inputText" @keyup.enter="sendMessage" placeholder="Type a message..." outlined></v-text-field>
          <v-btn @click="sendMessage" color="primary">Send</v-btn>
        </v-card-actions>
      </v-card>
    </v-container>
  </v-app>
</template>


<script setup>
import { socket } from "../services/socket";
import { ref, onMounted } from 'vue';
const inputText = ref('');
const messages = ref([]);

const sendMessage = () => {
  if (inputText.value.trim() !== '') {
    const message = {
      from: 'me',
      text: inputText.value
    };

    socket.emit('chat message', message);
    messages.value.push(message);
    inputText.value = '';
  }
};


onMounted(() => {
  socket.on('chat message', (message) => {
    messages.value.push({
      from: 'others',
      text: message
    });
  });
});
</script>

<style>
.chat-window {
  max-width: 400px;
  margin: 50px auto;
  padding: 20px;
}

.header {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

.avatar {
  margin-right: 10px;
}

.username {
  font-size: 18px;
  font-weight: bold;
}

.chat-box {
  max-height: 300px;
  overflow-y: scroll;
  margin-bottom: 20px;
  border: 1px solid #ccc;
  padding: 10px;
}

.message {
  padding: 5px;
  margin-bottom: 10px;
}

.from-me {
  background-color: #e0e0e0;
  border-radius: 5px;
  align-self: flex-end;
}

.from-others {
  background-color: #f5f5f5;
  border-radius: 5px;
}

.text-area {
  display: flex;
  align-items: center;
}
</style>