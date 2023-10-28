<template>
   <h1>{{ oogiri }}</h1>
   <h1>aaa</h1>
   <h1>aaa</h1>
</template>
  
  <script setup lang="ts">
  import { computed, ref } from 'vue'
  import { useRouter , useRoute} from 'vue-router';
  import { useStore } from 'vuex'
  import type Laugh from "@/types/Laugh";
  import http from "@/http-common";
  
  const store = useStore()
  const router = useRouter()
  const userId = computed(() => store.state.user.userId)
  const oogiri = ref<any[]>([])
  const route = useRoute()
  /** 大喜利回答一覧を取得する */
  const getOogiri = async (userId: number) => {
    const {data} = await http.get('/userDetail/oogiriAnswer',{
      params: {
        userId: userId
      }}
    )
    oogiri.value = data.data;
  }
  
  /** ユーザ詳細へ遷移 */
  const displayUser = (laugh:Laugh) => {
    router.push({ path: '/home', query: { userId: laugh.targetUserId }  })
  }
  
  defineExpose({
    getOogiri,
  })
  </script>
  
  <style scoped>
  .status-icon { width:50px; }
  .img { width:100px; }
  .name { width:100px; }
  .active-term { width:80px; }
  </style>