<template>
  <div class="background">
    <v-container>
      <v-row>
        <v-col cols="12">
          <v-card class="chat-app mt-10" style="height: 80vh;">
            <div id="plist" class="people-list">
              <v-row class="input-group">
                <v-col cols="12">
                  <v-text-field placeholder="Search..." outlined></v-text-field>
                </v-col>
              </v-row>
              <ul class="list-unstyled chat-list mt-2 mb-0" style="height: calc(100% - 40px);">
                <li class="clearfix">
                  <img src="https://bootdey.com/img/Content/avatar/avatar1.png" alt="avatar">
                  <div class="about">
                    <div class="name">Vincent Porter</div>
                  </div>
                </li>
              </ul>
            </div>
            <div class="chat" style="height: 80%">
              <div class="chat-header clearfix">
                <v-row align="center" style="width: 100%;">
                  <v-col cols="auto">
                    <a href="javascript:void(0);" data-toggle="modal" data-target="#view_info">
                      <v-avatar size="30">
                        <img src="https://bootdey.com/img/Content/avatar/avatar2.png" alt="avatar">
                      </v-avatar>
                    </a>
                  </v-col>
                  <v-col>
                    <div class="chat-about">
                      <h4>Aiden Chavez</h4>
                    </div>
                  </v-col>
                </v-row>
              </div>
              <ul class="chat-history"
                style="border-left: 1px solid #efefef; border-top: 1px solid #efefef; border-bottom: 1px solid #efefef; padding: 20px; margin-left: 20px; height: calc(100% - 80px); overflow-y: auto;">
                <li class="clearfix" v-for="item in data" :key="item.text" style="list-style: none;">
                  <div class="message-data text-right" v-if="item.from === 'others'">
                  </div>
                  <div class="message other-message float-right" v-if="item.from === 'others'">{{ item.text }}</div>
                  <div class="message-data" v-else>
                  </div>
                  <div class="message my-message" v-else>{{ item.text }}</div>
                </li>
              </ul>
              <div class="chat-message clearfix">
                <v-row>
                  <v-col cols="11">
                    <v-text-field placeholder="Escribe un mensaje aquí..." variant="outlined" v-model="messages"
                      @keyup.enter="sendMessage()"></v-text-field>
                  </v-col>
                  <v-col cols="1" class="mt-3">
                    <v-btn prepend-icon="fa fa-paper-plane" @click="sendMessage()">
                      ENVIAR
                    </v-btn>
                  </v-col>
                </v-row>
              </div>
            </div>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script setup>
import { socket } from "../services/socket";
import { ref, onMounted } from 'vue';

const messages = ref('');
const data = ref([]);
const nick = ref('Alejandro');

const sendMessage = () => {
  if (messages.value !== '') {
    const message = {
      from: 'me',
      text: messages.value
    };

    socket.emit('chat message', {
      nick: nick.value,
      message: message
    });

    // Limpia el campo de mensajes después de enviarlo
    messages.value = '';
  }
};

onMounted(() => {
  socket.on('chat message', (message) => {
    data.value.push({
      from: 'others',
      text: message // Corregido para acceder directamente a message.text
    });

    // Desplázate al final de la lista de mensajes después de recibir uno nuevo
    setTimeout(() => {
      const chatHistory = document.querySelector(".chat-history");
      chatHistory.scrollTop = chatHistory.scrollHeight;
    }, 0);
  });
});
</script>

<style lang="css" scoped>
@import url('https://fonts.googleapis.com/css2?family=Alegreya+Sans+SC:wght@700&display=swap');

.chat-app .people-list {
  width: 280px;
  position: absolute;
  left: 0;
  top: 0;
  padding: 20px;
  z-index: 7
}

.chat-app .chat {
  margin-left: 280px;
}

.people-list {
  -moz-transition: .5s;
  -o-transition: .5s;
  -webkit-transition: .5s;
  transition: .5s
}

.people-list .chat-list li {
  padding: 10px 15px;
  list-style: none;
  border-radius: 3px
}

.people-list .chat-list li:hover {
  background: #efefef;
  cursor: pointer;
  color: black !important;
  transition: background-color 0.3s ease, color 0.3s ease;
}

.people-list .chat-list li.active {
  background: #efefef
}

.people-list .chat-list li .name {
  font-size: 15px;
}

.people-list .chat-list img {
  width: 45px;
  border-radius: 50%
}

.people-list img {
  float: left;
  border-radius: 50%
}

.people-list .about {
  float: left;
  padding-left: 8px
}

.people-list .status {
  color: #999;
  font-size: 13px
}

.chat .chat-header {
  padding: 15px 20px;
  /* border-bottom: 2px solid #f4f7f6 */
}

.chat .chat-header img {
  float: left;
  border-radius: 40px;
  width: 40px
}

.chat .chat-header .chat-about {
  float: left;
}

.chat .chat-history {
  padding: 20px;
}

.chat .chat-history ul {
  padding: 0
}

.chat .chat-history ul li {
  list-style: none;
  margin-bottom: 30px
}

.chat .chat-history ul li:last-child {
  margin-bottom: 0px
}

.chat .chat-history .message-data {
  margin-bottom: 15px
}

.chat .chat-history .message-data img {
  border-radius: 40px;
  width: 40px
}

.chat .chat-history .message-data-time {
  color: #434651;
  padding-left: 6px
}

.chat .chat-history .message {
  color: #444;
  padding: 18px 20px;
  line-height: 26px;
  font-size: 16px;
  border-radius: 7px;
  display: inline-block;
  position: relative
}

.chat .chat-history .message:after {
  bottom: 100%;
  left: 7%;
  border: solid transparent;
  content: " ";
  height: 0;
  width: 0;
  position: absolute;
  pointer-events: none;
  border-width: 10px;
  margin-left: -10px
}

.chat .chat-history .my-message {
  background: #E53935;
  color: white;
}

.chat .chat-history .my-message:after {
  bottom: 100%;
  left: 30px;
  border: solid transparent;
  content: " ";
  height: 0;
  width: 0;
  position: absolute;
  pointer-events: none;
  border-width: 10px;
  margin-left: -10px
}

.chat .chat-history .other-message {
  background: #e8f1f3;
  text-align: right
}

.chat .chat-history .other-message:after {
  left: 93%
}

.chat .chat-message {
  padding: 20px
}

.online,
.offline,
.me {
  margin-right: 2px;
  font-size: 8px;
  vertical-align: middle
}

.online {
  color: #86c541
}

.offline {
  color: #e47297
}

.me {
  color: #1d8ecd
}

.float-right {
  float: right
}

.clearfix:after {
  visibility: hidden;
  display: block;
  font-size: 0;
  content: " ";
  clear: both;
  height: 0
}

@media only screen and (max-width: 767px) {
  .chat-app .people-list {
    height: 465px;
    width: 100%;
    overflow-x: auto;
    background: #fff;
    left: -400px;
    display: none
  }

  .chat-app .people-list.open {
    left: 0
  }

  .chat-app .chat {
    margin: 0
  }

  /* .chat-app .chat .chat-header {
    border-radius: 0.55rem 0.55rem 0 0
  } */

  .chat-app .chat-history {
    height: 300px;
    overflow-x: auto
  }
}

@media only screen and (min-width: 768px) and (max-width: 992px) {
  .chat-app .chat-list {
    height: 650px;
    overflow-x: auto
  }

  .chat-app .chat-history {
    height: 600px;
    overflow-x: auto
  }
}

@media only screen and (min-device-width: 768px) and (max-device-width: 1024px) and (orientation: landscape) and (-webkit-min-device-pixel-ratio: 1) {
  .chat-app .chat-list {
    height: 480px;
    overflow-x: auto
  }

  .chat-app .chat-history {
    height: calc(100vh - 350px);
    overflow-x: auto
  }
}

.chat-history {
  height: 100%;
}

.title {
  margin-left: 20px;
  font-family: 'Alegreya Sans SC', sans-serif !important;
}

.background {
  background-image: url('../assets/images/chat2.jpg');
  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;
  height: 100%;
}
</style>