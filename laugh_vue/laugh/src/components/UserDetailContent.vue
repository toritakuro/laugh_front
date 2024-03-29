<template>
  <div v-if="existFlg">
    <div v-if="existMovieFlg">
      <v-icon size="30">mdi-movie-play</v-icon>
      <v-sheet class="rounded-lg  card-row" style="border:2px solid orange;">
        <v-row>
          <v-col
            v-for="(item, i) in movieContents"
            :key = "i"
            cols = "4"
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
                    {{ item.detail }}
                  </div>
                  <div v-else class="detail-text" v-html="formatDetail(item.detail)"></div>
                </div>
                <div>
                  <v-card-subtitle class="mt-8 postTime"><v-icon icon="mdi-cloud-upload-outline"/>:{{ formatDate(item.createAt) }}</v-card-subtitle>
                </div>
              </v-list>
              <v-row class="d-flex pl-4">
                <v-col cols="auto">
                  <v-btn 
                  block
                  size="small"
                  class="mt-2" 
                  color="grey-lighten-1" 
                  @click="downloadFile(item.contentPath)"
                  ><v-icon size="small">mdi-download</v-icon></v-btn>
                </v-col>
              </v-row>
            </v-card>
          </v-col>
        </v-row>
      </v-sheet>
    </div>

    <!-- PDFファイル一覧 -->
    <div v-if="existFileFlg">
      <v-icon size="30" class="mt-12 mb-4 fileIcon">mdi-file-outline</v-icon>
      <v-sheet class="rounded-lg  card-row" style="border:3px solid orange;">
        <v-row>
          <v-col
          v-for="(item, i) in fileContents"
          :key = "i"
          cols = "4"
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
                    {{ item.detail }}
                  </div>
                  <div v-else class="detail-text" v-html="formatDetail(item.detail)"></div>
                </div>
                <div class="postTime">
                  <v-card-subtitle class="mt-8 postTime"><v-icon icon="mdi-cloud-upload-outline"/>:{{ formatDate(item.createAt) }}</v-card-subtitle>
                </div>
              </v-list>
              <v-row class="d-flex pl-4">
                <v-col cols="auto">
                  <v-btn 
                  block
                  size="small"
                  class="mt-2" 
                  color="grey-lighten-1" 
                  @click="downloadFile(item.contentPath)"
                  ><v-icon>mdi-download</v-icon></v-btn>
                </v-col>
              </v-row>
            </v-card>
          </v-col>
        </v-row>
      </v-sheet>
    </div>
  </div>
  <!-- ファイルがない場合の文言 -->
  <div v-if="!existFlg">
    <v-col >
      <span>表示できるコンテンツはありません。</span>
    </v-col>
  </div>
</template>
  
  <script setup lang="ts">
  import { computed, ref } from 'vue'
  import { useRouter , useRoute} from 'vue-router';
  import type Laugh from "@/types/Laugh";
  import http from "@/http-common";
  import type Content from "@/types/Content";

  const router = useRouter()
  const contents = ref<Content[]>([]) //タイトル検索で絞られた後のファイル一覧はこの変数に入れる
  // 動画ファイル用
  const movieContents = computed(() => { return contents.value.filter(contents => contents.fileType == 1) });
  // 台本ファイル用
  const fileContents = computed(() => { return contents.value.filter(contents => contents.fileType == 2)});

  const existFlg = ref(false); // ユーザーがファイルを投稿しているかの判定
  const existMovieFlg = computed(() => { return movieContents.value.length > 0 });
  const existFileFlg = computed(() => { return fileContents.value.length > 0 });
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
  }}
  /** 投稿内容一覧を取得する */
  const getContent = async (userId: string) => {
    const {data} = await http.get('/mypage/getFile',{
      params: {userId: userId}
      }
    )
    contents.value = data.data
    if (contents.value.length > 0) {
      existFlg.value = true
    }
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
    // const hours = String(date.getHours()).padStart(2, '0');
    // const minutes = String(date.getMinutes()).padStart(2, '0');
    return year + '/' + month + '/' + day;
  }
  
  // ファイルをダウンロードする処理
  const downloadFile = (path: string) => {
      window.open(path, '_blank');
  }

  defineExpose({
    getContent,
  })

  // 投稿ファイルのタイトル処理
  const tooltipVisible = ref(false);
  const tooltipVisibleNum = ref(0);
  const tooltipVisibleType = ref();

  const showTooltip = (i:number, text:string, type:string) => {
    var zenkakuNum = countFullWidthCharacters(text)*2;
    var hankakuNum = countHalfWidthCharacters(text);

    if(zenkakuNum > 10 || hankakuNum > 9 || zenkakuNum + hankakuNum > 10) {
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
  max-height: 540px;
  overflow-y: auto;
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
  .postTime {
    font-size: 12px;
  }
  .fileIcon {
    margin-bottom: 0px !important;
  }
  ::-webkit-scrollbar-thumb {
  border-radius: 5px;
}
.tooltip {
  position: absolute;
  background-color: #fff;
  border: 1px solid #ccc;
  padding: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
</style>