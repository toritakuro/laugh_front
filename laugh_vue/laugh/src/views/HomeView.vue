<script setup lang="ts">
  import ImgFileComponent from '../components/ImgFileComponent.vue'
  import { computed } from 'vue'
  import { useStore } from 'vuex'

  import TheWelcome from '../components/TheWelcome.vue'

  const store = useStore()
  const count = computed(() => store.state.counter.count)
  const idToken = computed(() => store.state.token.idToken)
  const userId = computed(() => store.state.user.userId);
  // login後、newIdTokenにつける
  const click =  () => {
    store.commit('token/saveIdToken', "newIdToken")
    console.log("aaa");
    store.commit('user/saveUserId', 3);
  }
  const setFile =  (base64:String) => {
    console.log(base64);
  }
  // emitで呼び出される処理を何に割り当てるのか
</script>

<template>
  <main>
    <v-file-input label="File input"></v-file-input>
    <div class="test">ここには適応されない</div>
    <ImgFileComponent @set-file="setFile"/>
    <TheWelcome />
    {{ count }}
    <div @click="click">ここ{{ idToken }}</div>
    <div>{{ userId }}</div>
  </main>
</template>

