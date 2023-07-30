<template>
  <v-snackbar v-model="isMessageVisible" :color="result" location="top">
    <div v-for="msg in messages">{{ msg }}</div>
    <!-- <template v-slot:actions>
        <v-btn class="close-btn" color="black" @click="close">
          <v-icon>mdi-close</v-icon>
        </v-btn>
    </template> -->
  </v-snackbar>
</template>

<script setup>
import { computed ,ref} from 'vue'
import { useStore } from 'vuex'

const store = useStore()
const result = computed(() => store.state.message.result)
const isMessageVisible = computed(() => store.state.message.isMessageVisible)
const messages = computed(() => store.state.message.messages)

</script>

<style scoped>
.close-btn {
  position: absolute;
  top: 8px;
  right: 8px;
}
</style>