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

<!-- 画像トリミング新規登録はここを見る -->
<input ref="file" @change="setImage" type="file" name="image" accept="image/*" style="display: none;">
<div v-if="cropImg === ''" class="default profilePhoto" @click.prevent="showFileChooser">
  <v-img
    :aspect-ratio="1"
    :src="src"
  ></v-img>
</div>
<div v-if="cropImg !== ''" class="profilePhoto" @click.prevent="showFileChooser">
  <v-img
    :aspect-ratio="1"
    :src="cropImg"
    cover
    class="rounded-lg"
  ></v-img>
</div>
<ImageModalComponent :modelValue="modalFlg" :imgBase64="imgSrc" @update:modelValue="setModelValue" @update:imgValue="setImg"></ImageModalComponent>
<!-- 画像トリミング -->
</template>

<script setup lang="ts">
// TypeScript が有効
import axios from "axios";
import { computed, ref, onMounted } from 'vue'
import { useStore } from 'vuex'
import ImageModalComponent from "../components/ImageModalComponent.vue"
import DemoService from '@/services/DemoService';
import type ResponseData from "@/types/ResponseData";
import type Demo from "@/types/Demo";
import http from "@/http-common";
import type demo from "@/types/Demo";
import { reactive } from "vue";
const demos = ref([] as Demo[])
const ex7 = ref('red')
const title = ref('');
const store = useStore();

// 必要だ
const modalFlg = ref(false)
// 必要だ

// Demoで
let de = reactive<Demo>({});
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
// 20230928 松本画像作業
/** base64に変換 */
const imgSrc = ref('');
const cropImg = ref('');
const file = ref();
const src = ref("/img/man.svg");
const setImage = (e: any) => {
  const file = e.target.files[0];
  if (!file.type.includes('image/')) {
    alert('画像ファイルを選んでください');
    return;
  }
  if (typeof FileReader === 'function') {
    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target != null) {
        imgSrc.value = event.target.result as string;
        // 画像の変更にはreplaceが必要らしい
        //cropper.value.replace(event.target.result);
      }
    };
    reader.readAsDataURL(file);
  } else {
    alert('FileReader APIがサポートされていません');
  }
  // 時差が必要みたい
  setTimeout(() => {
    console.log(11);
    modalFlg.value = true;
  }, 200);
};
/** emitで受けるメソッド */
const setModelValue = (value:Boolean) => {
  modalFlg.value = false;
  file.value.value ='' // 初期化
} 
const setImg = (img:string) => {
  cropImg.value = img;
} 
const showFileChooser = () => {
  file.value.click();
};
// 必要だ
// 20230928 松本画像作業
const getData = async () => {
  try {
    const {data } = await http.get('/demo/list');
    de = data.data;
    console.log(de.id);
  } catch (error) {

  }
  
  
    // console.log("aaa");
    // console.log(response);
    // de = response.data;
    // console.log(de);
    // const responsea = await http.get('/demo/list');
    // console.log("bbb");
    // console.log(responsea);
    // de = responsea.data;
    // console.log(de);
  // DemoService.getAll()
  // .then((response: Demo) => 
  // {
  //   //console.log(response);
  //   // console.log(response.data);
  // });
};

// onMounted(() => {
//   getData();
// })
</script>
<style scoped>
.default {
  background-color: #efefef;
}
.default:hover {
  cursor: pointer
} 
.profilePhoto {
  width: 200px;
  height: 100px;
  border-radius: 8px;
}
</style>