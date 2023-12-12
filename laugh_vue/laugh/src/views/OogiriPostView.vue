<template>
  <v-container>
    <v-row dense>
      <v-col cols="8" class="mr-10">
        <v-textarea
          class="mt-8"
          label="お 題"
          v-model="newTheme"
          rows="1" 
          auto-grow 
          :maxlength="100"
          counter>
        </v-textarea>
        <div class="pst-note">※文字数は100文字までです。</div>
      </v-col>
      <v-col cols="2">
        <v-btn 
          @click="regTheme"
          :disabled="!isInputValid"
          class="mt-8"
          color="orange-darken-1"
          width="200"
          height="56"
          style="font-size: large;">
          投  稿
        </v-btn>
      </v-col>
    </v-row>

    <v-card class="mb-1" color="#F5F5F5">
      <v-card-title class="ml-4" >投稿済みのお題一覧
        <span class="ml-8" style="font-size: 12px;">※回答数が0件のお題は削除できます。</span>
      </v-card-title>
    </v-card>

    <div style="height: 460px; overflow-y: auto;">
      <div v-for="(item, i) in oogiri" :key="i">
        <v-list v-if="item.themeUserId == userId">
          <v-row no-gutters id="theme-height">
            <v-col cols="9">
              <router-link :to="{ path: '/oogiri/detail', query: { themeId: item.themeId } }">
                <v-list-item-title id="theme">
                  <v-icon color="orange-darken-1">mdi mdi-note-text-outline</v-icon>
                  {{ item.themeContent }}
                </v-list-item-title>
              </router-link>
            </v-col>
            <v-col cols="2">
              <v-list-item-title>回答数 {{ item.answerCount }}件</v-list-item-title>
            </v-col>
            <v-col cols="1">
              <v-btn
                v-if="item.answerCount === 0 && item.themeUserId === userId"
                class="mb-1"
                @click="openDeleteDialog(item.themeId)"
                size="x-small"
                icon
                color="orange-darken-1">
                <v-icon>mdi-trash-can-outline</v-icon>
              </v-btn>
            </v-col>
          </v-row>
          <v-divider class="mt-2"></v-divider>
        </v-list>
      </div>
    </div>
    <!-- 削除モーダル -->
    <v-dialog v-model="showDialog" width="auto">
      <v-card>
        <v-card-text style="background-color:#FB8C00; color: white;">
          このお題を削除します。よろしいですか？
        </v-card-text>
        <v-card-actions class="justify-center d-flex">
          <v-btn color=#FB8C00 @click="deleteTheme(currentThemeId)">はい</v-btn>
          <v-btn @click="showDialog = false">いいえ</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<style scoped>
.pst-note {
  margin: -20px 0 30px 10px;
}
#theme-height {
  height: 30px;
}
#theme {
  color: #6495ED; /* リンクの初期色 */
  font-size: 18px;
}
#theme:hover {
  color: #FB8C00;
}
.v-list a {
  text-decoration:none;
  color:inherit
}
</style>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import type Oogiri from "@/types/Oogiri";
import http from "@/http-common";
import { useStore } from 'vuex'

const oogiri = ref<Oogiri[]>([]);
const newTheme = ref('');
const store = useStore();
const userId = store.getters['user/getUserId']; 

const getOogiri = async () => {
  const {data} = await http.get('oogiri', {
    params: {
      page: 1
    }
  })
  oogiri.value = data.data;
}

// コンポーネントがマウントされたときに大喜利のデータを取得
onMounted(() => {
  getOogiri();
});

// お題の投稿
const regTheme = async() => {
  const themeData = {
    userId: userId,
    themeContent: newTheme.value
  }
  await http.post('oogiri', themeData);
  newTheme.value = '';
  getOogiri();
}

// 空文字チェック
const isInputValid = computed(() => {
  return newTheme.value.trim() !== '';
})

// お題を削除する
const showDialog = ref(false);
const currentThemeId = ref(0);
const openDeleteDialog = (themeId:number) => {
  currentThemeId.value = themeId;
  showDialog.value = true;
}
const deleteTheme = async (themeId:number) => {
  try {
    await http.post('oogiri/theme/delete', {
      themeId: themeId
    });
    showDialog.value = false;
    getOogiri();  // お題のリストを再取得
  } catch (error) {
    console.error("Error deleting theme:", error);
  }
}
</script>
