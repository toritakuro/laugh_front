<template>
  <v-app>
    <!-- ヘッダー部分 -->
    <v-app-bar app  height="80" class="app-bar-flex">
      <v-toolbar-title style="min-width: 200px;">
        <a href="" class="header-logo">
          <img class="logo-image" src="/img/laugh-logo.png" alt="Laugh Header">
        </a>
      </v-toolbar-title>
      
      <div class="hdr-menu">
        <v-menu open-on-hover >
          <template v-slot:activator="{ props }">
            <div class="menu-btn" v-bind="props">
              <v-icon>mdi-handshake</v-icon>
              マッチング
            </div>
          </template>
          <v-list>
            <v-list-item
            v-for="(item, index) in itemsMatching"
            :key="index"
            :to="item.link"
            >
            <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </div>

      <div class="hdr-menu">
        <v-menu open-on-hover >
          <template v-slot:activator="{ props }">
            <div class="menu-btn" v-bind="props">
              <v-icon>mdi-brush</v-icon>
              大喜利
            </div>
          </template>
          <v-list>
            <v-list-item
            v-for="(item, index) in itemsOgiri"
            :key="index"
            :to="item.link"
            >
            <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </div>

      <div class="hdr-menu">
        <v-menu open-on-hover >
          <template v-slot:activator="{ props }">
            <div class="menu-btn" v-bind="props">
              <v-icon>mdi-account-heart</v-icon>
              マイページ
            </div>
          </template>
          <v-list>
            <v-list-item
            v-for="(item, index) in itemsMypage"
            :key="index"
            :to="item.link"
            >
            <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </div>

      <v-spacer></v-spacer>

      <v-btn text @click="showHelp">
        <v-icon>mdi-help-circle-outline</v-icon>
        ヘルプ
      </v-btn>

      <v-btn text @click="openLogoutDialog">
        <v-icon>mdi-logout</v-icon>
        ログアウト
      </v-btn>
      <v-dialog
        v-model="dialog"
        width="auto"
      >
      <v-card>
        <v-card-text style="background-color: #f57c00; color: white;">
          ログアウトします。よろしいですか？
        </v-card-text>
        <v-card-actions class="justify-center d-flex">
          <v-btn color="'#F5F5F5'" @click="dialog = false">閉じる</v-btn>
          <v-btn color="orange" @click=logout>はい</v-btn>
        </v-card-actions>
      </v-card>
      </v-dialog>
    </v-app-bar>

    <v-main>
      <v-container fluid>
        <v-row>
          <v-col cols="10" offset="1" class="pa-0">
            <Message></Message>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="10" offset="1" class="pa-0">
            <RouterView />
          </v-col>
        </v-row>
      </v-container>
      <!-- ここにメインコンテンツが入ってくる -->
    </v-main>

    <!-- フッター部分 -->
    <v-footer id="footer" app color="#F5F5F5">
      <v-col class="text-center">
        ©︎2023 - C4C_Cup A_Team
      </v-col>
    </v-footer>
  </v-app>
</template>


<style>
.app-bar-flex {
  display: flex;
  justify-content: space-between;
}

.logo-image {
  width: 150px;
  margin-top: 10px;
}

.header-logo {
    margin-left: 16px;
}

.hdr-menu {
  flex-grow: 1;
  display: flex;
  justify-content: center;
  margin-top: 40px;
}

.menu-btn {
  margin: 20px;
  width: 120px;
}
.v-main {
  background-color: #F8F9FA;
}

/* メニューリストをホバーしたときのCSS */
.v-list-item-title:hover {
    color: #ff9933;
}
.v-list-item-title {
  position: relative;
  padding-bottom: 5px;
}
.v-list-item-title:after {
  content: "";
  position: absolute;
  width: 0;
  height: 1px;
  bottom: 0;
  left: 50%;
  background-color: #ff9933;
  transition: width 0.2s, left 0.2s;
}
.v-list-item-title:hover::after {
  width: 100%;
  left: 0;
}
</style>

<script>
  import Message from '../components/MessageComponent.vue'
  import { ref } from 'vue'
  import store from "@/store"
  const cards = ['Today', 'Yesterday']
  const links = [
    ['mdi-account', 'マイページ', '/mypage'],
    ['mdi-home', 'ホーム', '/home'],
    ['mdi-bomb', 'デモ', '/demo'],
    ['mdi-bomb', 'Top', '/top'],
    ['mdi-bomb', 'Test', '/test'],
  ]

export default {
  data: () => ({
    itemsMatching: [
      { title: 'ユーザー一覧', link: '/user-list' },
      { title: 'チャット', link: '/chat' },
    ],

    itemsOgiri: [
      { title: '大喜利一覧', link: '/oogiri-list' },
      { title: 'お題投稿', link: '/oogiri-post' },
    ],

    itemsMypage: [
      { title: 'プロフィール編集', link: '/profile-edit' },
      { title: 'Laugh一覧', link: '/laugh-list' },
      { title: 'マッチング一覧', link: '/matching-list' },
      { title: '投稿一覧', link: '/posts-list' },
      { title: '退会(アカウント削除)', link: '/quit' },
    ],
    dialog: false,
  }),
  components: {
    Message
  },
  methods: {
  //   goToMyPage() {
  //     // マイページへの遷移処理
  //     this.$router.push({ name: 'MyPage' });
  //   },
  //   goToMatching() {
  //     // マッチングページへの遷移処理
  //     this.$router.push({ name: 'Matching' });
  //   },
  //   goToOther() {
  //     // その他ページへの遷移処理
  //     this.$router.push({ name: 'Other' });
  //   },
  //   showHelp() {
  //     // ヘルプページへ遷移
  //     this.$router.push({ name: 'Help' });
  //   },
    openLogoutDialog() {
      this.dialog = true;
    },
    logout() {
      store.commit('token/removeToken');
      this.$router.push({ name: 'login' });
    }
  }
}
</script>

<!-- <script setup lang="ts">
  import Message from '../components/MessageComponent.vue'
</script> -->