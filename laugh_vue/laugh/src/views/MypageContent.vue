<template>
  <v-container
    class="py-8 px-6"
    style="width: 90%;"
    fluid
  >

    <!-- タイトル検索欄 -->
    <v-row>
      <v-col v-if="existFlg">
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

    <!-- アップロードモーダル -->
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

        <v-btn 
          class="ml-8 mt-8"
          style="width:80%;"
          color="orange-darken-1" 
          @click="uploadFile"
        >アップロード</v-btn>
      </v-form>
    </v-menu>

    <!-- 編集モーダル -->
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

    <!-- 動画ファイル一覧 -->
    <v-icon size="48" v-if="titleExistFlg">mdi-movie-play</v-icon>
    <v-sheet class="rounded-lg  card-row" style="border:2px solid orange;" v-if="titleExistFlg">
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
                <div v-if="isTooLong(formatDetail(item.detail))" class="detail-text">
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

    <!-- PDFファイル一覧 -->
    <v-icon size="48" class="mt-12 mb-4" v-if="titleExistFlg">mdi-file-outline</v-icon>
    <v-sheet class="rounded-lg  card-row" style="border:2px solid orange;" v-if="titleExistFlg">
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
                <div v-if="isTooLong(formatDetail(item.detail))" class="detail-text">
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

    <!-- ファイルがない場合の文言 -->
    <v-card width="40%" style="margin:0 auto; text-align: center;" v-if="!existFlg || !titleExistFlg">
      <v-col >
        <span>表示できるコンテンツはありません。</span>
      </v-col>
    </v-card>

  </v-container>
</template>

<script setup lang="ts">
import { computed, ref, onMounted, watch } from 'vue'
import { useStore } from 'vuex'
import type Content from "@/types/Content";
import http from "@/http-common";
import FileComponent from "../components/FileComponent.vue"

const store = useStore()
const contents = ref<Content[]>([]) //タイトル検索で絞られた後のファイル一覧はこの変数に入れる
const OriginContents = ref<Content[]>([]) // タイトル検索で絞られる前のファイル一覧はこの変数に入れる
const uplodadModalFlg = ref<boolean>();
const editModalFlg = ref(false);

const existFlg = ref(false); // ログインユーザーがファイルを投稿しているかの判定
const titleExistFlg = ref(false)

const searchName = ref('') // タイトル検索用
const searchKariName = ref('') // タイトル検索用(スペース削除後)

// アップロード時のリクエスト
const contentsReq = ref<Content>({
id : null,
userId : store.state.user.userId ,
title : '' ,
detail : '' ,
fileType : 1 ,
content : '' ,
contentPath : '',
createAt : null,
UpdateAt : null
})

// 編集時のリクエスト
const contentsEditReq = ref<Content>({
id : null,
userId : store.state.user.userId ,
title : '' ,
detail : '' ,
fileType : 1 ,
content : 'editTest' ,
contentPath : '',
createAt : null,
UpdateAt : null
})

// 動画ファイル用
const mpContents = computed(() => {
return contents.value.filter(contents => contents.fileType == 1)
})
// PDFファイル用
const pdfContents = computed(() => {
return contents.value.filter(contents => contents.fileType == 2)
})



// マウント時にデータを取得し代入する
onMounted(() => {
getContent();
});

const getContent = async () => {
const {data} = await http.get('/mypage/getFile',{
  params: {
    userId: store.state.user.userId
  }}
  )
contents.value = data.data
OriginContents.value = data.data
if(OriginContents.value.length > 0) {
  existFlg.value = true;
}
if(OriginContents.value.length <= 0) {
  existFlg.value = false;
}
titleExistFlg.value = existFlg.value; // 最初の画面表示時はtitleExistFlgもexistFlgも同じ

}

// タイトル検索欄に文字が入力された時の処理
const postName = () => {
searchKariName.value = searchName.value.trim().replace(/\s/g,"") // スペースを削除
fileSearch()
}
const fileSearch = () => {
console.log(searchKariName.value)
if(searchName.value != '') {
  contents.value = OriginContents.value.filter((a) => { return a.title.indexOf(searchKariName.value) != -1})
  console.log(contents.value)
  } else {
    contents.value = OriginContents.value;
  }

if(contents.value.length > 0) {
  titleExistFlg.value = true;
}
if(contents.value.length <= 0) {
  titleExistFlg.value = false;
}
}

// 投稿したファイルの説明文で改行があった時、改行して表示されるようにする
const formatDetail = (detail: string) => {
return detail.replace(/\r\n|\r|\n/g, "<br>");
}

// 投稿したファイルの説明文が画面で2行で収まるかの判定
const isTooLong = (detail: string) => {
const splitDetails = detail.split('<br>');
// 説明文が3行以上
if(splitDetails.length > 2) {
  return true;
}
// 説明文が2行以上かつ1行目が18文字以上
if(splitDetails.length > 1 && splitDetails[0].length > 17) {
  return true;
}
// 説明文が2行以上かつ2行目が18文字以上
if(splitDetails.length > 1 && splitDetails[1].length > 17) {
  return true;
}
return false;
}

// 投稿したファイルの説明文の表示方法を、2行で収まるかどうかで場合分け
const limitedDetail = (detail: string) => {
const splitDetails = detail.split('<br>');
// 説明文が2行以上かつ1行目が18文字以上34文字以内なら、1行目全文を表示させる
if(splitDetails.length > 1 && splitDetails[0].length > 17 && splitDetails[0].length < 35) {
  return splitDetails[0] + '...';
}
// 説明文が2行以上かつ1行目が35文字以上なら、1行目の34文字目までを表示させる
if(splitDetails.length > 1 && splitDetails[0].length >= 35) {
  return splitDetails[0].substring(0,33) + '...';
}
// 説明文が2行以上かつ2行目が18文字以上なら2行目の17文字目まで表示させる
if(splitDetails.length > 1 && splitDetails[1].length > 17) {
  splitDetails[1] = splitDetails[1].substring(0,16);
  return splitDetails.slice(0, 2).join('<br>') + '...';
}
// 説明文が3行以上なら全行表示はさせない
if(splitDetails.length > 2) {
  return splitDetails.slice(0, 2).join('<br>') + '...';
}
return detail;  
}

// 投稿日時のフォーマットを調整
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



// ファイルをダウンロードする処理
const downloadFile = (path: string) => {
window.open(path, '_blank');
}



// アップロードのモーダルを表示する
const openUploadModal = () => {
uplodadModalFlg.value = true
}
// アップロードするファイルをセットする
const fileExtension = ref('');
const setFile = (base64:string, extension:string) => {
console.log(extension)
fileExtension.value = extension;
contentsReq.value.content = base64;
}
// アップロードのリクエストを送る
const uploadFile = async () => {
if(contentsReq.value.title != '') {
  contentsReq.value.title = contentsReq.value.title + '.' + fileExtension.value // S3に登録するために、一時的にタイトルに拡張子をつける
}
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



// 編集のモーダルを表示する
const openEdit = (item: Content) => {
editModalFlg.value = true;
contentsEditReq.value.id = item.id;
contentsEditReq.value.title = item.title;
contentsEditReq.value.detail = item.detail;
}
// 編集のリクエストを送る
const editFile = async () => {
http.post("/mypage/editFile",contentsEditReq.value )
  .then(() => {
    getContent();
  })
  .catch((error) => {
    console.log(error)
  })
  .finally(() => {
    editModalFlg.value = false;
  });
}



// 削除のリクエストを送る
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
    console.log(error)
  })
  .finally(() => {
  });
}
}



</script>

<style scoped>
.status-icon { width:50px; }
.img { width:100px; }
.name { width:100px; }
.active-term { width:80px; }
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