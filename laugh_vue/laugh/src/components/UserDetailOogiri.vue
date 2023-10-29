<template>
  <div class="outline">
    <p v-for="item in oogiri" class="oogiriWrap">
      <h3 class="title">{{ item.themeContent }}</h3>
      <div class="answer" v-for="answer in item.answers">{{ answer.answerContent }}</div>
    </p>
  </div>
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
  const getOogiri = async (userId: string) => {
    const {data} = await http.get('/userDetail/oogiriAnswer',{
      params: {userId: userId}
      }
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
  .outline {
    border: 1px solid #efefef;
    padding: 10px;
    border-radius: 5px;
  }
  .oogiriWrap {
    margin-top: 20px;
  }
  h3 {
    border-bottom: 1px solid #efefef;
    position: relative;
    padding-bottom: 7px;
    margin-bottom: 12px;
    font-weight: bold;
  }
  h3::after {
    content: ".";
    line-height: 0;
    display: block;
    overflow: hidden;
    position: absolute;
    bottom: -1px;
    width: 30%;
    border-bottom: 1px solid #FB8C00;
  }
  .answer {
    font-weight: bold;
    margin-left: 12px;
    margin-bottom: 13px;
    padding-bottom: 1px;
    padding-left: 3px;
    border-bottom: 1px solid #efefef;
  }

  .status-icon { width:50px; }
  .img { width:100px; }
  .name { width:100px; }
  .active-term { width:80px; }
  </style>