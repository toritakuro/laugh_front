<template>
  <v-container fluid>
    <v-row justify="center">
      <v-col cols="6">
        <v-row>
          <v-col cols="7">
          <v-card v-for="item in dispUsers">
              <v-img
                aspect-ratio="16/9"
                cover
                src="https://cdn.vuetifyjs.com/images/parallax/material.jpg"
              ></v-img>
              <v-card-title class="text-h5">{{ item.userName }}</v-card-title>
              <v-card-subtitle class="mb-1 text-subtitle-1">活動歴: {{ item.activityDt }}</v-card-subtitle>
              <v-card-item class="pl-3">
                <v-chip-group>
                  <v-chip>{{ item.comedyStyleName }}</v-chip>
                </v-chip-group>
              </v-card-item>
              <v-list density="compact">
                <v-list-subheader>
                  <div class="font-weight-bold text-subtitle-1 recomend-script">イチオシのネタ</div>
                </v-list-subheader>
                <v-list-item
                  v-for="(item, i) in items"
                  :key="i"
                  :value="item"
                  color="primary"
                >
                  <template v-slot:prepend>
                    <v-icon :icon="item.icon"></v-icon>
                  </template>
                  <v-list-item-title v-text="item.text"></v-list-item-title>
                </v-list-item>
              </v-list>
            </v-card>
          </v-col>
          <v-col
            class="ps-6"
            cols="5"
            >
            <v-card
            class="pa-4"
            >
            <v-col>
              <v-text-field
                label="芸名"
                density="compact"
                bg-color="#fffffff"
                @input="postName"
                v-model="searchName"
              ></v-text-field>
            </v-col>
            <v-col>
              <v-card-subtitle class="text-subtitle-1">性別</v-card-subtitle>
              <v-checkbox-group v-model="checkGender">
                <v-checkbox
                  v-for="select in optionGender"
                  v-bind:value="select.id" 
                  v-bind:key="select.id" 
                  v-bind:label="select.name"
                  @click="postGender(select.id, select.flg)"
                  density="compact"
                  hide-details="true"
                ></v-checkbox>
              </v-checkbox-group>
            </v-col>
            <v-col>
              <v-card-subtitle class="text-subtitle-1">活動歴</v-card-subtitle>
              <v-radio-group v-model="radiosActivity">
                <v-radio
                  v-for="select in optionActivity"
                  v-bind:value="select.name" 
                  v-bind:key="select.id" 
                  v-bind:label="select.name"
                  v-bind:checked="select.id == 0"
                  @click="postActivity(select.id, select.value)"
                  density="compact"
                  hide-details="true"
                ></v-radio>
              </v-radio-group>
            </v-col>
            <v-col>
              <v-card-subtitle class="text-subtitle-1">事務所</v-card-subtitle>
              <v-checkbox-group v-model="checkOffice">
                <v-checkbox
                  v-for="select in optionOffice"
                  v-bind:value="select.id" 
                  v-bind:key="select.id" 
                  v-bind:label="select.name"
                  @click="postOffice(select.id, select.flg)"
                  density="compact"
                  hide-details="true"
                ></v-checkbox>
              </v-checkbox-group>
            </v-col>
            <v-col>
              <v-card-subtitle class="text-subtitle-1" v-if="dispUserType == 1">得意分野</v-card-subtitle>
              <v-card-subtitle class="text-subtitle-1" v-if="dispUserType == 2">芸風</v-card-subtitle>
              <v-checkbox-group v-model="checkComedyStyle">
                <v-checkbox
                  v-for="select in optionComedyStyle"
                  v-bind:value="select.id" 
                  v-bind:key="select.id" 
                  v-bind:label="select.name"
                  @click="postComedyStyle(select.id, select.flg)"
                  density="compact"
                  hide-details="true"
                ></v-checkbox>
              </v-checkbox-group>
            </v-col>
            <v-col v-if="dispUserType == 1">
              <v-card-subtitle class="text-subtitle-1 py-2">料金体系</v-card-subtitle>
              <v-select
                label=""
                :items="['','時給','出来高']"
              ></v-select>
            </v-col>
            <v-col v-if="dispUserType == 1">
            <v-card-subtitle class="text-subtitle-1">金額</v-card-subtitle>
            <div class="d-flex flex-row">
              <v-sheet class="py-2 w-100">
                <v-select
                  label=""
                  :items="['','下限なし', '1,000円', '2,000円', '3,000円', '4,000円', '5,000円', '6,000円', '7,000円', '8,000円', '9,000円', '10,000円']"
                ></v-select>
              </v-sheet>
              <v-sheet class="mb-4 align-self-center"><span class="search-ttl-span">～</span></v-sheet>
              <v-sheet class="py-2 w-100">
                <v-select
                  label=""
                  :items="['','上限なし', '1,000円', '2,000円', '3,000円', '4,000円', '5,000円', '6,000円', '7,000円', '8,000円', '9,000円', '10,000円']"
                ></v-select>
              </v-sheet>
            </div>
          </v-col>
          <v-col v-if="dispUserType == 1">
          <v-card-subtitle class="text-subtitle-1">特殊スキル</v-card-subtitle>
          <v-checkbox-group v-model="checkSpecialSkill">
            <v-checkbox
              v-for="select in optionSpecialSkill"
              v-bind:value="select.id" 
                v-bind:key="select.id" 
                v-bind:label="select.name"
                @click="postSpecialSkill(select.id, select.flg)"
                density="compact"
                hide-details="true"
              ></v-checkbox>
            </v-checkbox-group> 
          </v-col>
          <v-col>
            <v-card-subtitle class="text-subtitle-1 py-2">活動場所</v-card-subtitle>
            <v-select
              label=""
              :items="['','北海道','東北','関東','中部','近畿','中国・四国','九州']"
            ></v-select>
            <div>
              <v-select v-model="selectedOption" :items="options" label="選択してください"></v-select>
            </div>
          </v-col>
          <button type="button" @click="clear">クリア</button>
          </v-card>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>  



  <style scoped>
  .recomend-script {
    border-left: 3px solid #7CB342;
    padding-left: 5px;
    color: #000000;
  }
  .user-header { 
      text-align: center;
      padding: 20px 0;
      background-color: #ffe1a9;
      position: relative;
      width: 100%;
  }
  .user-header > h2 {
      margin: auto;
      letter-spacing: 0.2em;
  }
  .logo {
      position: absolute;
      left: 40px;
      top: 18%;
      transform: translateY(-50%);
      padding: 4px 8px;
      border: 2px solid #ff8300;
      color: #ff8300;
      border-radius: 4px;
      font-weight: bold;
      font-size: 24px;
  }
  
  /* 全体 */
  .v-card.v-theme--light.v-card--density-default.v-card--variant-elevated.card-box {
    margin-top: 20px;
    padding: 20px;
  }
  .main-content {
      display: flex;
      gap: 30px;
      justify-content: center;
      margin: 0 auto;
      padding: 12px;
  }
  
  /* ユーザー一覧 */
  .sort-box > select {
      border-radius: 3px;
  }
  .sort-box {
      text-align: end;
  }
  .user-wrap {
      display: flex;
      margin-top: 20px;
      width: 500px;
      border: 2px solid #008000;
      border-radius: 10px;
  }
  .user-photo > img {
      width: 200px;
      padding: 12px;
  }
  .profile {
      list-style: none;
      margin-left: 20px;
      padding: 0 12px;
  }
  .profile > li {
    margin-top: 10px;
  }
  .neta-list {
    list-style: none;
  }
  .sp-neta-list {
    margin-top: 10px;
    padding: 3px 0 3px 10px;
    font-weight: bold;
    border-left: 5px solid #6fba2c;
  }
  .neta-list {
    margin-left: 20px;
  }
  
  
  /* 自由検索欄 */
  .user-search-box {
      list-style: none;
      margin-top: 70px;
      padding: 10px 10px;
      background-color: #ffe1a9;
      width: 350px;
      border-radius: 6px;
  }
  .search-ttl {
      margin-top: 12px;
      margin-bottom: 8px;
      padding: 3px 0 3px 10px;
      font-weight: bold;
      border-left: 5px solid #6fba2c;
  }
  .search-ttl > li {
      display: flex;
      margin-left: 10px;
  }
  .search-fee {
    display: flex;
  }
  .search-ttl-span {
    margin-top: 20px;
  }
  .user-name-box {
      border-radius: 3px;
  }
  .fee-box {
      border-radius: 3px;
  }
  .money-box {
      border-radius: 3px;
  }
  .active-place {
      border-radius: 3px;
  }
  .search-btn {
      align-items: center;
      justify-content: center;
      margin-top: 14px;
      padding: 7px 20px;
      color: #fff;
      text-align: center;
      overflow-wrap: anywhere;
      background-color: #ff8300;
      border-radius: 18px;
      border: none;
      box-shadow: rgb(217, 217, 217) 0px 2px 1px;
  }
  .search-btn:hover {
      transition: background-color 0.2s;
      opacity: 0.8;
      cursor: pointer;
  }
  .clear-btn {
    margin-left: 20px;
  }
  
  
  </style>
  <script setup lang="ts">
  import { computed, ref, onMounted } from 'vue'
  import type ResponseData from "@/types/ResponseData";
  import TopService from '@/services/TopService';
  import type User from "@/types/User";
  import SearchForm from "@/components/SearchForm.vue"
  import http from "@/http-common"
  import { toValue } from 'vue';
  import { useRoute } from 'vue-router';
  
  const dispUsers = ref([] as User[]);
  const usersOrigin = ref([] as User[]);
  const dispUserType = ref();
  const today = new Date();


  onMounted(() => {
    getData();
  })
  
/** User一覧を取得する */
const getData = async () => {
  const {data} = await http.get('/top/init',{
    params: {
      userType: 1
    }}
  )
  dispUsers.value = data.data;
  usersOrigin.value = data.data;
  dispUserType.value = usersOrigin.value[0].userType
  console.log("usersOrigin",dispUsers.value)
}

const items = ref([
  { text: 'トカゲのおっさん', icon: 'mdi-video' },
  { text: 'ゴレンジャイ', icon: 'mdi-file' },
]) ;

const selectedSorts = ref<string>('')
  const optionSorts = [
    { id: 1, name: 'ログイン'},
    { id: 2, name: '面白い' }, 
    { id: 3, name: '登録日' } 
  ]

  const sortUser = ref<string>('')

  //search
  const checkGender = ref([])
  const optionGender = ref([
    { id: 1, name: '男', flg: false},
    { id: 2, name: '女', flg: false},
    { id: 3, name: '男女', flg: false}
  ])

  const radiosActivity = ref([0])
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
    { id: 2, name: 'ピン', flg: false},
    { id: 3, name: 'コント', flg: false},
    { id: 4, name: 'ギャグ', flg: false},
    { id: 5, name: 'モノマネ', flg: false},
    { id: 6, name: '歌ネタ', flg: false},
    { id: 7, name: 'リズムネタ', flg: false},
    { id: 8, name: 'その他', flg: false}
  ])

  const selectFeeType = ref('')
  const optionFeeType = ref([
    { id: 0, name: ''},
    { id: 1, name: '時給'},
    { id: 2, name: '出来高' }
  ])

  const selectLowPrice = ref(0)
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

  const selectHighPrice = ref(0)
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

  const selectArea = ref('')
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
  const selectedOption = ref<string | null>(null);
  const options = ref<Array<{ text: string; value: string }>>([
  { text: '選択肢1', value: 'option1' },
  { text: '選択肢2', value: 'option2' },
  { text: '選択肢3', value: 'option3' },
  // 他の選択肢を追加できます
]);
  
 
  // チェックフラグ（活動歴以外）
  const isChecked = ref(false)
  // チェックフラグ更新
  const isCheckedCategory = () => {
    if (searchName.value != ''
    || checkedGenderIds.value.length > 1
    || checkedActivityId.value > 0
    || checkedOfficeIds.value.length > 1
    || checkedComedyStyleIds.value.length > 1
    || checkedFeeTypeId.value > 0
    || selectLowPrice.value >0
    || selectHighPrice.value > 0
    || checkedSpecialSkillIds.value.length > 1
    || checkedAreaId.value > 0) {
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
  const checkedFeeTypeId = ref(0);
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
  const checkedAreaId = ref(0);
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
      console.log("kiteru2")
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
      if (checkedFeeTypeId.value > 0) {
        // 別カテゴリーにもチェックが入っている場合
        if (searchName.value != ''
        || checkedGenderIds.value.length > 1
        || checkedActivityId.value > 0
        || checkedOfficeIds.value.length > 1
        || checkedComedyStyleIds.value.length > 1) {
          kariCheckedUser.value = kariCheckedUser.value.filter(t => t.feeType === checkedFeeTypeId.value)
        } else {
          kariCheckedUser.value = usersOrigin.value.filter(t => t.feeType === checkedFeeTypeId.value)
        }
      }
      // 料金(Low)
      if (selectLowPrice.value > 0) {
        // 別カテゴリーにもチェックが入っている場合
        if (searchName.value != ''
        || checkedGenderIds.value.length > 1
        || checkedActivityId.value > 0
        || checkedOfficeIds.value.length > 1
        || checkedComedyStyleIds.value.length > 1
        || checkedFeeTypeId.value > 0) {
          kariCheckedUser.value = kariCheckedUser.value.filter(t => t.fee >= selectLowPrice.value)
        } else {
          kariCheckedUser.value = usersOrigin.value.filter(t => t.fee >= selectLowPrice.value)
        }
      }
      // 料金(High)
      if (selectHighPrice.value > 0) {
        // 別カテゴリーにもチェックが入っている場合
        if (searchName.value != ''
        || checkedGenderIds.value.length > 1
        || checkedActivityId.value > 0
        || checkedOfficeIds.value.length > 1
        || checkedComedyStyleIds.value.length > 1
        || checkedFeeTypeId.value > 0
        || selectLowPrice.value > 0) {
          kariCheckedUser.value = kariCheckedUser.value.filter(t => t.fee <= selectHighPrice.value)
        } else {
          kariCheckedUser.value = usersOrigin.value.filter(t => t.fee <= selectHighPrice.value)
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
        || checkedFeeTypeId.value > 0
        || selectLowPrice.value > 0
        || selectHighPrice.value > 0) {
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
      if (checkedAreaId.value > 0) {
        // 別カテゴリーにもチェックが入っている場合
        if (searchName.value != ''
        || checkedGenderIds.value.length > 1
        || checkedActivityId.value > 0
        || checkedOfficeIds.value.length > 1
        || checkedComedyStyleIds.value.length > 1
        || checkedFeeTypeId.value > 0
        || selectLowPrice.value > 0
        || selectHighPrice.value > 0
        || checkedSpecialSkillIds.value.length > 1) {
          kariCheckedUser.value = kariCheckedUser.value.filter(t => t.areaId === checkedAreaId.value)
        } else {
          kariCheckedUser.value = usersOrigin.value.filter(t => t.areaId === checkedAreaId.value)
        }
      }
      checkedUser.value = kariCheckedUser.value
    } else {
      checkedUser.value = usersOrigin.value
    }
    // 表示用にセット
    dispUsers.value = checkedUser.value
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
  radiosActivity.value = []
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
  selectFeeType.value = ''
  checkedFeeTypeId.value = 0
  // 料金
  selectLowPrice.value = 0
  selectHighPrice.value = 0
  // 特殊スキル
  checkSpecialSkill.value = []
  checkedSpecialSkillIds.value = [{ id: 0 }]
  for (var i = 0; i < optionSpecialSkill.value.length; i++) {
    optionSpecialSkill.value[i].flg = false
  }
  // 活動地域
  selectArea.value = ''
  checkedAreaId.value = 0

  isCheckedCategory()
  getData();
  }
  </script>
