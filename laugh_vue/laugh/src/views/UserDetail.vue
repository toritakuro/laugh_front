<template>
  <v-container fluid="true">
    <v-row>
      <v-col cols="6" >
        <v-col>
          <v-card class="mx-auto pa-2 detail_card">
            <v-container fluid="true">
              <v-row>
                <v-col cols="5">
                  <v-img
                    :aspect-ratio="1"
                    src="https://comedian-new.com/wp-content/uploads/2020/01/samezombie.png"
                    cover
                    class="rounded-lg  profile_img"
                ></v-img>
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
                  <v-card-text class="text-subtitle-1">{{ user?.selfIntroduction }}</v-card-text>
                </v-col>
              </v-row>
            </v-container>
          </v-card>
        </v-col>
      </v-col>   
      <v-col cols="6">
        <v-card>
          <v-tabs
            v-model="tab"
            color="orange-darken-2"
          >
            <v-tab value="profile" @click="getOogiri">
              <v-icon middle size="x-large" icon="mdi-account" />
                投稿一覧
            </v-tab>
            <v-tab value="oogiri" @click="getOogiri">
              <v-icon middle size="x-large" icon="mdi-handshake" />
                大喜利の投稿履歴
            </v-tab>
          </v-tabs>
          <v-card-text>
            <v-window v-model="tab">
              <v-window-item value="profile">
                <UserDetailOogiri ref="profileRef"></UserDetailOogiri>
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
      <div v-if="user?.matchStatus === undefined">
        <v-btn color="orange-darken-1" size="default" @click="showModal()">match!!</v-btn>
        <LaughModal
        :message="sendMsg"
        v-show="modal"
        @post-match="postMatch"
        ></LaughModal>
      </div>
      <div v-if="user?.matchStatus === 0">
        <v-btn color="orange-darken-1" size="default" @click="showModal()">承認!!</v-btn>
        <LaughApprovalModal
        :message="recieveMsg"
        v-show="modal"
        @post-match="postMatch"
        ></LaughApprovalModal>
      </div>
      <div v-if="user?.matchStatus === 10 || user?.matchStatus === 11">
        <v-btn color="orange-darken-1" size="default" @click="showModal()">match解消</v-btn>
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
  .profile {
    /* height: 550px; */
  }
  /* .profile_right {
    height: 550px;
    overflow-y: scroll;
  } */
  .v-card-text {
    padding: 0rem;
    white-space: pre-line;
    display: -webkit-box; /* 必須 */
    -webkit-box-orient: vertical; /* 必須 */
    overflow: hidden; 
  }
  /* プロフィール */



  .detail_card .v-card-subtitle {
    border-bottom: 2px dashed #FB8C00;
    /* border-bottom: 2px dotted #FB8C00; */
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
  top: 250px;
  right: 20px;
  z-index: 100;
}

</style>

<script setup lang="ts">
import { computed, ref, onMounted, defineProps } from 'vue'
import { useRoute } from 'vue-router'
import MyPageProfile from '@/components/MyPageProfile.vue';
import UserDetailOogiri from '@/components/UserDetailOogiri.vue'
import LaughModal from "@/components/LaughModal.vue";
import LaughApprovalModal from "@/components/LaughApprovalModal.vue";
import LaughCancelModal from "@/components/LaughCancelModal.vue";
import http from "@/http-common"
import type User from "@/types/User";

onMounted(() => { getData(); });

const route = useRoute()
// onMounted(() => {
//     console.log(route.query.myId)
//     console.log(route.query.userType)
//     userId.value = route.query.userId
//     console.log("userId",userId.value)
//     getData();
//     // getLaugh();
//     // getProfile();
//   })
  const userId = ref()

  const oogiriRef = ref();
  const getOogiri = () => {
    oogiriRef.value.getOogiri();
  }
  const tab = ref(null);
  const user = ref<User>();

  const dispUsers = ref([] as User[]);
  /** User一覧を取得する */
  const getData = async () => {
    const {data} = await http.get('/userDetail/init',{
      params: {
        receiveUserId: route.query.receiveUserId,
        sendUserId: route.query.sendUserId,
        userType: route.query.userType
      }}
    )
    user.value = data.data;
    console.log("user",user.value)
    getOogiri();
  }

const sendMsg = "どちらを送りますか？";
const recieveMsg = "マッチングしますか？";
const cancelMsg = "マッチングを解消しますか？";
const modal = ref(false);

const showModal = () => {
  // モーダル表示する際の処理が必要ならここに書く
  modal.value = true;
  console.log("aaa",modal.value)
};

const postMatch = async (matchStatus: number) => {
  // モーダルを非表示にして、モーダルでの選択結果によって処理を変える
  console.log("aaa")
  modal.value = false;
  const sendUserId = 2
  const receiveUserId = route.query.receiveUserId
  const userType = 2
  if (matchStatus != null) {
    await http.post('/userDetail/regMatch', { matchStatus, sendUserId, receiveUserId, userType })
  }
};
</script>
