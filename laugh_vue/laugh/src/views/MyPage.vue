<template>
<v-container fluid="true">
  <v-row>
    <v-col lg="4" md="4" sm="4" xs="4">
      <div>
      <v-card class="mx-auto pa-2 wrap" >
        <v-container fluid="true">
          <v-row>
            <v-col class="pa-0" lg="6" md="6" sm="12">
              <input ref="file" @change="setImage" type="file" name="image" accept="image/*" style="display: none;">
              <div v-if="user.profileImgPath" @click.prevent="showFileChooser" class="image-container">
                <v-img
                  :aspect-ratio="1"
                  :src="user.profileImgPath"
                  cover
                  class="rounded-lg"
                ></v-img>
                <v-btn icon class="delete-button" @click.stop="deleteImage" size="20">
                  <v-icon>mdi-close</v-icon>
                </v-btn>
              </div>
              <div v-if="!user.profileImgPath" @click.prevent="showFileChooser">
                <v-img
                  :aspect-ratio="1"
                  :src="src"
                ></v-img>
              </div>
              <ImageModalComponent :userId="store.state.user.userId" :modelValue="modalFlg" :imgBase64="imgSrc" @update:modelValue="setModelValue" @update:imgValue="setImg"></ImageModalComponent>
            </v-col>
            <v-col class="pa-0" lg="6" md="6" sm="12">
              <v-card-title class="user-name font-weight-black pt-0 pb-0">{{ user.userName }}</v-card-title>
              <div class="label-color mt-2  mb-2 ml-6"><span>{{ (user.userType == 1) ? '芸歴' : '作家歴' }} {{ user.activityDt }}</span></div>
              <v-card-title class="pt-0 pb-0 text-subtitle-2"></v-card-title>
              <v-card-subtitle class="pt-1"><v-icon icon="mdi-office-building" color="orange-darken-2" />{{ user.officeName }}</v-card-subtitle>
              <v-card-subtitle class="pt-2 pb-5"><v-icon icon="mdi-map-marker" color="orange-darken-2" />{{ user.areaName }}</v-card-subtitle>
              <div v-if="user.userType === 1" class="pl-card">
                <span>芸風</span>
                <v-divider></v-divider>
                <v-chip
                    v-for="(item, i) in user?.comedyStyleNameList" :key="i"
                    class="mr-1 mt-1"
                    size="small"
                    color="orange-darken-2"
                    >{{ item }}</v-chip>
              </div>
              <div v-if="user.userType == 2" class="pl-card">
                <span>得意分野</span>
                <v-divider></v-divider>
                <v-chip
                    v-for="(item, i) in user?.comedyStyleNameList" :key="i"
                    class="mr-1 mt-1"
                    color="orange-darken-2"
                    size="small"
                    >{{ item }}</v-chip>
              </div>
            </v-col>
          </v-row>
        </v-container>
      </v-card>
      </div>
    </v-col>
    <v-col lg="8" md="8" sm="8" xs="8">
    <v-card>
      <v-tabs
        v-model="tab"
        color="orange-darken-2"
      >
        <v-tab value="profile" @click="getProfile">
          <v-icon middle size="x-large" icon="mdi-account" />
          プロフィール
        </v-tab>
        <v-tab value="laugh" @click="getLugh">
          <v-icon middle size="x-large" icon="mdi-handshake" />
          Laugh
        </v-tab>
      </v-tabs>
      <v-card-text>
      <v-window v-model="tab">
        <v-window-item value="profile">
          <MyPageProfile ref="profileRef" @upd-user="updUser"></MyPageProfile>
        </v-window-item>
        <v-window-item value="laugh">
          <MyPageLaugh ref="laughRef"></MyPageLaugh>
        </v-window-item>
      </v-window>
    </v-card-text>
    </v-card>
    </v-col>
  </v-row>
</v-container>

</template>

<script setup lang="ts">
  import { computed, ref, onMounted } from 'vue';
  import http from "@/http-common";
  import { useStore } from 'vuex'

  import MyPageProfile from '@/components/MyPageProfile.vue';
  import MyPageLaugh from '@/components/MyPageLaugh.vue'
  import type User from '@/types/User'
  import ImageModalComponent from "../components/ImageModalComponent.vue"

  const store = useStore();
  const user = ref<User>({});
  const profileRef = ref();
  const laughRef = ref();
  const tab = ref("profile");
  /** dom読み込み時の実行メソッド */
  onMounted(() => { getData(); });

  /** 初期処理 */
  const getData = async () => {
    const {data } = await http.get('/mypage',{
      params: {
        userId: store.state.user.userId,
        userType: store.state.user.userType
      }}
    );
    user.value = data.data;
    getProfile();
  }

  /** Laugh取得 */
  const getLugh = () => {
    // タブのため初期表示の場合
    if (laughRef.value == undefined) {
      setTimeout(_getLugh, 200);
    } else {
      _getLugh;
    }
  }
  /** Laugh取得(子どもコンポーネント) */
  const _getLugh = () => {
    laughRef.value.getLaugh();
  }
  const getProfile = () => {
    profileRef.value.getProfile();
  }

  const modalFlg = ref(false)
  const imgSrc = ref('');
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
        }
      };
      reader.readAsDataURL(file);
    } else {
      alert('FileReader APIがサポートされていません');
    }
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
const setImg = async (img:string) => {
  user.value.profileImgPath = img;
  await http.post("/profile/editImg", user.value);
} 
const showFileChooser = () => {
  file.value.click();
};

const updUser = () => {
  getData();
}

const deleteImage = () => {
  if (window.confirm('画像を削除しますか？')) {
    user.value.profileImgPath = '';
    http.post("/profile/editImg", user.value);
  }
  }

</script>

<style scoped>
  tr:nth-child(odd) td {
    font-weight: bold;
    font-size: 13px;
    padding-top: 10px;
  }
  tr:nth-child(even) td {
    padding-left: 5px;
  }
  .pl-card {
    padding-left: 1rem;
  }
  .profImgWrap {
    width: 130px;
    height: 130px;
  }
  .profImgWrap > div { border-radius: 5%; }
  .label-color {
    height: 20px;
    line-height: 16px;
  }
  .image-container {
  position: relative;
  }
  .delete-button {
    position: absolute;
    top: 0;
    right: 0;
  }

  .user-name {
    white-space: normal;
  }
</style>