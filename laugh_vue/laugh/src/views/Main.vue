<template>
  <v-app>
    <v-app-bar color="#FAA20E"  height="28" app>
      <v-row no-gutters class="fill-height">
        <v-col class="d-flex align-center justify-center">
          <span style="color: #FFFFFF;">
            ピッタリのタッグ、見つけよう。構成作家×お笑い芸人
          </span>
        </v-col>
      </v-row>
    </v-app-bar>
    <v-app-bar id="app-bar" height="80" app>
      <v-toolbar-title style="min-width: 160px; max-width: 250px;">
          <div class="hdr-logo">
            <router-link to="/top">
              <img class="logo-img" src="/img/laugh-logo.png" alt="Laugh Header">
            </router-link>
          </div>
      </v-toolbar-title>

      <div class="hdr-menu-mth">
        <v-menu open-on-hover >
          <template v-slot:activator="{ props }">
            <div class="menu-btn" v-bind="props">
              <v-icon :size="40" color="#FAA20E">mdi-handshake</v-icon>
              <div>マッチング</div>
            </div>
          </template>
          <v-list class="hdr-item">
            <v-list-item
              v-for="(item, index) in itemsMatching"
              :key="index"
              :to="item.link"
              @click="reloadPage(item.link)">
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </div>
      <div class="hdr-menu-ogr">
        <v-menu open-on-hover >
          <template v-slot:activator="{ props }">
            <div class="menu-btn" v-bind="props">
              <v-icon :size="40" color="#FAA20E">mdi-brush</v-icon>
              <div>大喜利</div>
            </div>
          </template>
          <v-list class="hdr-item">
            <v-list-item
              v-for="(item, index) in itemsOgiri"
              :key="index"
              :to="item.link"
              @click="reloadPage(item.link)">
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </div>
      <div class="hdr-menu-mpg">
        <v-menu open-on-hover >
          <template v-slot:activator="{ props }">
            <div class="menu-btn" v-bind="props">
              <v-icon :size="40" color="#FAA20E">mdi-account</v-icon>
              <div>マイページ</div>
            </div>
          </template>
          <v-list class="hdr-item">
            <v-list-item
              v-for="(item, index) in itemsMypage"
              :key="index"
              :to="item.link"
              @click="reloadPage(item.link)">
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </div>
      <v-spacer></v-spacer>
      <!-- ヘルプアイコン -->
      <router-link to="/help">
        <v-btn class="mr-6" icon text @click="showHelp">
          <v-icon :size="35" color="#FAA20E">mdi-help-circle</v-icon>
        </v-btn>
      </router-link>
      <!-- ログアウトアイコン -->
      <v-btn class="mr-10" icon @click="openLogoutDialog">
        <v-icon :size="35" color="#FAA20E">mdi-logout</v-icon>
      </v-btn>
      <v-dialog
        v-model="dialog"
        width="30%">
      <v-card>
        <v-card-text class="logout-message">
          ログアウトします。よろしいですか？
        </v-card-text>
        <v-card-actions class="logout-btn-wrap justify-space-around d-flex">
          <v-btn color="orange" @click=logout size="large">はい</v-btn>
          <v-btn color="'#F5F5F5'" @click="dialog = false" size="large">いいえ</v-btn>
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
        <v-row class="mainWrap">
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

<style scoped>
#app-bar {
  box-shadow: 0 3px 10px rgba(251, 140, 0, 1); /* 影の色#FB8C00を設定*/
}
.logo-img {
  width: 150px;
  margin-top: 20px;
}
.hdr-logo {
    margin-left: 16px;
}
.hdr-menu-mth {
  margin-top: 20px;
  border-radius: 8px;
}
.hdr-menu-ogr {
  margin-top: 20px;
  border-radius: 8px;
}
.hdr-menu-mpg {
  margin-top: 20px;
  border-radius: 8px;
}
.menu-btn {
  margin: 20px 10px;
  width: 120px;
  cursor: default;
}
.menu-btn div {
  width: 50px;
  font-size: 10px;
  color: #FAA20E;
  font-weight: bold;
}
.v-main {
  background-color: #F8F9FA;
}

/* メニューリストをホバーしたときのCSS */
.hdr-item .v-list-item-title:hover {
    color: #FB8C00;
}
.hdr-item .v-list-item-title {
  position: relative;
  padding-bottom: 5px;
}
.hdr-item .v-list-item-title:after {
  content: "";
  position: absolute;
  width: 0;
  height: 0.5px;
  bottom: 0;
  left: 50%;
  background-color: #FB8C00;
  transition: width 0.15s, left 0.15s;
}
.hdr-item .v-list-item-title:hover::after {
  width: 100%;
  left: 0;
}
.logout-message {
  background-color: #FB8C00;
  color: white;
  text-align: center;
}
.logout-btn-wrap {
  margin: 24px 0;
}
.mainWrap {
  max-height: calc(100vh - 180px);
  overflow-y: auto;
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
      { title: 'ユーザー一覧    ', link: '/top' },
      { title: 'チャット        ', link: '/chat' },
    ],

    itemsOgiri: [
      { title: '大喜利一覧      ', link: '/oogiri/list' },
      { title: 'お題投稿        ', link: '/oogiri/post' },
    ],

    itemsMypage: [
      { title: 'マイページ', link: '/mypage' },
      { title: '投稿一覧', link: '/posts/list' },
    ],
    dialog: false,
  }),
  components: {
    Message
  },
  methods: {
    openLogoutDialog() {
      this.dialog = true;
    },
    logout() {
      store.commit('token/removeToken');
      this.$router.push({ name: 'login' });
    },
    reloadPage(link) {
    if (this.$route.path === link) {
      this.$router.go(0);
    }
  }
  }
}
</script>
