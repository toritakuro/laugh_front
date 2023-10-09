<template>
    <v-container
      class="py-8 px-6"
      style="width: 80%;"
      fluid
    >
      <v-col cols="auto">
        <v-btn density="default" icon="mdi-cloud-upload" @click="openModal"></v-btn>
      </v-col>

      <!-- <v-card>
        <v-img :src="'https://c4claugh.s3.ap-northeast-1.amazonaws.com/1/s4McxRbLyOlOoQx2.jpg'"></v-img>
      </v-card> -->

      <v-menu
        v-model="uplodadModalFlg"
        width="600"
        class="bordered-dialog"
      >
      <v-form>
        <v-text-field
          v-model="contentsReq.title"
          label="タイトル"
          class="ml-12 mt-8"
        ></v-text-field>
        <v-text-field
          v-model="contentsReq.detail"
          label="説明文"
          class="ml-12 mt-4"
        ></v-text-field>
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
        <FileComponent @set-file="setFile"/>
        <!-- <v-file-input
              accept="image/*"
              label="画像ファイルをアップロードしてください"
            ></v-file-input> -->

        <v-btn 
          block 
          class="mt-2" 
          color="orange" 
          @click="uploadFile"
        >送信</v-btn>
      </v-form>
      </v-menu>


      <v-row>
      <v-col
        v-for="(item, i) in contents"
        :key = "i"
        cols = "4"
        class = "mb-4"
      >
        <v-card @click="downloadFile(item.contentPath)">
          <v-list>
              <v-img
                :aspect-ratio="1.777"
                :src="item.topImgPath"
                cover
                class="rounded-lg"
                width="200px"
            ></v-img>
            <!-- <div class="d-flex align-center">
              <v-card-title>{{ item.title.split('.')[0] }}</v-card-title>
              <v-card-subtitle>{{ item.detail }}</v-card-subtitle>
            </div> -->

            <div>
              <v-card-title class="mt-4">{{ item.title.split('.')[0] }}</v-card-title>
            </div>
            <div>
              <v-card-subtitle>{{ item.detail }}</v-card-subtitle>
            </div>
            <div>
              <v-card-subtitle class="mt-8 text-end">投稿日時:{{ formatDate(item.createAt) }}</v-card-subtitle>
            </div>

          </v-list>
        </v-card>
      </v-col>
      </v-row>
    </v-container>

</template>

<script setup lang="ts">
import { computed, ref, onMounted, watch } from 'vue'
import { useRouter } from 'vue-router';
import { useStore } from 'vuex'
import type Laugh from "@/types/Laugh";
import type Content from "@/types/Content";
import http from "@/http-common";
import ImageModalComponent from "../components/ImageModalComponent.vue"
import FileComponent from "../components/FileComponent.vue"

const store = useStore()
const router = useRouter()
const userId = computed(() => store.state.user.userId)
const laughs = ref<Laugh[]>([])
const contents = ref<Content[]>([])
const uplodadModalFlg = ref<boolean>(false);

const openModal = () => {
  uplodadModalFlg.value = true
}

const contentsReq = ref<Content>({
  userId : 3 ,
  title : '' ,
  detail : '' ,
  topImg : '' ,
  topImgPath : '' ,
  content : '' ,
  contentPath : '',
  createAt : null,
  UpdateAt : null
})


// マウント時にデータを取得し代入する
onMounted(() => {
  getContent();
});

// 画像登録用
const modalFlg = ref(false)

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
watch(cropImg, (newValue) => {
  contentsReq.value.topImg = newValue;
  //contentsReq.value.content = newValue;
  // if (newValue !== '') {
  //   let parts = newValue.split(',');
  //   contentsReq.value.topImg = parts[1];
  //   contentsReq.value.content = parts[1];
  // }
})

const fileExtension = ref('');
const setFile = (base64:string, extension:string) => {
  console.log(extension)
  fileExtension.value = extension;
  contentsReq.value.content = base64;
}

const uploadFile = async () => {
  
  contentsReq.value.title = contentsReq.value.title + '.' + fileExtension.value
  console.log(contentsReq.value)
 
  http.post("/mypage/uploadFile", contentsReq.value)
  .then(() => {
    uplodadModalFlg.value = false;
    getContent();
  })
  .catch((error) => {
    // エラー発生時の処理
    console.log(error)
  })
  .finally(() => {
    // 正常終了・エラー問わず必ず行う処理
  });
}

// マウント時にデータを取得し代入する
onMounted(() => {
  getContent();
});


const getContent = async () => {
  const {data} = await http.get('/mypage/getFile',{
    params: {
      userId: 3
    }}
    )
  // data.data.title.value = data.data.title.split(".")[0]
  contents.value = data.data
  // contents.value.title = contents.value.title.split(".")[0]
  console.log(contents.value)
}

const downloadFile = (path: string) => {
  window.open(path, '_blank');
}

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // 月は0-11の範囲なので+1
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  return year + '/' + month + '/' + day + ' ' + hours + ':' + minutes;
}

</script>

<style scoped>
.v-container {
  background-color: #F8F9FA;
}
.status-icon { width:50px; }
.img { width:100px; }
.name { width:100px; }
.active-term { width:80px; }
.v-overlay {
    background-color: rgba(255, 255, 255, 1)!important;  /* 0.3 の透明度で設定。この値を小さくすることで、背景の暗さを減少させることができます。 */
}
.bordered-dialog {
  width: 800px;
  height: 600px;
  border: 1px solid ;
  background-color: rgba(255, 255, 255, 1);
  margin: 100px auto;
}


.step-box > li.done > .step-desc {
  color: orange;
  font-weight: bold;
}

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
  margin-left: 52px;
  margin-top: 8px;
}


</style>