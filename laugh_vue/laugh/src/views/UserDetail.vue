<template>
  <v-container fluid="true" class="content">
    <v-row>
      <v-col cols="6" class="content_box">
        <v-card class="mx-auto pa-2 detail_card">
          <v-container fluid="true">
            <v-row>
              <v-col cols="5">
                <div v-if="user?.profileImgPath">
                  <v-img
                    :aspect-ratio="1"
                    :src="user?.profileImgPath"
                    cover
                    class="rounded-lg  profile_img"
                  ></v-img>
              </div>
              <div v-if="!user?.profileImgPath">
                <v-img
                  :aspect-ratio="1"
                  :src="src"
                  cover
                  class="rounded-lg  profile_img"
                ></v-img>
              </div>
              </v-col>
              <v-col class="pa-0 profile_info" lg="6" md="6" sm="12">
                <v-card-title class="font-weight-black pt-0 pb-0 profile_info_name">{{ user?.userName }}</v-card-title>
                <v-card-subtitle v-if="user?.gender == 1"><v-icon icon="mdi-gender-male-female" /> 性別： 男 </v-card-subtitle>
                <v-card-subtitle v-if="user?.gender == 2"><v-icon icon="mdi-gender-male-female" /> 性別： 女 </v-card-subtitle>
                <v-card-subtitle v-if="user?.gender == 3"><v-icon icon="mdi-gender-male-female" /> 性別： 男女 </v-card-subtitle>
                <v-card-subtitle v-if="user?.userType == 1"><v-icon icon="mdi-account" /> メンバー： {{ user?.memberNum }} 人</v-card-subtitle>
                <v-card-subtitle><v-icon icon="mdi-calendar-account-outline" /> 活動歴： {{ user?.activityDt }}</v-card-subtitle>
                <v-card-subtitle><v-icon icon="mdi-office-building" /> 事務所： {{ user?.officeName }}</v-card-subtitle>
                <v-card-subtitle><v-icon icon="mdi-map-marker" /> 活動地域： {{ user?.areaName }}</v-card-subtitle>
              </v-col>
            </v-row>
            <v-row>
              <v-col class="profile_downside" v-if="user?.userType === 2">
                <v-card-subtitle class="mb-1 text-subtitle-1">得意分野</v-card-subtitle>
                <v-chip
                  v-for="(itemName, i) in user?.comedyStyleNameList" :key="i"
                  class="mr-1 mt-1 profile_chip"
                  color="orange"
                  text-color="white"
                  >{{ itemName }}
                </v-chip>
                <v-card-subtitle class="mb-1 text-subtitle-1 profile_specialSkill_text">特殊スキル</v-card-subtitle>
                <v-chip
                  v-for="(itemName, i) in user?.specialSkillNameList" :key="i"
                  class="mr-1 mt-1"
                  color="orange"
                  text-color="white"
                  >{{ itemName }}
                </v-chip>
              </v-col>
            </v-row>
            <v-row>
              <v-col class="profile_downside" v-if="user?.userType === 1">
                <v-card-subtitle class="mb-1 text-subtitle-1">芸風</v-card-subtitle>
                <v-chip
                  v-for="(itemName, i) in user?.comedyStyleNameList" :key="i"
                  class="mr-1 mt-1"
                  color="orange"
                  text-color="white"
                  >{{ itemName }}
                </v-chip>
              </v-col>
            </v-row>
            <v-row>
              <v-col class="profile_downside">
                <v-card-subtitle class="mb-1 text-subtitle-1"><v-icon icon="mdi-comment-account-outline" />自己紹介</v-card-subtitle>
                <v-card-text class="text-subtitle-1 profile_selfIntroduction">{{ user?.selfIntroduction }}</v-card-text>
              </v-col>
            </v-row>
          </v-container>
        </v-card>
      </v-col>
      <v-col cols="6" class="content_box">
        <v-card>
          <v-tabs
            v-model="tab"
            color="orange-darken-2"
          >
            <v-tab value="content" @click="getContet">
              <v-icon middle size="x-large" icon="mdi-toolbox" />
                投稿一覧
            </v-tab>
            <v-tab value="oogiri" @click="getOogiri">
              <v-icon middle size="x-large" icon="mdi-brush" />
                大喜利回答
            </v-tab>
          </v-tabs>
          <v-card-text>
            <v-window v-model="tab">
              <v-window-item value="content">
                <UserDetailContent ref="contentRef"></UserDetailContent>
              </v-window-item>
              <v-window-item value="oogiri">
                <UserDetailOogiri ref="oogiriRef"></UserDetailOogiri>
              </v-window-item>
            </v-window>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <div class="float-btn">
      <div v-if="user?.matchStatus === null">
        <button class="laugh-btn" @click="showModal()">Laugh</button>
        <LaughModal
        :message="sendMsg"
        v-show="modal"
        @post-match="postMatch"
        ></LaughModal>
      </div>
      <div v-if="user?.matchStatus === 0">
        <button class="approval-btn" @click="showModal()">承認</button>
        <LaughApprovalModal
        :message="recieveMsg"
        v-show="modal"
        @post-match="postMatch"
        ></LaughApprovalModal>
      </div>
      <div v-if="user?.matchStatus === 10 || user?.matchStatus === 11">
        <button class="cancel-btn" @click="showModal()">match解消</button>
        <LaughCancelModal
        :message="cancelMsg"
        v-show="modal"
        @post-match="postMatch"
        ></LaughCancelModal>
      </div>
    </div>
  </v-container>
  
  </template>

<style>
  .content {
    margin-top:10px;
  }
  .content_box {
    height: 1284px;
  }
  .profile_selfIntroduction {
    max-height: 850px;
    overflow-y: auto;
  }
  .v-card-text {
    padding: 0rem;
    white-space: pre-line;
    display: -webkit-box; /* 必須 */
    -webkit-box-orient: vertical; /* 必須 */
  }
  .detail_card .v-card-subtitle {
    border-bottom: 2px dashed #FB8C00;
    margin-left: 7px;
    margin-bottom: 5px;
    padding: 0.2rem 0.7rem
  }
  .profile_info_name {
    border-bottom: 2px solid #FB8C00;
    margin-left: 7px;
    margin-bottom: 20px;
  }

  .float-btn {
    position: absolute;
    top: 150px;
    right: 30px;
    z-index: 100;
  }
 .laugh-btn{
    height: 120px;
    width: 120px;
    font-weight: bold;
    font-size: large;
    color: #FB8C00;
    border: 2px solid #FB8C00;
    background-color: #FFFF;
    border-radius: 50%;
    box-shadow: 0 3px 10px rgba(0, 0, 0, 0.3);
    transition: background-color 0.5s;
  }
  .laugh-btn:hover{
    color: #FFFF;
    background-color: #FB8C00;
  }
  .approval-btn{
    height: 120px;
    width: 120px;
    font-weight: bold;
    font-size: large;
    /* color: #FB8C00;
    border: 2px solid #FB8C00; */
    color: #86cff6;
    border: 2px solid #86cff6;
    background-color: #FFFF;
    border-radius: 50%;
    box-shadow: 0 3px 10px rgba(0, 0, 0, 0.3);
    transition: background-color 0.5s;
  }
  .approval-btn:hover{
    color: #FFFF;
    border: 2px solid #86cff6;
    background-color: #86cff6;
  }
  .cancel-btn{
    height: 120px;
    width: 120px;
    font-weight: bold;
    font-size: large;
    /* color: #FB8C00;
    border: 2px solid #FB8C00; */
    color: #f68a8a;
    border: 2px solid #f68a8a;
    background-color: #FFFF;
    border-radius: 50%;
    box-shadow: 0 3px 10px rgba(0, 0, 0, 0.3);
    transition: background-color 0.5s;
  }
  .cancel-btn:hover{
    color: #FFFF;
    border: 2px solid #f68a8a;
    background-color: #f68a8a;
  }
</style>

<script setup lang="ts">
  import { computed, ref, onMounted, defineProps } from 'vue'
  import { useRoute } from 'vue-router'
  import { useStore } from 'vuex'
  import MyPageProfile from '@/components/MyPageProfile.vue';
  import UserDetailContent from '@/components/UserDetailContent.vue';
  import UserDetailOogiri from '@/components/UserDetailOogiri.vue'
  import LaughModal from "@/components/LaughModal.vue";
  import LaughApprovalModal from "@/components/LaughApprovalModal.vue";
  import LaughCancelModal from "@/components/LaughCancelModal.vue";
  import http from "@/http-common"
  import type User from "@/types/User";

  onMounted(() => { getData(); });

  const oogiriRef = ref();
  const contentRef = ref();
  const route = useRoute()
  const store = useStore();
  const userId = store.getters['user/getUserId'];
  const userType = store.getters['user/getUserType'];
  const src = ref("/img/man.svg");

  
  /** 大喜利取得 */
  const getOogiri = () => {
    if (oogiriRef.value == undefined) {
      setTimeout(_getOogiri, 200);
    } else {
      _getOogiri;
    }
  }
  /** 大喜利取得(実行用) */
  const _getOogiri = () => { oogiriRef.value.getOogiri(route.query.receiveUserId); }

  /** 投稿取得 */
  const getContet = () => {
    if (contentRef.value == undefined) {
      setTimeout(_getContet, 200);
    } else {
      contentRef.value.getContent(route.query.receiveUserId);
    }
  }
  const _getContet = () => { contentRef.value.getContent(route.query.receiveUserId); }

  const tab = ref(null);
  const user = ref<User>();

  const dispUsers = ref([] as User[]);
  /** User一覧を取得する */
  const getData = async () => {
    const {data} = await http.get('/userDetail/init',{
      params: {
        receiveUserId: route.query.receiveUserId,
        sendUserId: userId,
        userType: route.query.userType
      }}
    )
    user.value = data.data;
    getContet();
  }

  const sendMsg = "どちらを送りますか？";
  const recieveMsg = "Laughを承認しますか？";
  const cancelMsg = "マッチングを解消しますか？";
  const modal = ref(false);

  const showModal = () => {
    // モーダル表示する際の処理が必要ならここに書く
    modal.value = true;
  };

  const postMatch = async (matchStatus: number) => {
    modal.value = false;
    const sendUserId = userId
    const receiveUserId = route.query.receiveUserId
    if (matchStatus != null) {
      await http.post('/userDetail/match', { matchStatus, sendUserId, receiveUserId, userType })
      getData();
    }
  };
</script>