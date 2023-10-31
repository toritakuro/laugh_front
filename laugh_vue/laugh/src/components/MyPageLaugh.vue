<template>
  <v-table >
    <tbody>
      <template v-for="(item, i) in laughs" :key="i">
      <v-hover v-slot="{ isHovering, props }">
        <tr
          :class="{ 'tr-hover': isHovering }"
          v-bind="props"
          @click="displayUser(item)"
        >
        <td class="status-icon">
            <v-icon v-if='item.status == 10 || item.status == 11' size="x-large" color="#EC407A" icon="mdi-handshake" />
            <v-icon v-if='item.mySendLough == false && item.status == 0' size="x-large" color="#42A5F5" icon="mdi-timer-sand" />
            <v-icon v-if='item.mySendLough && item.status == 0' size="x-large" color="#42A5F5" icon="mdi-send-clock" />
        </td>
        <td class="img">
          <v-avatar color="surface-variant">
          <v-img
            aspect-ratio="16/9"
            cover
            src="https://cdn.vuetifyjs.com/images/parallax/material.jpg"
          ></v-img>
          </v-avatar>
          </td>
          <td  class="name">{{ item.name }}</td>
          <td class="text-right active-term">{{ item.activeTermYear }}年目</td>
          <td>
            <v-chip
              class="ma-2"
              :color="item.status === 11 || item.status === 10 ? '#D81B60' : '#1E88E5'"
            >{{ item.statusStr }} </v-chip>
          </td>
        </tr>
        </v-hover>
      </template>
    </tbody>
  </v-table>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router';
import { useStore } from 'vuex'
import type Laugh from "@/types/Laugh";
import http from "@/http-common";

const store = useStore()
const router = useRouter()
const laughs = ref<Laugh[]>([])

/** Laugh一覧を取得する */
const getLaugh = async () => {
  const {data} = await http.get('/mypage/laugh',{
    params: {
      userId: 5,
      userType: 1,
    }}
  )
  laughs.value = data.data;
}

/** ユーザ詳細へ遷移 */
const displayUser = (laugh:Laugh) => {
  let targetUserType = 0;
  // 遷移先ユーザのユーザタイプを設定
  if (store.state.user.userType == 1) {
    targetUserType = 2
  } else {
    targetUserType = 1
  }
  router.push({ name: 'userDetail', query: { receiveUserId: laugh.targetUserId, userType: targetUserType, sendUserId: store.state.user.userId }  })
}

defineExpose({
  getLaugh,
})
</script>

<style scoped>
.status-icon { width:50px; }
.img { width:100px; }
.name { width:100px; }
.active-term { width:80px; }
</style>