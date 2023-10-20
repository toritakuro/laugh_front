<template>
  <v-container fluid="true">
    <v-row>
      <!-- <v-col cols="6" class="profile">
        <v-container fluid="true">
          <v-row>
            <v-card class="mx-auto pa-2">
              <v-row class="profile">
                  <v-col cols="5" class="profile_left">
                  <v-img
                    :aspect-ratio="1"
                    src="https://comedian-new.com/wp-content/uploads/2020/01/samezombie.png"
                    cover
                    class="rounded-lg  profile_img"
                ></v-img>
                <v-card-title class="font-weight-black pt-0 pb-0 profile_info_name">{{ user?.userName }}</v-card-title>
                </v-col>
                <v-col cols="7" class="profile_right">
                  <v-card-subtitle v-if="user?.gender == 1"><v-icon icon="mdi-gender-male-female" /> 男 </v-card-subtitle>
                  <v-card-subtitle v-if="user?.gender == 2"><v-icon icon="mdi-gender-male-female" /> 女 </v-card-subtitle>
                  <v-card-subtitle v-if="user?.gender == 3"><v-icon icon="mdi-gender-male-female" /> 男女 </v-card-subtitle>
                  <v-card-text v-if="user?.userType == 1"><v-icon icon="mdi-account" /> {{ user?.memberNum }} 人</v-card-text>
                  <v-card-text><v-icon icon="mdi-calendar-account-outline" /> {{ user?.activityDt }}</v-card-text>
                  <v-card-subtitle><v-icon icon="mdi-office-building" /> {{ user?.officeName }}</v-card-subtitle>
                  <v-card-subtitle><v-icon icon="mdi-map-marker" /> {{ user?.areaName }}</v-card-subtitle>
                  <v-card-subtitle v-if="user?.userType == 1" class="mb-1 text-subtitle-1">芸風</v-card-subtitle>
                  <v-card-subtitle v-if="user?.userType == 2" class="mb-1 text-subtitle-1">得意分野</v-card-subtitle>
                  <v-chip
                    v-for="(itemName, i) in user?.comedyStyleNameList" :key="i"
                    class="mr-1 mt-1"
                    color="orange"
                    text-color="white"
                    >{{ itemName }}
                  </v-chip>
                  <div v-if="user?.userType == 2">
                    <v-card-subtitle class="mb-1 text-subtitle-1 profile_specialSkill_text">特殊スキル</v-card-subtitle>
                      <v-chip
                        v-for="(itemName, i) in user?.specialSkillNameList" :key="i"
                        class="mr-1 mt-1"
                        color="orange"
                        text-color="white"
                        >{{ itemName }}
                      </v-chip>
                  </div>
                  <v-card-subtitle class="mb-1 text-subtitle-1"><v-icon icon="mdi-comment-account-outline" />自己紹介</v-card-subtitle>
                  <v-card-text class="text-subtitle-1">{{ user?.selfIntroduction }}</v-card-text>
                </v-col>
                <v-col class="profile_downside" v-if="user?.userType === 1">
                      
                      
                    </v-col>
              </v-row>
              <v-row>
                <v-btn>Laugh</v-btn>
                <v-btn>superLaugh</v-btn>
              </v-row>
            </v-card>
          </v-row>

        </v-container>
      </v-col> -->


      
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
                      <v-card-subtitle v-if="user?.gender == 1"><v-icon icon="mdi-gender-male-female" /> 男 </v-card-subtitle>
                      <v-card-subtitle v-if="user?.gender == 2"><v-icon icon="mdi-gender-male-female" /> 女 </v-card-subtitle>
                      <v-card-subtitle v-if="user?.gender == 3"><v-icon icon="mdi-gender-male-female" /> 男女 </v-card-subtitle>
                      <v-card-subtitle v-if="user?.userType == 1"><v-icon icon="mdi-account" /> {{ user?.memberNum }} 人</v-card-subtitle>
                      <v-card-subtitle><v-icon icon="mdi-calendar-account-outline" /> {{ user?.activityDt }}</v-card-subtitle>
                      <v-card-subtitle><v-icon icon="mdi-office-building" /> {{ user?.officeName }}</v-card-subtitle>
                      <v-card-subtitle><v-icon icon="mdi-map-marker" /> {{ user?.areaName }}</v-card-subtitle>
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
          <v-tab value="contents" @click="getLugh">投稿一覧</v-tab>
          <v-tab value="oogiri" @click="getLugh">大喜利の投稿履歴</v-tab>
        </v-tabs>
        <v-card-text>
        <v-window v-model="tab">
          <v-window-item value="profile">
            <MyPageProfile ref="profileRef"></MyPageProfile>
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

</style>

<script setup lang="ts">
import { computed, ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import http from "@/http-common"
import type User from "@/types/User";

const route = useRoute()
onMounted(() => {
    console.log(route.query.myId)
    console.log(route.query.userType)
    getData();
  })

  const user = ref<User>();

  const dispUsers = ref([] as User[]);
  /** User一覧を取得する */
  const getData = async () => {
    const {data} = await http.get('/userDetail/init',{
      params: {
        userId: route.query.userId,
        userType: route.query.userType
      }}
    )
    user.value = data.data;
    console.log(user.value)
    // usersOrigin.value = data.data;
    // dispUserType.value = usersOrigin.value[0].userType
    // countUsers()
    // postSort()
  }
</script>
