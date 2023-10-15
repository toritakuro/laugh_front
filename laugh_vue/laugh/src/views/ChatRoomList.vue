<template>
    <div class="d-flex">
      <v-card
      class="mx-0 py-4 px-2"
      width="40%"
      >
        <v-toolbar
        color="orange-darken-1"
        style="border-radius: 4px;"
        >
          <v-toolbar-title>Chat List</v-toolbar-title>
          <v-btn icon>
            <v-icon>mdi-magnify</v-icon>
          </v-btn>
        </v-toolbar>
  
        <v-list class="room-list-wrap" lines="two" style="height: 90%">
            <div>
              <div v-for="(item, index) in chat" :key="index">
                <div 
                class="d-flex align-center listItem"
                style="border-radius: 2px;"
                @click="getChatDetail(item)">
                  <v-avatar>
                    <span class="white--text">
                      画像
                    </span>
                  </v-avatar>
                  <div class="pa-4">
                    <v-list-item-title>{{ item.name }}</v-list-item-title>
                    <v-list-item-subtitle>{{ item.message }}</v-list-item-subtitle>
                  </div>
                </div>
                <v-divider :thickness="2" class="ml-10 mr-2"></v-divider>
              </div>
            </div>
        </v-list>
      </v-card>
      <div style="width: 100%;">
        <ChatDetail :chatDetailData='chatDetailRef'></ChatDetail>
      </div>
    </div>
</template>


<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { useRoute } from 'vue-router';
import { useStore } from 'vuex'
import http from "@/http-common";
import type Chat from "@/types/Chat";
import ChatDetail from './ChatDetail.vue';

const store = useStore();

const chat = ref<Chat[]>([]);
const route = useRoute();
const userId = store.getters['user/getUserId'];
const userType = store.getters['user/getUserType'];
const chatDetailRef = ref<Chat>();

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

const getChatDetail = (chat: Chat) => {
  chatDetailRef.value = chat;
};

// マウント時にデータを取得し代入する
onMounted(() => {
  getChatRoom();
});

</script>

<style scoped>
.room-list-wrap::-webkit-scrollbar {
  display: none;
}
.listItem:hover {
  background-color: rgb(192, 185, 185);
}
</style>