<template>
  <div>
    <v-form>
      <v-container class="ma-0">
        <v-row>
          <v-col
            cols="2"
            md="4"
          >
          <v-text-field
            v-model="title"
            :counter="10"
            label="タイトル"
            required
          ></v-text-field>
          </v-col>
          <v-col
            cols="12"
            md="4"
          >
          <v-btn @click="reg" depressed color="primary">登録</v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-form>
    <v-table>
    <thead>
      <tr>
        <th class="text-left">ID</th>
        <th class="text-left">名前</th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="item in demos"
        :key="item.id"
      >
        <td>{{ item.id }}</td>
        <td>{{ item.title }}</td>
      </tr>
    </tbody>
   </v-table>
  
   <div>vuexでIdTokenを表示</div>
   {{ idToken }}
</div>
</template>

<script setup lang="ts">
// TypeScript が有効
import axios from "axios";
import { computed, ref, onMounted } from 'vue'
import { useStore } from 'vuex'
import DemoService from '@/services/DemoService';
import type ResponseData from "@/types/ResponseData";
import type Demo from "@/types/Demo";

const demos = ref([] as Demo[])
const title = ref('');
const store = useStore()

/** HomeViewで設定したidToken */
const idToken = computed(() => store.state.token.idToken)
const reg = async () => {
  // オブジェクトで置き換えたい
  let data = {
    title: title.value,
  };  
  DemoService.create(data).then((response: ResponseData) => {
    getData();
  });
}

const getData = async () => {
  DemoService.getAll()
  .then((response: ResponseData) => 
  {
    // demos.value = response.data;
    // console.log(response.data);
  });
};

onMounted(() => {
  getData();
})


</script>