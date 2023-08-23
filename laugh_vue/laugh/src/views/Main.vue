<template>
  <v-app id="inspire">
    <v-navigation-drawer v-model="drawer">
      <v-sheet
        color="grey-lighten-4"
        class="pa-4"
      >
        <v-avatar
          class="mb-4"
          color="grey-darken-1"
          size="64"
        ></v-avatar>
        <div>お笑い太郎</div>
      </v-sheet>

      <v-divider></v-divider>

      <v-list>
        <v-list-item
          v-for="[icon, text, link] in links"
          :key="icon"
          :to="link"
        >
          <template v-slot:prepend>
            <v-icon>{{ icon }}</v-icon>
          </template>
          
          <v-list-item-title>{{ text }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-main>
      <Message></Message>
      <RouterView />
    </v-main>
  </v-app>
</template>
<script setup>
  import { ref } from 'vue'
  import Message from '../components/MessageComponent.vue'
  const cards = ['Today', 'Yesterday']
  const links = [
    ['mdi-home', 'ホーム', '/home'],
    ['mdi-bomb', 'デモ', '/demo'],
    ['mdi-bomb', 'TOP', '/top'],
  ]

  const drawer = ref(null)
</script>

<script>
  export default {
    data: () => ({
      cards: ['Today', 'Yesterday'],
      drawer: null,
      links: [
        ['mdi-inbox-arrow-down', 'Inbox'],
        ['mdi-send', 'Send'],
        ['mdi-delete', 'Trash'],
        ['mdi-alert-octagon', 'Spam'],
      ],
    }),
  }
</script>