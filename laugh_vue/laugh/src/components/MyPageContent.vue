<template>
    <v-container
      class="py-8 px-6"
      style="width: 70%;"
      fluid
    >

    <v-row>
      <v-col>
        <v-text-field
          label="ファイル名"
          density="compact"
          bg-color="#fffffff"
          @input="postName"
          v-model="searchName"
        ></v-text-field>
      </v-col>

      <v-col cols="auto" class="pb-16 text-end">
        <v-btn density="default" icon="mdi-cloud-upload" @click="openUploadModal"></v-btn>
      </v-col>
    </v-row>

      <v-menu
        v-model="uplodadModalFlg"
        width="600"
        class="bordered-dialog"
        
      >
        <v-form @click.stop>
          <v-text-field
            v-model="contentsReq.title"
            label="タイトル"
            placeholder="ここにタイトルを入力"
            class="ml-12 mt-8"
          ></v-text-field>
          <v-text-field
            v-model="contentsReq.detail"
            label="説明文"
            class="ml-12 mt-4"
          ></v-text-field>
          <v-radio-group 
              v-model="contentsReq.fileType" 
              inline
              class="ml-12 mt-4"
              >
              <v-radio
                label="動画"
                value="1"
                color="orange"
              ></v-radio>
              <v-radio
                label="PDF"
                value="2"
                color="orange"
              ></v-radio>
            </v-radio-group>
          <FileComponent @set-file="setFile"/>
          <!-- <v-file-input
                accept="image/*"
                label="画像ファイルをアップロードしてください"
              ></v-file-input> -->

          <v-btn 
            block 
            class="ml-12 mt-2" 
            color="orange" 
            @click="uploadFile"
          >アップロード</v-btn>
        </v-form>
      </v-menu>

      <v-icon size="48">mdi-movie-play</v-icon>
      <v-sheet class="rounded-lg  card-row">
      <v-row>
        <v-col
        v-for="(item, i) in mpContents"
        :key = "i"
        cols = "3"
        class = "mb-4"
        >
          
          <v-card class="pb-2">
            <!-- <v-img
                  :aspect-ratio="1.777"
                  :src="item.topImgPath"
                  cover
                  class="rounded-lg"
                  width="100%"
                  ></v-img></v-card> -->
                  <!-- <div class="d-flex align-center">
                <v-card-title>{{ item.title.split('.')[0] }}</v-card-title>
                <v-card-subtitle>{{ item.detail }}</v-card-subtitle>
              </div> -->
            <v-list>
              <div>
                <v-card-title>{{ item.title.split('.')[0] }}</v-card-title>
              </div>
              <div>
                <v-card-subtitle>{{ item.detail }}</v-card-subtitle>
              </div>
              <div>
                <v-card-subtitle class="mt-8 text-end">投稿日時:{{ formatDate(item.createAt) }}</v-card-subtitle>
              </div>
            </v-list>
            <v-row class="d-flex justify-end pr-2">
              <v-col cols="auto">
                <v-btn 
                block 
                class="mt-2" 
                color="orange" 
                @click="downloadFile(item.contentPath)"
                >ダウンロード</v-btn>
              </v-col>
              <v-col cols="auto">
                <v-btn 
                block 
                class="mt-2" 
                color="orange" 
                @click="deleteFile(item)"
                >削除</v-btn>
              </v-col>
            </v-row>
          </v-card>

        </v-col>
      </v-row>
    </v-sheet>

    <v-icon size="48" class="mt-12 mb-4">mdi-file-pdf-box</v-icon>
    <v-sheet class="rounded-lg  card-row">
      <v-row>
        <v-col
        v-for="(item, i) in pdfContents"
        :key = "i"
        cols = "3"
        class = "mb-4"
        >
          
          <v-card class="pb-2">
            <v-list>
              <div>
                <v-card-title>{{ item.title.split('.')[0] }}</v-card-title>
              </div>
              <div>
                <v-card-subtitle>{{ item.detail }}</v-card-subtitle>
              </div>
              <div>
                <v-card-subtitle class="mt-8 text-end">投稿日時:{{ formatDate(item.createAt) }}</v-card-subtitle>
              </div>
            </v-list>
            <v-row class="d-flex justify-end pr-2">
              <v-col cols="auto">
                  <v-btn 
                  block 
                  class="mt-2" 
                  color="orange" 
                  @click="downloadFile(item.contentPath)"
                  >ダウンロード</v-btn>
                </v-col>
                <v-col cols="auto">
                  <v-btn 
                  block 
                  class="mt-2" 
                  color="orange" 
                  @click="deleteFile(item)"
                  >削除</v-btn>
                </v-col>
            </v-row>
          </v-card>

        </v-col>
      </v-row>
    </v-sheet>

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

const mpContents = computed(() => {
  return contents.value.filter(contents => contents.fileType == 1)
})
const pdfContents = computed(() => {
  return contents.value.filter(contents => contents.fileType == 2)
})

const searchName = ref('')
const searchKariName = ref('')
const dispContents = ref<Content[]>([])

const postName = () => {
  // スペースを削除
  searchKariName.value = searchName.value.trim().replace(/\s/g,"")
  fileSearch()
}
const fileSearch = () => {
  const content = ref([] as Content[]);
  console.log(searchKariName.value)
  if(searchName.value != '') {
    contents.value = dispContents.value.filter((a) => { return a.title.indexOf(searchKariName.value) != -1})
    console.log(contents.value)
    } else {
      contents.value = dispContents.value;
    }

}

// const editFile = (item: Content) => {
//   contentsReq.value.title = item.title.split(".")[0];
//   contentsReq.value.detail = item.detail;
//   cropImg.value = item.topImgPath;
//   contentsReq.value.topImgPath = item.topImgPath;
//   contentsReq.value.content = item.content;
//   uplodadModalFlg.value = true
// }
const deleteFile = (item: Content) => {
  if (window.confirm(item.id+'削除しますか？')) {
    const delItem = ref<Content>(item)
    const delItem2 = contentsReq
    console.log(delItem.value)
    console.log(item)
    delItem2.value.id = item.id
    http.post("/mypage/deleteFile",delItem2.value )
    .then(() => {
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
}


const store = useStore()
const router = useRouter()
//const userId = computed(() => store.state.user.userId)
const laughs = ref<Laugh[]>([])
const contents = ref<Content[]>([])
const uplodadModalFlg = ref<boolean>();

const openUploadModal = () => {
  uplodadModalFlg.value = true
}

const contentsReq = ref<Content>({
  id : null,
  userId : 3 ,
  title : '' ,
  detail : '' ,
  fileType : 1 ,
  // topImg : '' ,
  // topImgPath : '' ,
  content : '' ,
  contentPath : '',
  createAt : null,
  UpdateAt : null
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
  dispContents.value = data.data
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

.card-row {
  border: 1px solid #4344464f; /* 外枠のスタイルを定義します */
  padding: 16px; /* 必要に応じて余白を追加します */
  background-color: #F8F9FA;
}

</style>