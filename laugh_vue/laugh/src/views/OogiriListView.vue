<template>
  <v-container>
    <!-- <div>
      <v-breadcrumbs class="laugh-breadcrumb" :items="items"></v-breadcrumbs>
    </div> -->
    <v-row>
      <v-col large cols="4">
        <v-btn class="mt-10 ml-4" color="orange-darken-1" width="240px" height="60px" style="font-size: 18px;">お題の投稿はここから</v-btn>
      </v-col>
      <v-row>
        <v-col cols="7">
          <v-col cols="12">
            <v-text-field v-model="themeUserName" label="投稿者検索" hide-details="true"></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-text-field v-model="answerUserName" label="回答者検索"></v-text-field>
          </v-col>
        </v-col>
        <v-col cols="4" class="d-flex align-center">
          <v-btn @click="searchOogiriByUser" color="#F5F5F5" width="150px" height="50px" style="font-size: 18px;">検   索</v-btn>
          <v-btn class="ml-4" @click="resetSearch" color="#F5F5F5" width="150px" height="50px" style="font-size: 18px;">リセット</v-btn>
        </v-col>      
      </v-row>
    </v-row>

    <v-card class="mb-6" color="#F5F5F5">
      <v-card-title class="ml-4">
        大喜利投稿一覧
        <span class="ml-8" style="font-size: 12px;">※お題の投稿順に表示されます。お題をクリックすると、回答された全件が表示されます。</span>
      </v-card-title>
    </v-card>

    <div style="height: 440px; overflow-y: auto;">
      <!-- ここにv-ifで0なら非表示とする -->
      <v-list  v-for="(item, i) in oogiri" :key="i">
        <v-col cols="12" id="pst-list">
          <v-row>
            <v-col cols="7">
              <router-link to="/">
                <v-list-item-title id="theme">
                  <v-icon>mdi mdi-card-text-outline</v-icon>
                  {{ item.themeContent }}
                </v-list-item-title>
              </router-link>
            </v-col>
            <v-col cols="3">
              <router-link to="/">
                <v-list-item-title id="pst">
                  <v-icon>mdi mdi-account-outline</v-icon>
                  {{ item.themeUserName }}
                </v-list-item-title>
              </router-link>
            </v-col>
            <v-col cols="2">
              <v-list-item-title>回答数 {{ item.answerCount }}件</v-list-item-title>
            </v-col>
          </v-row>

          <template v-for="(answer, i) in item.answers" :key="answer.answerId">
            <v-col cols="12">
              <v-row>
                <v-col cols="8">
                    <v-list-item-subtitle>
                      {{ answer.answerContent }}
                    </v-list-item-subtitle>
                </v-col>
                <v-col cols="4">
                  <router-link to="/">
                    <v-list-item-subtitle id="ans-name">
                      {{ answer.answerUserName }}
                    </v-list-item-subtitle>
                  </router-link>
                </v-col>
              </v-row>
            </v-col>
          </template>

          <v-divider class="mt-2"></v-divider>
        </v-col>
      </v-list>
    </div> 
  </v-container>
</template>

<style scoped>
.laugh-breadcrumb :hover {
  color: #FB8C00; /* ホバー時の色 */
}
#theme {
  color: #6495ED; /* リンクの初期色 */
  font-size: 18px;
}
#pst {
  color: #6495ED; /* リンクの初期色 */
  font-size: 18px;
}
#ans-name {
  color: #6495ED; /* リンクの初期色 */
}
.v-list a {
  text-decoration:none;
  color:inherit
}
#pst-list {
  margin-top: -24px;
}
.template {
  background-color: #F8F9FA;
}
</style>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import type Oogiri from "@/types/Oogiri";
import http from "@/http-common";

// 大喜利のデータ
const oogiri = ref<Oogiri[]>([]);
const getOogiri = async () => {
  const {data} = await http.get('oogiri', {
    params: {
      page: 1
    }
  })
  console.log(data);
  oogiri.value = data.data;
  console.log(oogiri);
}

// コンポーネントがマウントされたときに大喜利のデータを取得
onMounted(() => {
  getOogiri();
});

// 投稿者、回答者の検索
const themeUserName = ref("");
const answerUserName = ref("");
const page = ref(1);
const searchOogiriByUser = async () => {
  try {
    const { data } = await http.get('/oogiri/user', {
      params: {
        themeUserName: themeUserName.value,
        answerUserName: answerUserName.value,
        page: page.value
      }
    });

    if (data && data.data) {
      oogiri.value = data.data; // この行で取得したデータをoogiriにセット
      console.log(data.data);
    }
  } catch (error) {
    console.error("API呼び出しエラー:", error);
  }
}

const resetSearch = async () => {
  themeUserName.value = "";
  answerUserName.value = "";
  await getOogiri(); // 全件データを再取得
}


// @RequestMapping(path = "/user", method = RequestMethod.GET)
//     public ResponseEntity<?> getOogiriByUser(@RequestParam String themeUserName, String answerUserName, int page) {
//         // お題IDリスト
//         List<Integer> themeIds = new ArrayList<>();


// パンくずリストのデータ
// const items = ref([
//   {
//     text: 'HOME',
//     disabled: false,
//     href: '##########',
//   },
//   {
//     text: '大喜利投稿一覧',
//     disabled: false,
//     href: '##########',
//   },
// ]);

</script>