<template>
    <v-container
      class="py-8 px-6"
      style="width: 70%;"
      fluid
    >

    <v-row>
      <v-col >
        <v-text-field
          prepend-inner-icon="mdi-magnify"
          label="タイトル検索"
          density="compact"
          bg-color="white"
          @input="postName"
          v-model="searchName"
          style="width: 80%; margin:0 auto; "
          variant="outlined"
        ></v-text-field>
      </v-col>

      <v-col cols="auto" class="pb-16 text-end">
        <v-btn density="default" class="fixed_btn"  icon="mdi-cloud-upload" size="92" @click="openUploadModal"></v-btn>
      </v-col>
    </v-row>

      <v-menu
        v-model="uplodadModalFlg"
        class="bordered-dialog"
        @click.stop
      >
        <v-form @click.stop class="form-container">
          <v-radio-group 
              v-model="contentsReq.fileType" 
              inline
              class="ml-8 mt-8"
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
          <v-text-field
            v-model="contentsReq.title"
            label="タイトル"
            placeholder="ここにタイトルを入力"
            class="ml-8"
          ></v-text-field>
          <v-textarea
            v-model="contentsReq.detail"
            label="説明文"
            class="ml-8 mt-4"
          ></v-textarea>
          
          <FileComponent @set-file="setFile"/>
          <!-- <v-file-input
                accept="image/*"
                label="画像ファイルをアップロードしてください"
              ></v-file-input> -->

          <v-btn 
            class="ml-8 mt-8"
            style="width:80%;"
            color="orange-darken-1" 
            @click="uploadFile"
          >アップロード</v-btn>
        </v-form>
      </v-menu>

      <v-menu
        v-model="editModalFlg"
        class="bordered-dialog"
        @click.stop
        close-on-content-click
        disable-keys
      >
        <v-form @click.stop class="form-container">
          <v-text-field
            v-model="contentsEditReq.title"
            label="タイトル"
            placeholder="ここにタイトルを入力"
            class="ml-8 mt-8"
          ></v-text-field>
          <v-textarea
            v-model="contentsEditReq.detail"
            label="説明文"
            class="ml-8 mt-4"
            rows="11"
          ></v-textarea>

          <v-btn 
            class="ml-8 mt-8"
            style="width:80%;"
            color="orange-darken-1" 
            @click="editFile"
          >編集</v-btn>
        </v-form>
      </v-menu>

      <v-icon size="48" v-if="existFlg">mdi-movie-play</v-icon>
    <v-sheet class="rounded-lg  card-row" style="border:2px solid orange;" v-if="existFlg">
      <v-row>
        <v-col
        v-for="(item, i) in mpContents"
        :key = "i"
        cols = "3"
        class = "mb-4"
        >
          
          <v-card class="pb-2">
            <v-list>
              <div>
                <v-card-title>{{ item.title }}</v-card-title>
              </div>
              <div>
                <div v-if="formatDetail(item.detail).split('<br>').length > 2" class="detail-text">
                  <div v-html="limitedDetail(formatDetail(item.detail))"></div>
                  <span @click="openEdit(item)" class="show-more">もっと見る</span>
                </div>
                <div v-else class="detail-text" v-html="formatDetail(item.detail)"></div>
              </div>
              <div>
                <v-card-subtitle class="mt-8">投稿日時:{{ formatDate(item.createAt) }}</v-card-subtitle>
              </div>
            </v-list>
            <v-row class="d-flex pl-4">
              <v-col cols="auto">
                <v-btn 
                block 
                class="mt-2" 
                color="grey-lighten-1" 
                @click="downloadFile(item.contentPath)"
                ><v-icon>mdi-download</v-icon></v-btn>
              </v-col>
              <v-col cols="auto">
                <v-btn 
                block 
                class="mt-2" 
                color="teal-lighten-1" 
                @click="openEdit(item)"
                ><v-icon>mdi-pencil</v-icon></v-btn>
              </v-col>
              <v-col cols="auto">
                <v-btn 
                block 
                class="mt-2" 
                color="red-lighten-1" 
                @click="deleteFile(item)"
                ><v-icon>mdi-delete</v-icon></v-btn>
              </v-col>
            </v-row>
          </v-card>

        </v-col>
      </v-row>
    </v-sheet>

    <v-icon size="48" class="mt-12 mb-4" v-if="existFlg">mdi-file-outline</v-icon>
    <v-sheet class="rounded-lg  card-row" style="border:2px solid orange;" v-if="existFlg">
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
                <v-card-title>{{ item.title }}</v-card-title>
              </div>
              <div>
                <div v-if="formatDetail(item.detail).split('<br>').length > 2" class="detail-text">
                  <div v-html="limitedDetail(formatDetail(item.detail))"></div>
                  <span @click="openEdit(item)" class="show-more">もっと見る</span>
                </div>
                <div v-else class="detail-text" v-html="formatDetail(item.detail)"></div>

              </div>
              <div>
                <v-card-subtitle class="mt-8">投稿日時:{{ formatDate(item.createAt) }}</v-card-subtitle>
              </div>
            </v-list>
            <v-row class="d-flex pl-4">
              <v-col cols="auto">
                <v-btn 
                block 
                class="mt-2" 
                color="grey-lighten-1" 
                @click="downloadFile(item.contentPath)"
                ><v-icon>mdi-download</v-icon></v-btn>
              </v-col>
              <v-col cols="auto">
                <v-btn 
                block 
                class="mt-2" 
                color="teal-lighten-1" 
                @click="openEdit(item)"
                ><v-icon>mdi-pencil</v-icon></v-btn>
              </v-col>
              <v-col cols="auto">
                <v-btn 
                block 
                class="mt-2" 
                color="red-lighten-1" 
                @click="deleteFile(item)"
                ><v-icon>mdi-delete</v-icon></v-btn>
              </v-col>
            </v-row>
          </v-card>

          
        </v-col>
      </v-row>
    </v-sheet>
    <v-card width="40%" style="margin:0 auto; text-align: center;" v-if="!existFlg">
      <v-col >
        <span>表示できるコンテンツはありません。</span>
      </v-col>
    </v-card>
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

const existFlg = ref(false);

const editModalFlg = ref(false);
// const limitedDetail = (detail: string) => {
//   return detail.split('<br>').slice(0, 2).join('<br>');
// }
const limitedDetail = (detail: string) => {
  const splitDetails = detail.split('<br>');
  if (splitDetails.length <= 2) {
    return detail;
  }
  return splitDetails.slice(0, 2).join('<br>') + '...';
}
const openEdit = (item: Content) => {
  editModalFlg.value = true;
  contentsEditReq.value.id = item.id;
  contentsEditReq.value.title = item.title;
  contentsEditReq.value.detail = item.detail;
}
const contentsEditReq = ref<Content>({
  id : null,
  userId : 4 ,
  title : '' ,
  detail : '' ,
  fileType : 1 ,
  content : '' ,
  contentPath : '',
  createAt : null,
  UpdateAt : null
})
const editFile = async () => {
  http.post("/mypage/editFile",contentsEditReq.value )
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

const formatDetail = (detail: string) => {
  return detail.replace(/\r\n|\r|\n/g, "<br>");
}

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
 
  http.post("/mypage/uploadContent", contentsReq.value)
  .then(() => {
    console.log('成功');
    contentsReq.value.title = '';
    contentsReq.value.detail = '';
  })
  .catch((error) => {
    contentsReq.value.title = contentsReq.value.title.split('.')[0];
    console.log(error);
  })
  .finally(() => {
    uplodadModalFlg.value = false;
    getContent();
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
  if(dispContents.value.length > 0) {
    existFlg.value = true;
  }
  if(dispContents.value.length <= 0) {
    existFlg.value = false;
  }
  // contents.value.title = contents.value.title.split(".")[0]
  console.log(contents.value)
}

const downloadFile = (path: string) => {
  window.open(path, '_blank');
}

const formatDate = (dateString: any) => {
  if(dateString == null) {
    return;
  }
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
  width: 600px;
  border: 1px solid #000000;
  border-radius: 8px;
  background-color: rgba(255, 255, 255, 1);
  position: fixed;
  text-align: center;
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
  border: 1px solid #4344464f; 
  padding: 16px; 
  background-color: #F8F9FA;
}

.fixed_btn {
  position: fixed;
  bottom: 12%;
  right: 6%;
  background-color: orange;
  border: 2px solid 4344464f;
}

.form-container {
  width: 570px; 
}

.detail-text {
  margin-left: 16px;
  margin-right: 8px;
  font-size: 12px;
  height: 60px;
  overflow-y: auto;
}

.show-more {
    cursor: pointer;
    color: blue;
    text-decoration: underline;
}
</style>