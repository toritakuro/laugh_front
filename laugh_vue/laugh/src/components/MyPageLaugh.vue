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
        <td class="img pa-0">
          <v-avatar color="surface-variant">
          <v-img
            :src="item.imgPath"
            cover
          ></v-img>
          </v-avatar>
          </td>
          <td class="name pa-0 font-weight-bold">{{ item.name }}</td>
          <td class="text-right active-term  pa-0">{{ item.activeTermYear }}年目</td>
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
      userId: store.state.user.userId,
      userType: store.state.user.userType
    }}
  )
  laughs.value = data.data;
}

const userType = store.getters['user/getUserType'];
/** ユーザ詳細へ遷移 */
const displayUser = (laugh:Laugh) => {
  if (userType == 1) {
    userType.value = 2
  } else {
    userType.value = 1
  }
  console.log(laugh.targetUserId)
  console.log(userType.targetUserId)
  console.log(store.state.user.userId)
  router.push({ name: 'userDetail', query: { receiveUserId: laugh.targetUserId, userType: userType, sendUserId: store.state.user.userId }  })
}

defineExpose({
  getLaugh,
})
</script>

<style scoped>
.status-icon { width:50px; }
.img { width:70px; }
.name { width:120px; }
.active-term { width:80px; }
.tr-hover { cursor: pointer; }
</style>