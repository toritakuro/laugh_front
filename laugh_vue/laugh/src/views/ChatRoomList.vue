<template>
    <div class="d-flex px-12 py-2">
      <v-card
      class="mx-1 py-2 px-2"
      width="40%"
      >
        <v-toolbar
        color="orange-darken-1"
        class="chat-list"
        >
          <v-toolbar-title>Chat List</v-toolbar-title>
        </v-toolbar>
        <v-list class="room-list-wrap" lines="two">
            <div>
              <div v-for="(item, index) in chat" :key="index">
                <div 
                class="d-flex align-center list-item"
                @click="getChatDetail(item)"
                >
                  <v-avatar>
                    <v-img v-if="item.img != null"
                      :aspect-ratio="1"
                      :src="item.img"
                      cover
                      class="rounded-lg profile_img"
                    ></v-img>
                    <v-img v-if="item.img == null"
                      :aspect-ratio="1"
                      :src="src"
                      cover
                      class="rounded-lg"
                    ></v-img>
                  </v-avatar>
                  <div class="pa-4">
                    <v-list-item-title class="user-name">{{ item.name }}</v-list-item-title>
                    <v-list-item-subtitle v-if="item.message != null" class="last-message">{{ item.message }}</v-list-item-subtitle>
                    <v-list-item-subtitle v-if="item.message == null" class="last-message">まだやり取りがありません</v-list-item-subtitle>
                  </div>
                  <v-btn v-if="item.unreadCount != 0"
                    class="unread-icon ma-1 small"
                    disabled="true"
                    icon
                    size="x-small"
                    color="orange-darken-1"
                  >
                    <p class="unread-number">{{ item.unreadCount }}</p>
                  </v-btn>
                </div>
                <v-divider :thickness="2" class="ml-10 mr-2"></v-divider>
              </div>
            </div>
        </v-list>
      </v-card>
      <div class="chat-detail">
        <ChatDetail :chatDetailData='chatDetailRef'></ChatDetail>
      </div>
    </div>
</template>


<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useStore } from 'vuex'
import http from "@/http-common";
import type Chat from "@/types/Chat";
import ChatDetail from './ChatDetail.vue';

const store = useStore();

const chat = ref<Chat[]>([]);
const userId = store.getters['user/getUserId'];
const userType = store.getters['user/getUserType'];
const chatDetailRef = ref<Chat>();
const src = ref("/img/man.svg");

// チャットリスト取得
const getChatRoom = async () => {
  const id = userId;
  const type = userType;
  const {data} = await http.get('chat', {
    params: {
      userId: id,
      userType: type
    }
  })
  chat.value = data.data;
}

// チャット詳細を表示
const getChatDetail = (chat: Chat) => {
  chatDetailRef.value = chat;
  chat.unreadCount = 0;
};

// マウント時にチャットリストを取得し代入する
onMounted(() => {
  getChatRoom();
});

</script>

<style scoped>
.chat-list {
  border-radius: 4px;
}
.room-list-wrap {
  height: 70vh;
}
.room-list-wrap::-webkit-scrollbar {
  display: none;
}
.list-item {
  height: 8vh;
  border-radius: 2px;
}
.list-item:hover {
  background-color: rgb(192, 185, 185);
  cursor: pointer;
}
.user-name {
  font-weight: bold;
  font-size: small;
}
.last-message {
  display: block;
  font-size: small;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  max-width: 28vh;
}
.unread-icon {
  position: absolute;
  right: 0;
  background-color: orange;
}
.unread-number {
  color: white;
  font-size: small;
}
.chat-detail {
  width: 100%;
}
</style>