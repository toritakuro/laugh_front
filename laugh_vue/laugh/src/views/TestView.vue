<template>
  <main class="main-content">
    <div class="sort">
      <p>並べ替え</p>
      <select v-model="selectedSorts" @change="postSort()">
        <option v-for="sort in optionSorts" 
          v-bind:value="sort.id" 
          v-bind:key="sort.id">
          {{ sort.name }}
        </option>
      </select>
    </div>
    <div class="user-list">
      <v-table>
        <tbody>
          <ul v-for="item in dispUsers" class="user-profile">
            <!-- <p>{{ item.profileImg }}</p> -->
            <p>活動名 : {{ item.userName }}</p>
            <p v-if="item.gender==1">性別 : 男</p>
            <p v-if="item.gender==2">性別 : 女</p>
            <p v-if="item.gender==3">性別 : 男女</p>
            <p>活動歴 : {{ item.activityDt }}</p>
            <p>事務所 : {{ item.officeName }}</p>
            <p v-if="item.userType==2">芸風 : {{ item.comedyStyleNames }}</p>
            <p v-if="item.userType==1">得意分野 : {{ item.comedyStyleNames}}</p>
            <p v-if="item.userType==1">特殊スキル : {{ item.specialSkillNames }}</p>
            <p>ログイン : {{ item.loginAtInt }}</p>
            <p>ログイン : {{ item.loginAtInt }}</p>
            <p>更新 : {{ item.updateAtInt }}</p>
          </ul>
        </tbody>
     </v-table>
    </div>
    <div class="user-search">
      <!-- <SearchForm :dispUserType="dispUserType" @post-name="postName" @post-gender="postGender"/> -->
      <div class="search">
        <h3>活動名</h3>
        <input class="search-name" type="text" @input="postName" v-model="searchName" />
      </div>
      <div class="search">
        <h3>性別</h3>
        <div v-for="select in optionGender">
          <input type="checkbox"  
            v-bind:value="select.id" 
            v-bind:key="select.id" 
            v-model="checkGender"
            @click="postGender(select.id, select.flg)">
          <label>{{ select.name }}</label>
        </div>
      </div>
      <div class="search">
        <h3>活動歴</h3>
        <div v-for="select in optionActivity">
          <input type="radio"  
            v-bind:value="select.name" 
            v-bind:key="select.id" 
            v-model="radiosActivity"
            :checked="select.id == 0"
            @click="postActivity(select.id, select.value)">
          <label>{{ select.name }}</label>
        </div>
      </div>
      <div class="search">
        <h3>事務所</h3>
        <div v-for="select in optionOffice">
          <input type="checkbox"  
            v-bind:value="select.id" 
            v-bind:key="select.id" 
            v-model="checkOffice"
            @click="postOffice(select.id, select.flg)">
          <label>{{ select.name }}</label>
        </div>
      </div>
      <div class="search">
        <h3 v-if="dispUserType == 1">得意分野</h3>
        <h3 v-if="dispUserType == 2">芸風</h3>
        <div v-for="select in optionComedyStyle">
          <input type="checkbox"  
            v-bind:value="select.id" 
            v-bind:key="select.id" 
            v-model="checkComedyStyle"
            @click="postComedyStyle(select.id, select.flg)">
          <label>{{ select.name }}</label>
        </div>
      </div>
      <div class="search" v-if="dispUserType == 1">
        <h3>料金形態</h3>
        <select v-model="checkedFeeTypeId" @change="postFeeType">
        <option v-for="select in optionFeeType" 
          v-bind:value="select.id" 
          v-bind:key="select.id">
          {{ select.name }}
        </option>
        </select>
      </div>
      <div class="search" v-if="dispUserType == 1">
        <h3>料金</h3>
        <select v-model="selectLowPrice" @change="postFee">
        <option v-for="select in optionLowPrice" 
          v-bind:value="select.value" 
          v-bind:key="select.id">
          {{ select.name }}
        </option>
        </select>
        <span>〜</span>
        <select v-model="selectHighPrice" @change="postFee">
        <option v-for="select in optionHighPrice" 
          v-bind:value="select.value" 
          v-bind:key="select.id">
          {{ select.name }}
        </option>
        </select>
      </div>
      <div class="search" v-if="dispUserType == 1">
        <h3>特殊スキル</h3>
        <div v-for="select in optionSpecialSkill">
          <input type="checkbox"  
            v-bind:value="select.id" 
            v-bind:key="select.id"
            v-model="checkSpecialSkill"
            @click="postSpecialSkill(select.id, select.flg)">
          <label>{{ select.name }}</label>
        </div>
      </div>
      <div class="search">
        <h3>活動場所</h3>
        <select  v-model="checkedAreaId" @change="postArea">
        <option v-for="select in optionArea" 
          v-bind:value="select.id" 
          v-bind:key="select.id">
          {{ select.name }}
        </option>
      </select>
      </div>
    </div>
    <!-- <div> -->
    <!-- コンポーネントを再マウントするトリガーボタン -->
    <button type="button" @click="clear">クリア</button>

    <!-- コンポーネントを条件付きで表示し、キーを設定 -->
    <!-- <component :is="dynamicComponent" :key="componentKey" />
  </div> -->
  </main>
  </template>
  
  <style>
  .main-content {
    display: flex;
    gap: 30px;
    justify-content: center;
    margin: 0 auto;
    padding: 12px;
  }
  .sort {
    display: flex;
    margin: 5px 300px;
  }
  .sort select {
    border: 2px solid #f7ca9b;
    margin-left: 3px;
    width: 100px;
    padding-left: 8px;
  }
  .user-profile {
    margin: 20px;
    width: 500px;
    border: 2px solid #008000;
    border-radius: 10px;
  }
  /* .geihu {
    display: flex;
  } */
  .user-search {
    margin: 20px;
    padding: 8px;
    width: 200px;
    border: 2px solid #008000;
    border-radius: 10px;
    
  }
  .search {
    margin: 8px;
  }
  .search h3 {
    background-color: rgba(239, 173, 51, 0.398);
  }
  .search div {
    margin-left: 8px;
  }
  .search select {
    margin-top: 2px;
    padding-left: 3px;
    width: 150px;
    border: 2px solid #f7ca9b;
    border-radius: 5px;
  }
  .search-name {
    margin-top: 2px;
    padding-left: 3px;
    width: 150px;
    border: 2px solid #f7ca9b;
    border-radius: 5px;
  }
  </style>
  
  <!-- <script>


export default {
  setup() {
    const componentKey = ref(0) // キーを初期化
    const dynamicComponent = ref('ComponentA') // 表示するコンポーネントの動的な選択

    const remountComponent = () => {
      // コンポーネントを再マウントするためにキーを変更
      componentKey.value++
    }

    return {
      dynamicComponent,
      remountComponent
    }
  }
}
</script> -->

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
  postSort()
}
// defineExpose({
//   getData,
// })

// const getSerchForm = async () => {
//   components: {
//     SearchForm
//   }


    {/* const clear2 = () => {
      components: {
        SearchForm
      }
      const component = ref(null)
      return {
      component,
      // clear2
      }
    } */}



// }

  const selectedSorts = ref(1)
  const optionSorts = [
    { id: 1, name: 'ログイン'},
    { id: 2, name: '更新' } 
  ]

  const postSort = () => {
    console.log("kiteru",selectedSorts.value)
    switch (selectedSorts.value) {
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

        //   dispUsers.value = usersOrigin.value.sort((a, b) => {
        //     return a.loginAt - b.loginAt})
        // })
  }



  //search
  const checkGender = ref([])
  const optionGender = ref([
    { id: 1, name: '男', flg: false},
    { id: 2, name: '女', flg: false},
    { id: 3, name: '男女', flg: false}
  ])

  const radiosActivity = ref([])
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
    { id: 0, name: ''},
    { id: 1, name: '北海道'},
    { id: 2, name: '東北' }, 
    { id: 3, name: '関東' },
    { id: 4, name: '中部' }, 
    { id: 5, name: '近畿' }, 
    { id: 6, name: '中国' }, 
    { id: 7, name: '九州' }
  ])
  
 
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
      console.log(searchName)
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