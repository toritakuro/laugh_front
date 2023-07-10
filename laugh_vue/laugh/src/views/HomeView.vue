<script setup>
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

</script>

<template>
  <main>
    ho-mudesu
    <TheWelcome />
    {{ count }}
    <div @click="click">{{ idToken }}</div>
  </main>
</template>

