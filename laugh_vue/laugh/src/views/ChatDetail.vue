<template>
  <v-container class="chat-detail-wrapper mx-1 py-2 px-12">
    <v-row class="text-center">
      <v-col cols="12">
        <v-card
          elevation="2"
          color="white lighten-5"
        >
          <v-card-title class="chat-user-name">{{ chatDetailData?.name }}</v-card-title>
          <v-divider color=""></v-divider>
          <div class="chat-detail" ref="scrollContainer">
            <v-card-text>
              <v-row>
                <v-col cols="12">
                  <v-container class="chat-message-wrap">
                    <v-row v-for="(item, index) in chatDetail?.chatList" :key="index">
                      <v-col class="py-0">
                        <div class="justify-center" v-if="!index || chatDetail.chatList[index-1].sendAt !== item.sendAt">{{ item.sendAt }}</div>
                        <div :class="{ 'balloon_l': !item.isMyMessage, 'balloon_r': item.isMyMessage }">
                          <div v-if="!item.isMyMessage" class="face_icon">
                            <v-avatar class="profile-icon" @click="redirectToDetails()">
                              <v-img
                                :aspect-ratio="1"
                                :src="chatDetailData.img || src"
                                cover
                              ></v-img>
                            </v-avatar>
                          </div>
                          <div class="d-flex">
                            <div v-if="item.isMyMessage" class="mx-2 send-time">{{ item.sendTime }}</div>
                            <div class="says" v-html="item.message"></div>
                            <div v-if="!item.isMyMessage" class="mx-2 send-time">{{ item.sendTime }}</div>
                          </div>
                        </div>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-col>
              </v-row>
            </v-card-text>
          </div>
        </v-card>
      </v-col>
      <v-card-text class="pt-0 d-flex">
        <v-container>
          <v-row>
            <v-col cols="10">
              <v-textarea
                v-model="newMessage"
                clearable
                auto-grow
                rows="2"
                counter
                :maxlength="500"
              ></v-textarea>
            </v-col>
            <v-col cols="2" align-self="end">
              <v-btn class="send-btn"
                color="orange-darken-1"
                @click="sendMessage"
                :disabled="!isInputValid"
              >
              <v-icon>mdi-play</v-icon> 送信
              </v-btn>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
    </v-row>
  </v-container>
</template>


<script setup lang="ts">
import { ref, computed, defineProps, watchEffect } from 'vue';
import http from "@/http-common";
import { useStore } from 'vuex'
import { useRouter } from 'vue-router';
import type Chat from "@/types/Chat";
import { nextTick } from 'vue';

const store = useStore();
const props = defineProps({
  chatDetailData: {
      type: Object,
      required: true
  }
});
const chatDetail = ref<Chat>();
const newMessage = ref('');
const userId = store.getters['user/getUserId'];
const userType = store.getters['user/getUserType'];
const src = ref("/img/man.svg");
const scrollContainer = ref<HTMLElement | null>(null);
const router = useRouter();
const targetUserType = userType == 1 ? 2 : 1;


// チャット詳細を取得
const getChatDetail = async () => {
  const roomId = props.chatDetailData.chatRoomId;
  const {data} = await http.get('chat/detail', {
    params: {
      chatRoomId: roomId,
      userId: userId
    }
  })
  chatDetail.value = data.data;
  scrollToBottom();
}

// 詳細描画時にメッセージ最下部までスクロール
const scrollToBottom = () => {
  nextTick(() => {
    const container = scrollContainer.value;
    if (container) {
      container.scrollTop = container.scrollHeight;
    }
  });
}

// 空文字チェック
const isInputValid = computed(() => {
  return newMessage.value.trim() !== '';
})

// メッセージを送信
const sendMessage = async() => {
  const roomId = props.chatDetailData.chatRoomId;
  const targetUserId = props.chatDetailData.targetUserId;
  const messageData = {
    chatRoomId: roomId,
    userType: userType,
    userId: userId,
    targetUserId: targetUserId,
    chatMessage: newMessage.value
  }
  await http.post('chat', messageData);
  newMessage.value = '';
  getChatDetail();
}

// ユーザー詳細へ遷移
const redirectToDetails = () => {
  router.push({ 
    name: 'userDetail',
    query: { 
      receiveUserId: props.chatDetailData.targetUserId,
      userType: targetUserType,
      sendUserId: userId
    }
  })
}

watchEffect(() => {
  if (props.chatDetailData && props.chatDetailData.chatRoomId) {
    getChatDetail();
  }
});

defineExpose({
  getChatDetail,
})
</script>

<style scoped>
.chat-detail-wrapper {
  width: 100%;
}
.chat-detail {
  min-height: 10vh;
  max-height: 50vh;
  overflow-y: scroll;
}
.chat-detail::-webkit-scrollbar{
  display: none;
}

.chat-message-wrap {
  overflow-y: scroll;
}
.chat-message-wrap::-webkit-scrollbar {
  display: none;
}
.chat-user-name {
  background-color: #fb8c00;
  color: white;
  height: 64px;
}
.balloon_l,
.balloon_r {
  margin: 10px 0;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
}
.balloon_r {
  justify-content: flex-end;
}
.face_icon img {
  width: 80px;
  height: auto;
}
.balloon_r .face_icon {
  margin-left: 25px;
}
.balloon_l .face_icon {
  margin-right: 25px;
}
.balloon_r .face_icon {
  order: 2 !important;
}
.profile-icon {
  cursor: pointer;
}
.says {
  max-width: 300px;
  display: flex;
  flex-wrap: wrap;
  position: relative;
  padding: 10px;
  border-radius: 12px;
  background: #8ee7b6;
  box-sizing: border-box;
  margin: 0 !important;
  line-height: 1.5;
  text-align: left;
  word-break: break-word;
}
.says p {
  margin: 8px 0 0 !important;
}
.says p:first-child {
  margin-top: 0 !important;
}
.balloon_l .says:after {
  left: -26px;
  border-right: 22px solid #8ee7b6;
}
.balloon_r .says:after {
  right: -26px;
  border-left: 22px solid #8ee7b6;
}
.send-time {
  font-size: x-small;
  align-self: flex-end;
}
.send-btn {
  margin-bottom: 20px;
}
</style>