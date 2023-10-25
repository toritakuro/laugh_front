<template>
  <v-container>

    <v-row dense>
      <v-col cols="8" class="mr-10">
        <v-textarea
         label="お 題"
         v-model="question"
         rows="1" 
         auto-grow 
         :maxlength="100"
         counter
        ></v-textarea>
        <div class="theme-alt">※文字数は100文字までです。</div>
      </v-col>
      <v-col cols="2">
        <v-btn color="orange-darken-1" @click="submitForm" width="200" height="56" style="font-size: large;">投  稿</v-btn>
      </v-col>
    </v-row>
    
    <v-card color="#F5F5F5">
      <v-card-title class="ml-4" >投稿済みのお題一覧
        <span class="ml-8" style="font-size: 12px;">※回答数が0件のお題は、クリックすると編集・削除ができます。</span>
      </v-card-title>
    </v-card>

    <v-row v-for="(item, i) in oogiri" :key="i" class="mb-2">
      <v-col cols="7">
        <router-link to="/">
          <v-list-item-title id="theme">
            <v-icon>mdi mdi-card-text-outline</v-icon>
          </v-list-item-title>
        </router-link>
      </v-col>
      
      <v-col cols="1">
        <v-btn icon>
          <v-icon>mdi-pencil</v-icon>
        </v-btn>
      </v-col>
    </v-row>

  </v-container>
</template>

<style scoped>


</style>

<script setup lang="ts">
// コンポーネント内で名前付きエクスポートを行う
const name = ref("");
const categories = ["テスト１", "テスト2", "テスト3"];
const selectedCategory = ref(null);
const question = ref("");

const submitForm = () => {
  console.log("Form Submitted", {
    name: name.value,
    category: selectedCategory.value,
    question: question.value
  });
};

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
  oogiri.value = data;
}

// コンポーネントがマウントされたときに大喜利のデータを取得
onMounted(() => {
  getOogiri();
});

</script>
