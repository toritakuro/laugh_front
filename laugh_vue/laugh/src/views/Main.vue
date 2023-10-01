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

      <v-btn text @click="logout">
        <v-icon>mdi-logout</v-icon>
        ログアウト
      </v-btn>
    </v-app-bar>

    <v-main>
      <RouterView />
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

<script lang="ts">
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
  }),
}

  // methods: {
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
  //   logout() {
  //     // ログアウト処理
  //     // ここにログアウト処理を記述
  //   }
  // }
</script>