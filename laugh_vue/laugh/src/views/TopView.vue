<template>
  <v-container fluid>
    <v-row>
        <v-col offset="7" cols="1" class="pt-0 pb-0 pl-9 mt-3">
          <div style="border-bottom: 1px solid; width: 60px; text-align: center;">
            <v-text class="text-h5 upside_num">{{ dispUserCount }}</v-text>
            <v-text class="text-h7"> 件</v-text>
          </div>
        </v-col>
    </v-row>
    <v-row justify="center" class="mt-2">
      <!-- プロフィール -->
      <v-col cols="6" class="main">
        <v-row>
          <v-col
            class="ps-6 user_filter"
            cols="5"
            >
              <v-row>
                <v-col>
                <v-select
                  append-icon="mdi-sort"
                  class="upside_pulldown"
                  v-model="selectedSorts"
                  :items="optionSorts"
                  item-title="name"
                  item-value="id"
                  label="Select"
                  persistent-hint
                  return-object
                  single-line
                  hide-details="true"
                  density="compact"
                  @update:modelValue="postSort"
                ></v-select>
                </v-col>
              </v-row>
              <v-row>
                <v-col>
                  <v-text-field
                    label="活動名"
                    density="compact"
                    bg-color="#fffffff"
                    @input="postName"
                    v-model="searchName"
                    hide-details="true"
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col>
                  <v-card-subtitle class="font-weight-bold text-subtitle-1">性別</v-card-subtitle>
                  <v-checkbox-group inline v-model="checkGender">
                    <v-checkbox
                      v-for="select in optionGender"
                      v-bind:value="select.id" 
                      v-bind:key="select.id" 
                      v-bind:label="select.name"
                      v-model="select.flg"
                      @click="postGender(select.id, select.flg)"
                      density="compact"
                      hide-details="true"
                      color="orange-darken-1"
                    ></v-checkbox>
                  </v-checkbox-group>
                </v-col>
              </v-row>
              <v-row>
              <v-col v-if="dispUserType == 1">
                <v-card-subtitle class="font-weight-bold text-subtitle-1">活動形態</v-card-subtitle>
                <v-checkbox-group v-model="checkActivityNum">
                  <v-checkbox
                    v-for="select in optionActivityNum"
                    v-bind:value="select.id" 
                    v-bind:key="select.id" 
                    v-bind:label="select.name"
                    v-model="select.flg"
                    @click="postActivityNum(select.id, select.flg)"
                    density="compact"
                    hide-details="true"
                    color="orange-darken-1"
                  ></v-checkbox>
                </v-checkbox-group>
              </v-col>
              </v-row>
              <v-row>
                <v-col>
                  <v-card-subtitle class="font-weight-bold text-subtitle-1 py-2">活動歴</v-card-subtitle>
                  <v-radio-group v-model="radiosActivity">
                    <v-radio
                      v-for="select in optionActivity"
                      v-bind:value="select.id" 
                      v-bind:key="select.id" 
                      v-bind:label="select.name"
                      @click="postActivity(select.id, select.value)"
                      density="compact"
                      hide-details="true"
                      color="orange-darken-1"
                    ></v-radio>
                  </v-radio-group>
                </v-col>
              </v-row>
              <v-row>
              <v-col>
                <v-card-subtitle class="font-weight-bold text-subtitle-1">事務所</v-card-subtitle>
                <v-checkbox-group v-model="checkOffice">
                  <v-checkbox
                    v-for="select in optionOffice"
                    v-bind:value="select.id" 
                    v-bind:key="select.id" 
                    v-bind:label="select.name"
                    v-model="select.flg"
                    @click="postOffice(select.id, select.flg)"
                    density="compact"
                    hide-details="true"
                    color="orange-darken-1"
                  ></v-checkbox>
                </v-checkbox-group>
              </v-col>
              </v-row>
              <v-row>
                <v-col>
                  <v-card-subtitle class="font-weight-bold text-subtitle-1" v-if="dispUserType == 1">芸風</v-card-subtitle>
                  <v-card-subtitle class="font-weight-bold text-subtitle-1" v-if="dispUserType == 2">得意分野</v-card-subtitle>
                  <v-checkbox-group v-model="checkComedyStyle">
                    <v-checkbox
                      v-for="select in optionComedyStyle"
                      v-bind:value="select.id" 
                      v-bind:key="select.id" 
                      v-bind:label="select.name"
                      v-model="select.flg"
                      @click="postComedyStyle(select.id, select.flg)"
                      density="compact"
                      hide-details="true"
                      color="orange-darken-1"
                    ></v-checkbox>
                  </v-checkbox-group>
                </v-col>
              </v-row>
              <v-row>
                <v-col v-if="dispUserType == 2">
                  <v-card-subtitle class="font-weight-bold text-subtitle-1 py-2">料金体系</v-card-subtitle>
                  <v-select
                    v-model="selectFeeType"
                    :items="optionFeeType"
                    item-title="name"
                    item-value="id"
                    label="Select"
                    persistent-hint
                    return-object
                    single-line
                    @update:modelValue="postFeeType"
                  ></v-select>
                </v-col>
                <v-col v-if="dispUserType == 2">
                <v-card-subtitle class="font-weight-bold text-subtitle-1">金額</v-card-subtitle>
                  <div class="d-flex flex-row">
                    <v-sheet class="py-2 w-100">
                      <v-select
                        v-model="selectLowPrice"
                        :items="optionLowPrice"
                        item-title="name"
                        item-value="id"
                        label="Select"
                        persistent-hint
                        return-object
                        single-line
                        @update:modelValue="postFee"
                      ></v-select>
                    </v-sheet>
                    <v-sheet class="mb-4 align-self-center"><span class="search-ttl-span">～</span></v-sheet>
                    <v-sheet class="py-2 w-100">
                      <v-select
                        v-model="selectHighPrice"
                        :items="optionHighPrice"
                        item-title="name"
                        item-value="id"
                        label="Select"
                        persistent-hint
                        return-object
                        single-line
                        @update:modelValue="postFee"
                      ></v-select>
                    </v-sheet>
                  </div>
                </v-col>
              </v-row>
              <v-row>
                <v-col v-if="dispUserType == 2">
                  <v-card-subtitle class="font-weight-bold text-subtitle-1">特殊スキル</v-card-subtitle>
                  <v-checkbox-group v-model="checkSpecialSkill">
                    <v-checkbox
                      v-for="select in optionSpecialSkill"
                      v-bind:value="select.id" 
                      v-bind:key="select.id" 
                      v-bind:label="select.name"
                      v-model="select.flg"
                      @click="postSpecialSkill(select.id, select.flg)"
                      density="compact"
                      hide-details="true"
                      color="orange-darken-1"
                    ></v-checkbox>
                  </v-checkbox-group> 
                </v-col>
              </v-row>
              <v-row>
                <v-col>
                  <v-card-subtitle class="font-weight-bold text-subtitle-1 py-2">活動場所</v-card-subtitle>
                  <v-select-group>
                    <v-select
                      v-model="selectArea"
                      :items="optionArea"
                      item-title="text"
                      item-value="id"
                      label="Select"
                      persistent-hint
                      return-object
                      single-line
                      density="compact"
                      @update:modelValue="postArea"
                    ></v-select>
                  </v-select-group>
                </v-col>
              </v-row>
              <v-col align="center">
                <v-btn variant="tonal" @click="clear">
                  clear
                </v-btn>
              </v-col>
          </v-col>
          
          <v-col offset="2" cols="8" class="profile" >
            <v-col v-for="item in dispUsers" class="profile_paddingTop">
              <v-card class="mx-auto pa-2 profile_card" @click="redirectToDetails(item, 1)">
                <v-container fluid="true">
                  <v-row>
                    <v-col class="pa-0" lg="6" md="6" sm="12">
                      <v-img
                        :aspect-ratio="1"
                        :src="item.profileImgPath"
                        cover
                        class="rounded-lg  profile_img"
                    ></v-img>
                    </v-col>
                    <v-col class="pa-0 profile_info" lg="6" md="6" sm="12">
                      <v-card-title class="font-weight-black pt-0 pb-0 profile_info_name">{{ item.userName }}</v-card-title>
                      <v-card-subtitle v-if="item.gender == 1"><v-icon icon="mdi-gender-male-female" /> 男 </v-card-subtitle>
                      <v-card-subtitle v-if="item.gender == 2"><v-icon icon="mdi-gender-male-female" /> 女 </v-card-subtitle>
                      <v-card-subtitle v-if="item.gender == 3"><v-icon icon="mdi-gender-male-female" /> 男女 </v-card-subtitle>
                      <v-card-subtitle v-if="item.userType == 1"><v-icon icon="mdi-account" /> {{ item.memberNum }} 人</v-card-subtitle>
                      <v-card-subtitle><v-icon icon="mdi-calendar-account-outline" /> {{ item.activityDt }}</v-card-subtitle>
                      <v-card-subtitle><v-icon icon="mdi-office-building" /> {{ item.officeName }}</v-card-subtitle>
                      <v-card-subtitle><v-icon icon="mdi-map-marker" /> {{ item.areaName }}</v-card-subtitle>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col class="profile_downside" v-if="item.userType === 2">
                      <v-card-subtitle class="mb-1 text-subtitle-1">得意分野</v-card-subtitle>
                      <v-chip
                        v-for="(itemName, i) in item.comedyStyleNameList" :key="i"
                        class="mr-1 mt-1 profile_chip"
                        color="orange"
                        text-color="white"
                        >{{ itemName }}
                      </v-chip>
                      <v-card-subtitle class="mb-1 text-subtitle-1 profile_specialSkill_text">特殊スキル</v-card-subtitle>
                      <v-chip
                        v-for="(itemName, i) in item.specialSkillNameList" :key="i"
                        class="mr-1 mt-1"
                        color="orange"
                        text-color="white"
                        >{{ itemName }}
                      </v-chip>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col class="profile_downside" v-if="item.userType === 1">
                      <v-card-subtitle class="mb-1 text-subtitle-1">芸風</v-card-subtitle>
                      <v-chip
                        v-for="(itemName, i) in item.comedyStyleNameList" :key="i"
                        class="mr-1 mt-1"
                        color="orange"
                        text-color="white"
                        size="small"
                        >{{ itemName }}
                      </v-chip>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col class="profile_downside">
                      <v-card-subtitle class="mb-1 text-subtitle-1"><v-icon icon="mdi-comment-account-outline" />自己紹介</v-card-subtitle>
                      <v-card-text class="text-subtitle-1">{{ item.selfIntroduction }}</v-card-text>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card>
            </v-col>
          </v-col>
          <!-- 検索エリア-->
        </v-row>
      </v-col>
      <div class="notice">
        <v-card
          class="mx-auto"
          max-width="344"
        >
        <v-card-text class="aaaa">
          <div class="text-h５ text--primary title"><p class="font-weight-bold" style="display: inline-block;vertical-align: middle;">お知らせ</p></div>
          <div class="text--primary">
              <template v-for="n in notice">
              <v-hover v-slot="{ isHovering, props }">
              <div 
                :class="{ 'div-hover': isHovering }"
                class="noticeRow">
                <div
                  @click="readMessage(n)"
                  v-bind="props">
                  {{ n.message }}
                </div>
              </div>
              </v-hover>
              </template>
          </div>
        </v-card-text>
        </v-card>
    </div>
    </v-row>
  </v-container>
</template>  



<style scoped>
@media screen and (min-width: 960px) and (max-width:1280px) {
  .user_filter {
    background-color: #EF9A9A;
    top: 25%  !important;
    left: 10% !important;
  }
  .notice {
    right: 10px !important;
  }
}
@media screen and (max-width:959px) {
  .user_filter {
    display: none;
  }
}
.notice {
  position: fixed;
  top: 120px;
  right: 1px;
  width: 400px;
}
.notice .title {
  background-color: #EF9A9A;
  display: flex;
  align-items: center;
  height: 30px;
  padding-left:5px;
}
.user_filter {
  transform: scale(0.9) translate(0px, -92px);
  position: fixed;
  top: 22%;
  left: 16%;
  width: 300px;
  max-height: 80%;
  overflow-y: scroll;
  border: 1px solid #efefef;
  border-radius: 5px;
}
.upside_num {
  font-weight: bold;
  color:  #FB8C00;
}
.noticeRow {
  height: 30px;
}
.noticeRow > div {
  display: inline-block;
  vertical-align: middle;
}

/* 上部分 */
  .upside {
    transform: translate(-130px, 20px);
    height: 70px;
    margin-bottom: 30px;
  }
  .upside_right {
    display: flex;
  }
  .upside_ken {
    margin-right: 15%;
    margin-left: 5px;
    line-height: 75px;
  }
  .upside_sortIcon {
    margin-top: 27px;
  }
  .upside_sortText {
    line-height: 75px;
    margin-right: 5px;
  } 
  /* .upside_pulldown {
    margin: 9px 70px 0px 0px;
  } */

  .main {
    height: 1600px;
  }
  /* プロフィール */
  .profile_paddingTop {
    padding-top: 0px;
  }
  .profile_card {
    border: 4px solid #FB8C00;
    border-radius: 10px;
  }
  .profile_info .v-card-subtitle{
    padding: 0.2rem 0.7rem
  }
  .profile_info_name {
    border-bottom: 2px solid #FB8C00;
    margin-left: 7px;
    margin-bottom: 20px;
  }
  .profile_downside {
    padding: 0.5rem 0rem;
  }
  .profile_specialSkill_text {
    margin-top: 7px;
  }
 .profile_ichioshi {
    padding: 0.5rem 0rem 0rem 0rem;
  } 
  .profile_ichioshi_neta {
    padding: 0;
  }
  .recomend-script {
    border-left: 5px solid #FB8C00;
    padding-left: 5px;
    color: #000000;
  }
  .profile_contents {
    width: 0.5rem;
  }
  .profile_comedyStyle {
    padding-left: 0.2rem;
  }
  .profile_img {
    width:180px;
  }
  .v-card-text {
    padding: 0rem;
    white-space: pre-line;
    display: -webkit-box; /* 必須 */
    -webkit-box-orient: vertical; /* 必須 */
    -webkit-line-clamp: 5; /* 行数を制限 */
    overflow: hidden; 
  }
  .v-card-title {
    padding: 0.5rem;
  }
  
  .v-card-subtitle{
    padding: 0;
  }
  .v-card-subtitle.profileInfo{
    padding: 0 1rem;
  }
  .v-list-item_prepend {
    width: 0.5rem;
  }
  .profile_chip {
    font-weight: bold;
  }

  /* ユーザーフィルター */
  .user_filter_card {
    border: 3px solid #FB8C00;
    border-radius: 10px;
  }
  
  .div-hover { cursor: pointer; }
  .div-hover { background-color: var(--blue-grey-lighten-5); }
  
  </style>
  <script setup lang="ts">
  import { computed, ref, onMounted } from 'vue'
  import { useRouter } from 'vue-router';
  import type User from "@/types/User";
  import type Notice from '@/types/Notice';
  import http from "@/http-common"
  import { useStore } from 'vuex';

  const dispUsers = ref([] as User[]);
  const usersOrigin = ref([] as User[]);
  const notice = ref([] as Notice[]);
  const dispUserType = ref();
  const dispUserCount = ref(0);
  const store = useStore();
  const eee = ref([{id:1, type:"1", message:"メッセージ1"},{id:2, type:"2",message:"メッセージ２"}]);

  onMounted(() => {
    getData();
    getNotice();
  })

  const router = useRouter()

const redirectToDetails = async (item: User, sendUserId: number) => {
  router.push({ name: 'detail', query: { receiveUserId: item.id, userType: item.userType, sendUserId: sendUserId }  })
  // const themeId = route.query.themeId;
  // const {data} = await http.get('oogiri/detail',{
  //   params: {
  //     themeId: themeId
  //   }}
  // )
  // oogiri.value = [data.data];
}

  /** お知らせ取得 */
  const getNotice = async () => {
    const {data} = await http.get('/notice',{
      params: {
        userId: store.state.user.userId
      }}
    );
    notice.value = data.data;
  }

  // メッセージ既読
  const readMessage = (notice: Notice) => {
    http.post('/notice',{id: notice.id });
    // notice.targetTypeを見て、notice.targetIdで振り分け :TODO
  }
  /** User一覧を取得する */
  const getData = async () => {
    const {data} = await http.get('/top',{
      params: {
        userType: store.state.user.userType
      }}
    )
    dispUsers.value = data.data;
    usersOrigin.value = data.data;
    dispUserType.value = usersOrigin.value[0].userType
    countUsers()
    postSort()
  }

  const items = ref([
    { text: 'トカゲのおっさん', icon: 'mdi-video' },
    { text: 'ゴレンジャイ', icon: 'mdi-file' },
  ]) ;

  // sort
  const selectedSorts = ref({ id: 1, name: 'ログイン順'})
  const optionSorts = [
    { id: 1, name: 'ログイン順'},
    { id: 2, name: '更新順' } 
  ]

  const postSort = () => {
    switch (selectedSorts.value.id) {
      case 1:
        dispUsers.value = dispUsers.value.sort((a, b) => {
          return b.loginAtInt - a.loginAtInt
        })
        break
      case 2:
        dispUsers.value = dispUsers.value.sort((a, b) => {
          return b.updateAtInt - a.updateAtInt
        })
        break
    }
  }

  // 一覧の件数
  const countUsers = () => {
    dispUserCount.value = dispUsers.value.length
  }

  //search
  const checkGender = ref([])
  const optionGender = ref([
    { id: 1, name: '男', flg: false},
    { id: 2, name: '女', flg: false},
    { id: 3, name: '男女', flg: false}
  ])

  const checkActivityNum = ref([])
  const optionActivityNum = ref([
    { id: 1, name: 'ピン', flg: false},
    { id: 2, name: 'コンビ', flg: false},
    { id: 3, name: 'トリオ以上', flg: false}
  ])

  const radiosActivity = ref(0)
  const optionActivity = ref([
    { id: 0, value: 0, name: '指定しない'},
    { id: 1, value: 1, name: '１年未満'},
    { id: 2, value: 2, name: '２年未満'},
    { id: 3, value: 4, name: '４年未満'},
    { id: 4, value: 6, name: '６年未満'},
    { id: 5, value: 8, name: '８年未満'},
    { id: 6, value: 10, name: '１０年未満'},
    { id: 7, value: 10, name: '１０年以上'}
  ])

  const checkOffice = ref([])
  const optionOffice = ref([
    { id: 1, name: '吉本興業', flg: false},
    { id: 2, name: '人力舎', flg: false},
    { id: 3, name: 'マセキ芸能社', flg: false},
    { id: 4, name: '松竹芸能', flg: false},
    { id: 5, name: 'その他', flg: false}
  ])

  const checkComedyStyle = ref([])
  const optionComedyStyle = ref([
    { id: 1, name: '漫才', flg: false},
    { id: 2, name: 'コント', flg: false},
    { id: 3, name: 'ギャグ', flg: false},
    { id: 4, name: 'モノマネ', flg: false},
    { id: 5, name: '歌ネタ', flg: false},
    { id: 6, name: 'リズムネタ', flg: false},
    { id: 7, name: 'その他', flg: false}
  ])

  const selectFeeType = ref({ id: 0, name: '' });
  const optionFeeType = ref([
    { id: 0, name: ''},
    { id: 1, name: '時給'},
    { id: 2, name: '出来高' }
  ])

  const selectLowPrice = ref({ id: 0, value: 0, name: '下限なし' });
  const optionLowPrice = ref([
    { id: 0, value: 0, name: '下限なし'},
    { id: 1, value: 1000, name: '1000円'},
    { id: 2, value: 2000, name: '2000円'},
    { id: 3, value: 3000, name: '3000円'},
    { id: 4, value: 4000, name: '4000円'},
    { id: 5, value: 5000, name: '5000円'},
    { id: 6, value: 6000, name: '6000円'},
    { id: 7, value: 7000, name: '7000円'},
    { id: 8, value: 8000, name: '8000円'},
    { id: 9, value: 9000, name: '9000円'},
    { id: 10, value: 10000, name: '10000円'}
  ])

  const selectHighPrice = ref({ id: 0, value: 0, name: '上限なし' });
  const optionHighPrice = ref([
    { id: 0, value: 0, name: '上限なし'},
    { id: 1, value: 1000, name: '1000円'},
    { id: 2, value: 2000, name: '2000円'},
    { id: 3, value: 3000, name: '3000円'},
    { id: 4, value: 4000, name: '4000円'},
    { id: 5, value: 5000, name: '5000円'},
    { id: 6, value: 6000, name: '6000円'},
    { id: 7, value: 7000, name: '7000円'},
    { id: 8, value: 8000, name: '8000円'},
    { id: 9, value: 9000, name: '9000円'},
    { id: 10, value: 10000, name: '10000円'}
  ])

  const checkSpecialSkill = ref([])
  const optionSpecialSkill = ref([
    { id: 1, name: '動画編集', flg: false},
    { id: 2, name: 'イラスト', flg: false},
    { id: 3, name: '音源制作', flg: false},
    { id: 4, name: '振り付け', flg: false},
    { id: 5, name: 'ものしり', flg: false},
    { id: 6, name: 'その他', flg: false}
  ])

  const selectArea = ref({ id: 0, text: ''});
  const optionArea = ref([
    { id: 0, text: ''},
    { id: 1, text: '北海道'},
    { id: 2, text: '東北' }, 
    { id: 3, text: '関東' },
    { id: 4, text: '中部' }, 
    { id: 5, text: '近畿' }, 
    { id: 6, text: '中国' }, 
    { id: 7, text: '九州' }
  ])
 
  // チェックフラグ
  const isChecked = ref(false)
  // チェックフラグ更新
  const isCheckedCategory = () => {
    if (searchName.value != ''
    || checkedGenderIds.value.length > 1
    || checkedMemberNumIds.value.length > 1
    || checkedActivityId.value > 0
    || checkedOfficeIds.value.length > 1
    || checkedComedyStyleIds.value.length > 1
    || selectFeeType.value.id > 0
    || selectLowPrice.value.value >0
    || selectHighPrice.value.value  > 0
    || checkedSpecialSkillIds.value.length > 1
    || selectArea.value.id > 0) {
      isChecked.value = true
    } else {
      isChecked.value = false
    }
  }


  // 活動名
  const searchName = ref('')
  const searchKariName = ref('')
  const postName = () => {
    // スペースを削除
    searchKariName.value = searchName.value.trim().replace(/\s/g,"")
    userSearch()
  }

  // 性別
  const checkedGenderIds = ref([{ id: 0 }]);
  const postGender = (id: number, flg: boolean) => {
    const checkedGenderId = { id: id }
    // チェックつけた時
    if (!flg) {
      checkedGenderIds.value.push(checkedGenderId)
      userSearch()
      optionGender.value[id - 1].flg = true
    } else {
      // チェック外した時
      checkedGenderIds.value = checkedGenderIds.value.filter(t => t.id !== id)
      userSearch()
      optionGender.value[id - 1].flg = false
    }
  }

  // 活動形態
  const checkedMemberNumIds = ref([{ id: 0 }]);
  const postActivityNum = (id: number, flg: boolean) => {
    const checkedMemberNumId = { id: id }
    // チェックつけた時
    if (!flg) {
      checkedMemberNumIds.value.push(checkedMemberNumId)
      userSearch()
      optionActivityNum.value[id - 1].flg = true
    } else {
      // チェック外した時
      checkedMemberNumIds.value = checkedMemberNumIds.value.filter(t => t.id !== id)
      userSearch()
      optionActivityNum.value[id - 1].flg = false
    }
  }

  // 活動歴
  const checkedActivityId = ref(0);
  const checkedActivityValue = ref(0);
  const postActivity = (id: number, value: number) => {

    checkedActivityId.value = id
    checkedActivityValue.value = value
    userSearch()

  }

  // 事務所
  const checkedOfficeIds = ref([{ id: 0 }]);
  const postOffice = (id: number, flg: boolean) => {
    const checkedOfficeId = { id: id }
    // チェックつけた時
    if (!flg) {
      checkedOfficeIds.value.push(checkedOfficeId)
      userSearch()
      optionOffice.value[id - 1].flg = true
    } else {
      // チェック外した時
      checkedOfficeIds.value = checkedOfficeIds.value.filter(t => t.id !== id)
      userSearch()
      optionOffice.value[id - 1].flg = false
    }
  }

  // 芸風
  const checkedComedyStyleIds = ref([{ id: 0 }])
  const postComedyStyle = (id: number, flg: boolean) => {
    const checkedComedyStyleId = { id: id }
    // チェックつけた時
    if (!flg) {
      checkedComedyStyleIds.value.push(checkedComedyStyleId)
      userSearch()
      optionComedyStyle.value[id - 1].flg = true
    } else {
      // チェック外した時
      checkedComedyStyleIds.value = checkedComedyStyleIds.value.filter(t => t.id !== id)
      userSearch()
      optionComedyStyle.value[id - 1].flg = false
    }
  }

  // 料金形態
  const postFeeType = () => {
    userSearch()
  }

  // 料金
  const postFee = () => {
    userSearch()
  }

  // 特殊スキル
  const checkedSpecialSkillIds = ref([{ id: 0 }])
  const postSpecialSkill = (id: number, flg: boolean) => {
    const checkedSpecialSkillId = { id: id }
    // チェックつけた時
    if (!flg) {
      checkedSpecialSkillIds.value.push(checkedSpecialSkillId)
      userSearch()
      optionSpecialSkill.value[id - 1].flg = true
    } else {
      // チェック外した時
      checkedSpecialSkillIds.value = checkedSpecialSkillIds.value.filter(t => t.id !== id)
      userSearch()
      optionSpecialSkill.value[id - 1].flg = false
    }
  }

  // 活動場所
  const postArea = () => {
    userSearch()
  }


  // 絞り込み処理
  const userSearch = () => {
    const user = ref([] as User[]);
    const checkedUser = ref([] as User[]);
    const kariCheckedUser = ref([] as User[]);
    isCheckedCategory()
    if (isChecked.value) {
      // 活動名
      if (searchName.value != '') {
        // 検索内容と一致するユーザー名を取得
        user.value = usersOrigin.value.filter(function(value) {
          return value.searchUserName.indexOf(searchKariName.value) !== -1
        })
        for (var item of user.value) {
          kariCheckedUser.value.push(item)
        }
      }
      // 性別
      if (checkedGenderIds.value.length > 1) {
        // 別カテゴリーにもチェックが入っている場合
        if (searchName.value != '') {
          const kariCheckedGenderUser = ref([] as User[])
          for (var genderId of checkedGenderIds.value) {
            // チェック済みの性別と一致するユーザーを取得
            user.value = kariCheckedUser.value.filter(t => t.gender === genderId.id)
            for (var item of user.value) {
              kariCheckedGenderUser.value.push(item)
            }
          }
          kariCheckedUser.value = kariCheckedGenderUser.value
        } else {
          for (var genderId of checkedGenderIds.value) {
            // チェック済みの性別と一致するユーザーを取得
            user.value = usersOrigin.value.filter(t => t.gender === genderId.id)
            for (var item of user.value) {
              kariCheckedUser.value.push(item)
            }
          }
        }
      }
      // 活動形態
      if (checkedMemberNumIds.value.length > 1) {
        // 別カテゴリーにもチェックが入っている場合
        if (searchName.value != '') {
          const kariCheckedMemberNumUser = ref([] as User[])
          for (var memberNum of checkedMemberNumIds.value) {
            // チェック済みの活動形態と一致するユーザーを取得
            if (memberNum.id != 3) {
              user.value = kariCheckedUser.value.filter(t => t.memberNum === memberNum.id)
            } else {
              user.value = kariCheckedUser.value.filter(t => t.memberNum >= memberNum.id)
            }    
            for (var item of user.value) {
              kariCheckedMemberNumUser.value.push(item)
            }
          }
          kariCheckedUser.value = kariCheckedMemberNumUser.value
        } else {
          for (var memberNum of checkedMemberNumIds.value) {
            // チェック済みの活動形態と一致するユーザーを取得
            if (memberNum.id != 3) {
              user.value = usersOrigin.value.filter(t => t.memberNum === memberNum.id)
            } else {
              user.value = usersOrigin.value.filter(t => t.memberNum >= memberNum.id)
            }
            for (var item of user.value) {
              kariCheckedUser.value.push(item)
            }
          }
        }
      }
      // 活動歴
      if (checkedActivityId.value > 0) {
        // 別カテゴリーにもチェックが入っている場合
        if (searchName.value != ''
        || checkedGenderIds.value.length > 1) {
          // 「１０年以上」、「指定なし」以外の場合
          if (checkedActivityId.value < 7) {
            kariCheckedUser.value = kariCheckedUser.value.filter(t => t.activityNum < checkedActivityValue.value)
          } else {
            kariCheckedUser.value = kariCheckedUser.value.filter(t => t.activityNum >= checkedActivityValue.value)
          }
        } else {
          // 「１０年以上」、「指定なし」以外の場合
          if (checkedActivityId.value < 7) {
            kariCheckedUser.value = usersOrigin.value.filter(t => t.activityNum < checkedActivityValue.value)
          } else {
            kariCheckedUser.value = usersOrigin.value.filter(t => t.activityNum >= checkedActivityValue.value)
          }
        }
      }
      // 事務所
      if (checkedOfficeIds.value.length > 1) {
        // 別カテゴリーにもチェックが入っている場合
        if (searchName.value != ''
        || checkedGenderIds.value.length > 1
        || checkedActivityId.value > 0) {
          const kariCheckedOfficeUser = ref([] as User[])
          for (var officeId of checkedOfficeIds.value) {
            // チェック済みの事務所と一致するユーザーを取得
            user.value = kariCheckedUser.value.filter(t => t.officeId === officeId.id)
            for (var item of user.value) {
              kariCheckedOfficeUser.value.push(item)
            }
          }
          kariCheckedUser.value = kariCheckedOfficeUser.value
        } else {
          for (var officeId of checkedOfficeIds.value) {
            // チェック済みの事務所と一致するユーザーを取得
            user.value = usersOrigin.value.filter(t => t.officeId === officeId.id)
            for (var item of user.value) {
              kariCheckedUser.value.push(item)
            }
          }
        }
      }
      // 芸風
      if (checkedComedyStyleIds.value.length > 1) {
        // 別カテゴリーにもチェックが入っている場合
        if (searchName.value != ''
        || checkedGenderIds.value.length > 1
        || checkedActivityId.value > 0
        || checkedOfficeIds.value.length > 1) {
          const kariCheckedComedyUser = ref([] as User[]);
          for (var comedyStyleId of checkedComedyStyleIds.value) {
            user.value = kariCheckedUser.value.filter(function(value) {
              // チェック済みの芸風を含むユーザーのみを返す
              return value.comedyStyleIdList.includes(comedyStyleId.id)
            })
            for (var item of user.value) {
              // 重複するデータ以外を含める（複数所有できるカテゴリーのため）
              if (!kariCheckedComedyUser.value.includes(item)){
                kariCheckedComedyUser.value.push(item)
              }
            }
          }
          kariCheckedUser.value = kariCheckedComedyUser.value
        } else {
          for (var comedyStyleId of checkedComedyStyleIds.value) {
            user.value = usersOrigin.value.filter(function(value) {
              // チェック済みの芸風を含むユーザーのみを返す
              return value.comedyStyleIdList.includes(comedyStyleId.id)
            })
            for (var item of user.value) {
              // 重複するデータ以外を含める（複数所有できるカテゴリーのため）
              if (!kariCheckedUser.value.includes(item)){
                kariCheckedUser.value.push(item)
              }
            }
          }
        }
      }
      // 料金形態
      if (selectFeeType.value.id > 0) {
        // 別カテゴリーにもチェックが入っている場合
        if (searchName.value != ''
        || checkedGenderIds.value.length > 1
        || checkedActivityId.value > 0
        || checkedOfficeIds.value.length > 1
        || checkedComedyStyleIds.value.length > 1) {
          kariCheckedUser.value = kariCheckedUser.value.filter(t => t.feeType === selectFeeType.value.id)
        } else {
          kariCheckedUser.value = usersOrigin.value.filter(t => t.feeType === selectFeeType.value.id)
        }
      }
      // 料金(Low)
      if (selectLowPrice.value.value  > 0) {
        // 別カテゴリーにもチェックが入っている場合
        if (searchName.value != ''
        || checkedGenderIds.value.length > 1
        || checkedActivityId.value > 0
        || checkedOfficeIds.value.length > 1
        || checkedComedyStyleIds.value.length > 1
        || selectFeeType.value.id > 0) {
          kariCheckedUser.value = kariCheckedUser.value.filter(t => t.fee >= selectLowPrice.value.value )
        } else {
          kariCheckedUser.value = usersOrigin.value.filter(t => t.fee >= selectLowPrice.value.value )
        }
      }
      // 料金(High)
      if (selectHighPrice.value.value  > 0) {
        // 別カテゴリーにもチェックが入っている場合
        if (searchName.value != ''
        || checkedGenderIds.value.length > 1
        || checkedActivityId.value > 0
        || checkedOfficeIds.value.length > 1
        || checkedComedyStyleIds.value.length > 1
        || selectFeeType.value.id > 0
        || selectLowPrice.value.value  > 0) {
          kariCheckedUser.value = kariCheckedUser.value.filter(t => t.fee <= selectHighPrice.value.value )
        } else {
          kariCheckedUser.value = usersOrigin.value.filter(t => t.fee <= selectHighPrice.value.value )
        }
      }
      // 特殊スキル
      if (checkedSpecialSkillIds.value.length > 1) {
        // 別カテゴリーにもチェックが入っている場合
        if (searchName.value != ''
        || checkedGenderIds.value.length > 1
        || checkedActivityId.value > 0
        || checkedOfficeIds.value.length > 1
        || checkedComedyStyleIds.value.length > 1
        || selectFeeType.value.id > 0
        || selectLowPrice.value.value  > 0
        || selectHighPrice.value.value  > 0) {
          const kariCheckedSpecialSkillUser = ref([] as User[]);
          for (var specialSkillId of checkedSpecialSkillIds.value) {
            user.value = kariCheckedUser.value.filter(function(value) {
              // チェック済みの特殊スキルを含むユーザーのみを返す
              return value.specialSkillIdList.includes(specialSkillId.id)
            })
            for (var item of user.value) {
              // 重複するデータ以外を含める（複数所有できるカテゴリーのため）
              if (!kariCheckedSpecialSkillUser.value.includes(item)){
                kariCheckedSpecialSkillUser.value.push(item)
              }
            }
          }
          kariCheckedUser.value = kariCheckedSpecialSkillUser.value
        } else {
          for (var specialSkillId of checkedSpecialSkillIds.value) {
            user.value = usersOrigin.value.filter(function(value) {
              // チェック済みの特殊スキルを含むユーザーのみを返す
              return value.specialSkillIdList.includes(specialSkillId.id)
            })
            for (var item of user.value) {
              // 重複するデータ以外を含める（複数所有できるカテゴリーのため）
              if (!kariCheckedUser.value.includes(item)){
                kariCheckedUser.value.push(item)
              }
            }
          }
        }
      }
      // 活動場所
      if (selectArea.value.id > 0) {
        // 別カテゴリーにもチェックが入っている場合
        if (searchName.value != ''
        || checkedGenderIds.value.length > 1
        || checkedActivityId.value > 0
        || checkedOfficeIds.value.length > 1
        || checkedComedyStyleIds.value.length > 1
        || selectFeeType.value.id > 0
        || selectLowPrice.value.value > 0
        || selectHighPrice.value.value > 0
        || checkedSpecialSkillIds.value.length > 1) {
          kariCheckedUser.value = kariCheckedUser.value.filter(t => t.areaId === selectArea.value.id)
        } else {
          kariCheckedUser.value = usersOrigin.value.filter(t => t.areaId === selectArea.value.id)
        }
      }
      checkedUser.value = kariCheckedUser.value
    } else {
      checkedUser.value = usersOrigin.value
    }
    // 表示用にセット
    dispUsers.value = checkedUser.value
    countUsers()
    postSort()
  }

  // クリアボタン（初期化）
  const clear = () => {
    // 活動名
    searchName.value = ''
    searchKariName.value = ''
    // 性別
    checkGender.value = []
    checkedGenderIds.value = [{ id: 0 }]
    console.log(optionGender.value.length)
    for (var i = 0; i < optionGender.value.length; i++) {
      optionGender.value[i].flg = false
    }
    // 活動歴 
    radiosActivity.value = 0
    checkedActivityId.value= 0
    checkedActivityValue.value= 0
    // 事務所
    checkOffice.value = []
    checkedOfficeIds.value = [{ id: 0 }]
    for (var i = 0; i < optionOffice.value.length; i++) {
      optionOffice.value[i].flg = false
    }
    // 芸風
    checkComedyStyle.value = []
    checkedComedyStyleIds.value = [{ id: 0 }]
    for (var i = 0; i < optionComedyStyle.value.length; i++) {
      optionComedyStyle.value[i].flg = false
    }
    // 料金形態
    selectFeeType.value = { id: 0, name: '' }
    // 料金
    selectLowPrice.value = { id: 0, value: 0, name: '下限なし' }
    selectHighPrice.value = { id: 0, value: 0, name: '上限なし' }
    // 特殊スキル
    checkSpecialSkill.value = []
    checkedSpecialSkillIds.value = [{ id: 0 }]
    for (var i = 0; i < optionSpecialSkill.value.length; i++) {
      optionSpecialSkill.value[i].flg = false
    }
    // 活動地域
    selectArea.value = { id: 0, text: '' }

    isCheckedCategory()
    getData();
  }
  </script>
