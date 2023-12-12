<template>
  <v-container
    class="py-8 px-6"
    style="width: 90%; max-width: 1100px;"
    fluid
  >

    <!-- Loadingのアイコン -->
    <div class="loading_icon" v-if="loadingFlg">
      <v-progress-circular
        indeterminate
        color="primary"
      ></v-progress-circular>
    </div>

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
        <v-btn density="default" class="upload_btn"  icon="mdi-cloud-upload" size="150" @click="openReg">
          <div class="flex-column align-center">
            <v-icon>mdi-cloud-upload</v-icon><br>
            upload
          </div>
        </v-btn>
      </v-col>
    </v-row>

    <!-- 登録用モーダル -->
    <div v-if="modal && regEditType == 1" class="overlay" @click="closeModal">
      <ContentModal
        @click.stop
        v-show="modal"
        :contentsReq = "contentsReq" 
        :regEditType ="regEditType"
        @upload-content="uploadContent"
        @set-file="setFile"
      />
    </div>

    <!-- 更新用モーダル -->
    <div v-if="modal && regEditType == 2" class="overlay" @click="closeModal">
      <ContentModal
        @click.stop
        :contentsEditReq = "contentsEditReq" 
        :regEditType ="regEditType"
        @edit-content="editContent"
      />
    </div>

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
                <v-card-title @mouseover="showTooltip(i,item.title,'movie')" @mouseout="hideTooltip">{{ item.title }}</v-card-title>
                <!-- 吹き出しの表示部分 -->
                <div v-if="tooltipVisible && tooltipVisibleNum == i && tooltipVisibleType == 'movie'" class="tooltip" @mouseover.stop @mouseout.stop>
                  {{ item.title }}
                </div>
              </div>
              <div>
                <div v-if="isTooLong(formatDetail(item.detail))" class="detail-text">
                  <!-- <div v-html="limitedDetail(formatDetail(item.detail))"></div> -->
                  {{ item.detail }}
                  <!-- <span @click="openEdit(item)" class="show-more">もっと見る</span> -->
                </div>
                <div v-else class="detail-text" v-html="formatDetail(item.detail)"></div>
              </div>
              <div>
                <v-card-subtitle class="mt-8">投稿日時:{{ formatDate(item.createAt) }}</v-card-subtitle>
              </div>
            </v-list>
            <v-row class="d-flex pl-4">
              <v-col cols="auto">
                <div class="tooltip-container">
                    <v-btn 
                    block 
                    class="mt-2" 
                    color="grey-lighten-1" 
                    @click="downloadFile(item.contentPath)"
                    ><v-icon>mdi-download</v-icon></v-btn>
                    <span class="tooltip-text">ダウンロード</span>
                </div>
              </v-col>
              <v-col cols="auto">
                <div class="tooltip-container">
                  <v-btn 
                  block 
                  class="mt-2" 
                  color="teal-lighten-1" 
                  @click="openEdit(item)"
                  ><v-icon>mdi-pencil</v-icon></v-btn>
                  <span class="tooltip-text">編集</span>
                </div>
              </v-col>
              <v-col cols="auto">
                <div class="tooltip-container">
                  <v-btn 
                  block 
                  class="mt-2" 
                  color="red-lighten-1" 
                  @click="deleteFile(item)"
                  ><v-icon>mdi-delete</v-icon></v-btn>
                  <span class="tooltip-text">削除</span>
                </div>
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
                <v-card-title @mouseover="showTooltip(i,item.title,'pdf')" @mouseout="hideTooltip">{{ item.title }}</v-card-title>
                <!-- 吹き出しの表示部分 -->
                <div v-if="tooltipVisible && tooltipVisibleNum == i && tooltipVisibleType == 'pdf'" class="tooltip" @mouseover.stop @mouseout.stop>
                  {{ item.title }}
                </div>
              </div>
              <div>
                <div v-if="isTooLong(formatDetail(item.detail))" class="detail-text">
                  <!-- <div v-html="limitedDetail(formatDetail(item.detail))"></div> -->
                  {{ item.detail }}
                  <!-- <span @click="openEdit(item)" class="show-more">もっと見る</span> -->
                </div>
                <div v-else class="detail-text" v-html="formatDetail(item.detail)"></div>
              </div>
              <div>
                <v-card-subtitle class="mt-8">投稿日時:{{ formatDate(item.createAt) }}</v-card-subtitle>
              </div>
            </v-list>
            <v-row class="d-flex pl-4">
              <v-col cols="auto">
                <div class="tooltip-container">
                    <v-btn 
                    block 
                    class="mt-2" 
                    color="grey-lighten-1" 
                    @click="downloadFile(item.contentPath)"
                    ><v-icon>mdi-download</v-icon></v-btn>
                    <span class="tooltip-text">ダウンロード</span>
                </div>
              </v-col>
              <v-col cols="auto">
                <div class="tooltip-container">
                  <v-btn 
                  block 
                  class="mt-2" 
                  color="teal-lighten-1" 
                  @click="openEdit(item)"
                  ><v-icon>mdi-pencil</v-icon></v-btn>
                  <span class="tooltip-text">編集</span>
                </div>
              </v-col>
              <v-col cols="auto">
                <div class="tooltip-container">
                  <v-btn 
                  block 
                  class="mt-2" 
                  color="red-lighten-1" 
                  @click="deleteFile(item)"
                  ><v-icon>mdi-delete</v-icon></v-btn>
                  <span class="tooltip-text">削除</span>
                </div>
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
import { computed, ref, onMounted } from 'vue'
import { useStore } from 'vuex'
import type Content from "@/types/Content";
import http from "@/http-common";
import ContentModal from "../components/ContentModal.vue"

// モーダルに関する処理
const regEditType = ref(1);
const modal = ref(false);
const closeModal = () => {
  modal.value = false;
}

const store = useStore();
const contents = ref<Content[]>([]); //タイトル検索で絞られた後のファイル一覧はこの変数に入れる
const OriginContents = ref<Content[]>([]); // タイトル検索で絞られる前のファイル一覧はこの変数に入れる

const existFlg = ref(false); // ログインユーザーがファイルを投稿しているかの判定
const titleExistFlg = ref(false);

const searchName = ref(''); // タイトル検索用
const searchKariName = ref(''); // タイトル検索用(スペース削除後)

const loadingFlg = ref(false); // ローディングの判定

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

// 投稿のモーダルを表示する
const openReg = () => {
  modal.value = true;
  regEditType.value = 1;
}
// アップロードするファイルをセットする
const fileExtension = ref('');
const setFile = (base64:string, extension:string) => {
  console.log(extension)
  fileExtension.value = extension;
  contentsReq.value.content = base64;
}
// アップロードのリクエストを送る
const uploadContent = async (contentsModal: any) => {
  contentsReq.value.fileType = contentsModal.fileType;
  contentsReq.value.title = contentsModal.title;
  contentsReq.value.detail = contentsModal.detail;
  
  // TODO: 20231103 ファイルタイプと拡張子が一致していなかったらリクエスト飛ばさないようにしたい。
  if(contentsReq.value.fileType == 1 && fileExtension.value != 'mp4') {
    alert('すみませんが、動画は拡張子がmp4のファイルしか投稿できません。');
    return;
  }

  if(contentsReq.value.fileType == 2 && fileExtension.value != 'pdf') {
    alert('すみませんが、PDFは拡張子がpdfのファイルしか投稿できません。');
    return;
  }

  if(contentsReq.value.title != '') {
    contentsReq.value.title = contentsReq.value.title + '.' + fileExtension.value // S3に登録するために、一時的にタイトルに拡張子をつける
  }


  try{
    loadingFlg.value = true;
    await http.post("/mypage/uploadContent", contentsReq.value);
    console.log('成功');
    contentsReq.value.title = '';
    contentsReq.value.detail = '';
    contentsReq.value.content = '';
  } catch(error) {
    console.log(error);
  } finally {
    loadingFlg.value = false;
    modal.value = false;
    await getContent();
  };
}

// 編集のモーダルを表示する
const openEdit = (item: Content) => {
  modal.value = true;
  regEditType.value = 2;
  contentsEditReq.value.id = item.id;
  contentsEditReq.value.title = item.title;
  contentsEditReq.value.detail = item.detail;
}
// 編集のリクエストを送る
const editContent = async (contentsEditModal: any) => {
  contentsEditReq.value.title = contentsEditModal.title;
  contentsEditReq.value.detail = contentsEditModal.detail;

  http.post("/mypage/editFile",contentsEditReq.value )
    .then(() => {
      getContent();
    })
    .catch((error) => {
      console.log(error)
    })
    .finally(() => {
      modal.value = false;
    });
}

// 削除のリクエストを送る
const deleteFile = (item: Content) => {
  if (window.confirm('削除しますか？')) {
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
   // 投稿ファイルのタイトル処理
  const tooltipVisible = ref(false);
  const tooltipVisibleNum = ref(0);
  const tooltipVisibleType = ref();

  const showTooltip = (i:number, text:string, type:string) => {
    var zenkakuNum = countFullWidthCharacters(text)*2;
    var hankakuNum = countHalfWidthCharacters(text);

    if(zenkakuNum > 20 || hankakuNum > 16 || zenkakuNum + hankakuNum > 20) {
      tooltipVisible.value = true;
    }
    tooltipVisibleNum.value = i;
    tooltipVisibleType.value = type;
  };

  const hideTooltip = () => {
    tooltipVisible.value = false;
  };
  function countHalfWidthCharacters(input: string): number {
    // 半角文字の範囲を正規表現で指定
    const halfWidthRegex = /[ -~]/g;
    const matches = input.match(halfWidthRegex);

    return matches ? matches.length : 0;
  }
  function countFullWidthCharacters(input: string): number {
    // 全角文字の範囲を正規表現で指定
    const fullWidthRegex = /[^\x00-\x7F]/g;
    const matches = input.match(fullWidthRegex);

    return matches ? matches.length : 0;
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
.upload_btn {
position: fixed;
top: 20%;
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
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0,0,0,0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 98
}
.tooltip-container {
  position: relative;
  display: inline-block;
}
.tooltip-text {
  visibility: hidden;
  font-size: 8px;
  width: 50px;
  background-color: gray;
  color: #fff;
  text-align: center;
  border-radius: 6px;
  padding: 5px 0;

  position: absolute;
  top: 0%;
  left: 100%;
  margin-left: -60px;

  opacity: 0;
  transition: opacity 0.3s;
}
.tooltip-container:hover .tooltip-text {
  visibility: visible;
  opacity: 1;
}
.loading_icon {
  position: fixed;
  top: 20%;
  right: 50%;
  z-index: 1000;
}
.tooltip {
  position: absolute;
  background-color: #fff;
  border: 1px solid #ccc;
  padding: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
</style>