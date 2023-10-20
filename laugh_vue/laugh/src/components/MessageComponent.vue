<template>
  <v-snackbar v-model="isMessageVisible" :color="result" location="top">
    <div v-for="msg in messages">{{ msg }}</div>
  </v-snackbar>
</template>

<script setup lang="ts">
import { computed ,ref} from 'vue'
import { useStore } from 'vuex'

const store = useStore()
const result = computed(() => store.state.message.result)
const isMessageVisible = computed(() => store.state.message.isMessageVisible)
const messages = computed(() => store.state.message.messages)
</script>