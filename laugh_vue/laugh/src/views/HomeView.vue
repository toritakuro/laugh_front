<script setup lang="ts">
  import ImgFileComponent from '../components/ImgFileComponent.vue'
  import { computed } from 'vue'
  import { useStore } from 'vuex'

  import TheWelcome from '../components/TheWelcome.vue'

  const store = useStore()
  const count = computed(() => store.state.counter.count)
  const idToken = computed(() => store.state.token.idToken)

  // login後、newIdTokenにつける
  const click =  () => {
    store.commit('saveIdToken', "newIdToken")
  }
  const setFile =  (f:File) => {
    console.log('親')
    console.log(f)
  }
  // emitで呼び出される処理を何に割り当てるのか
</script>

<template>
  <main>
    <v-file-input label="File input"></v-file-input>
    <div class="test">ここには適応されない</div>
    <!-- 呼び出し型(定義箇所はキャメルだがvueが変換してくれる)はケバブケース(-で区切る)がおすすめらしい-->
    <ImgFileComponent @set-file="setFile"/>
    <TheWelcome />
    {{ count }}
    <div @click="click">{{ idToken }}</div>
  </main>
</template>

