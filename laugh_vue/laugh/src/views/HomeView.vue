<script setup>
  import { computed } from 'vue'
  import { useStore } from 'vuex'

  import TheWelcome from '../components/TheWelcome.vue'

  const store = useStore()
  const count = computed(() => store.state.counter.count)
  const idToken = computed(() => store.state.token.idToken)

  const click =  () => {
    store.commit('saveIdToken', "idtoken")
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

