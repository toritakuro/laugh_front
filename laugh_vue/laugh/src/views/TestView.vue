<template>
    <div class="sort">
      <p>並べ替え</p>
      <select v-model="selectedSorts">
        <option v-for="sort in optionSorts" 
          v-bind:value="sort.name" 
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
            <p v-if="item.userType>1">芸風 : {{ item.comedyStyleName }}</p>
            <p v-if="item.userType<2">得意分野 : {{ item.comedyStyleName }}</p>
            <p v-if="item.userType<2">特殊スキル : {{ item.specialSkillName }}</p>
            <p>自己紹介 : {{ item.selfIntroduction }}</p>
          </ul>
        </tbody>
     </v-table>
    </div>
    <div class="user-search">
      <!-- <SearchForm /> -->
      <div class="search">
        <h3>性別</h3>
        <div v-for="select in optionGender">
          <input type="checkbox"  
            v-bind:value="select.name" 
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
            v-model="radiosActivity">
          <label>{{ select.name }}</label>
        </div>
      </div>
      <div class="search">
        <h3>事務所</h3>
        <div v-for="select in optionOffice">
          <input type="checkbox"  
            v-bind:value="select.name" 
            v-bind:key="select.id" 
            v-model="checkOffice"
            @click="postOffice(select.id, select.flg)">
          <label>{{ select.name }}</label>
        </div>
      </div>
      <div class="search">
        <h3>芸風</h3>
        <div v-for="select in optionComedyStyle">
          <input type="checkbox"  
            v-bind:value="select.name" 
            v-bind:key="select.id" 
            v-model="checkComedyStyle"
            @click="postComedyStyle(select.id, select.flg)">
          <label>{{ select.name }}</label>
        </div>
      </div>
      <div class="search">
        <h3>料金体系</h3>
        <select v-model="selectFeeType">
        <option v-for="select in optionFeeType" 
          v-bind:value="select.name" 
          v-bind:key="select.id">
          {{ select.name }}
        </option>
        </select>
      </div>
      <div class="search">
        <h3>活動場所</h3>
        <select v-model="selectArea">
        <option v-for="select in optionArea" 
          v-bind:value="select.name" 
          v-bind:key="select.id">
          {{ select.name }}
        </option>
      </select>
      </div>
    </div>
  </template>
  
  <style>
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
  </style>
  
  <script setup lang="ts">
  import { computed, ref, onMounted } from 'vue'
  import type ResponseData from "@/types/ResponseData";
  import TopService from '@/services/TopService';
  import type User from "@/types/User";
  import SearchForm from "@/components/SearchForm.vue"
  import http from "@/http-common"
  
  const dispUsers = ref([] as User[]);
  const usersOrigin = ref([] as User[]);
  const today = new Date();
  
  // const getData = async () => {
  //   let userType = 1
  //   TopService.getUserList(userType)
  //   .then((response: ResponseData) => 
  //   {
  //     users.value = response.data;
  //     usersOrigin.value = response.data;
  //     console.log(response.data);
  //   });
  // };

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
}

// defineExpose({
//   getData,
// })


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

  const radiosActivity = ref([])
  const optionActivity = ref([
    { id: 1, name: '１年未満'},
    { id: 2, name: '２年以下'},
    { id: 3, name: '４年以下'},
    { id: 4, name: '６年以下'},
    { id: 5, name: '８年以下'},
    { id: 6, name: '１０年以下'},
    { id: 7, name: '１０年以上'},
    { id: 8, name: '指定しない'}
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
  const optionFeeType = [
    { id: 1, name: '時給'},
    { id: 2, name: '出来高' }
  ]

  const selectArea = ref('')
  const optionArea = [
    { id: 1, name: '北海道'},
    { id: 2, name: '東北' }, 
    { id: 3, name: '関東' },
    { id: 4, name: '中部' }, 
    { id: 5, name: '近畿' }, 
    { id: 6, name: '中国' }, 
    { id: 7, name: '九州' }
  ]
  const checkedUser = ref([] as User[]);
  const kariCheckedUsers = ref([] as User[]);

  // 性別
  const checkedGenderIds = ref([{ id: 0 }]);
  const postGender = (id: number, flg: boolean) => {
    const user = ref([] as User[]);
    const checkedGenderId = { id: id }
    // チェックつけた時
    if (!flg) {
      const kariCheckedUser = ref([] as User[]);
      checkedGenderIds.value.push(checkedGenderId)
      // AND検索 他の検索項目にチェックが入っている時
      if (checkedOfficeIds.value.length > 1
      || checkedComedyStyleIds.value.length > 1) {
        if (checkedOfficeIds.value.length > 1) {
          if (kariCheckedUser.value.length > 1) {
            for (var officeId of checkedOfficeIds.value) {
              user.value = kariCheckedUser.value.filter(t => t.officeId === officeId.id)
              for (var item of user.value) {
                kariCheckedUser.value.push(item)
              }
            }
          } else {
            for (var officeId of checkedOfficeIds.value) {
              user.value = usersOrigin.value.filter(t => t.officeId === officeId.id)
              for (var item of user.value) {
                kariCheckedUser.value.push(item)
              }
            }
          }
        }
        if (checkedComedyStyleIds.value.length > 1) {
          console.log(checkedComedyStyleIds.value)
          if (kariCheckedUser.value.length > 1) {
            for (var comedyStyleId of checkedComedyStyleIds.value) {
              user.value = kariCheckedUser.value.filter(function(value) {
                return value.comedyStyleIdList.includes(comedyStyleId.id)
              })
            }
          } else {
            for (var comedyStyleId of checkedComedyStyleIds.value) {
              var comedyId = comedyStyleId.id
              console.log("a comest",comedyStyleId.id)
              console.log("a",comedyId)
              user.value = usersOrigin.value.filter(function(value) {
                console.log("b comest",comedyStyleId.id)
                return value.comedyStyleIdList.includes(comedyStyleId.id)
              })
            }
          }
          console.log(user.value)
          for (var item of user.value) {
            // 重複するデータ以外を含める
            if (!kariCheckedUser.value.includes(item)){
              kariCheckedUser.value.push(item)
            }
          }
        }
        const checkuserssss = ref([] as User[]);
        for (var genderId of checkedGenderIds.value) {
          user.value = kariCheckedUser.value.filter(t => t.gender === genderId.id)
          for (var item of user.value) {
            // 重複するデータ以外を含める
            if (!checkuserssss.value.includes(item)){
              checkuserssss.value.push(item)
            }
          }
        }
        checkedUser.value = checkuserssss.value
      } else {
        // OR検索
        user.value = usersOrigin.value.filter(t => t.gender == id)
        for (var item of user.value) {
          // 重複するデータ以外を含める
          if (!checkedUser.value.includes(item)){
            checkedUser.value.push(item)
          }
        }
      }   
      dispUsers.value = checkedUser.value
      optionGender.value[id - 1].flg = true
    } else {
      // チェック外した時
      checkedGenderIds.value = checkedGenderIds.value.filter(t => t.id !== id)
      kariCheckedUsers.value = kariCheckedUsers.value.filter(t => t.gender !== id)
      if (checkedGenderIds.value.length > 1
       || checkedOfficeIds.value.length > 1) {
        const kariCheckedUser = ref([] as User[]);
        const kariCheckedGenderUser = ref([] as User[]);
        if (checkedGenderIds.value.length > 1) {
          for (var genderId of checkedGenderIds.value) {
            user.value = usersOrigin.value.filter(t => t.gender === genderId.id)
            for (var item of user.value) {
              kariCheckedGenderUser.value.push(item)
            }
          }
          kariCheckedUser.value = kariCheckedGenderUser.value
        }
        // 事務所にチェックが入っている時
        const kariCheckedOfficeUser = ref([] as User[]);
        if (checkedOfficeIds.value.length > 1) {
          const kariCheckedOfficeUser = ref([] as User[]);
          // 他の検索項目にチェックが入っている時
          if (kariCheckedGenderUser.value.length > 0) {
            for (var officeId of checkedOfficeIds.value) {
              user.value = kariCheckedGenderUser.value.filter(t => t.officeId === officeId.id)
              for (var item of user.value) {
                // 重複するデータ以外を含める
                if (!kariCheckedOfficeUser.value.includes(item)){
                  kariCheckedOfficeUser.value.push(item)
                }
              }
            kariCheckedUser.value = kariCheckedOfficeUser.value
            }
          } else {
            // 事務所のみにチェックが入っている時
            for (var officeId of checkedOfficeIds.value) {
              user.value = usersOrigin.value.filter(t => t.officeId === officeId.id)
              for (var item of user.value) {
                kariCheckedUser.value.push(item)
              }
            }
          }
        }
        dispUsers.value = kariCheckedUser.value
      } else {
        dispUsers.value = usersOrigin.value
      }
    optionGender.value[id - 1].flg = false
    }
  }

  // 事務所
  const checkedOfficeIds = ref([{ id: 0 }]);
  const checkedOfficeUsers = ref([] as User[]);
  const postOffice = (id: number, flg: boolean) => {
    const user = ref([] as User[]);
    const checkedOfficeId = { id: id }
    // チェックつけた時
    if (!flg) {
      const kariCheckedUser = ref([] as User[]);
      // AND検索　他の検索項目にチェックが入っている時
      if (checkedGenderIds.value.length > 1
      || checkedComedyStyleIds.value.length > 1) {
        if (checkedGenderIds.value.length > 1) {
          for (var genderId of checkedGenderIds.value) {
            user.value = usersOrigin.value.filter(t => t.gender === genderId.id)
            for (var item of user.value) {
              kariCheckedUser.value.push(item)
            }
          }
        }
        if (checkedOfficeIds.value.length > 1) {
          if (kariCheckedUser.value.length > 1) {
            for (var officeId of checkedOfficeIds.value) {
              user.value = kariCheckedUser.value.filter(t => t.officeId === officeId.id)
              for (var item of user.value) {
                kariCheckedUser.value.push(item)
              }
            }
          } else {
            for (var officeId of checkedOfficeIds.value) {
              user.value = usersOrigin.value.filter(t => t.officeId === officeId.id)
              for (var item of user.value) {
                kariCheckedUser.value.push(item)
              }
            }
          }
        }
        if (checkedComedyStyleIds.value.length > 1) {
          if (kariCheckedUser.value.length > 1) {
            for (var comedyStyleId of checkedComedyStyleIds.value) {
              user.value = kariCheckedUser.value.filter(function(value) {
                return value.comedyStyleIdList.includes(comedyStyleId.id)
              })
            }
          } else {
            for (var comedyStyleId of checkedComedyStyleIds.value) {
              user.value = usersOrigin.value.filter(function(value) {
                return value.comedyStyleIdList.includes(comedyStyleId.id)
              })
            }
          }
          for (var item of user.value) {
            // 重複するデータ以外を含める
            if (!kariCheckedUser.value.includes(item)){
              kariCheckedUser.value.push(item)
            }
          }
        }
        user.value = kariCheckedUser.value.filter(t => t.officeId === id)
        console.log(user.value)
        for (var item of user.value) {
          kariCheckedUsers.value.push(item)
        }
        checkedUser.value = kariCheckedUsers.value
      } else {
        // OR検索
        user.value = usersOrigin.value.filter(t => t.officeId === id)
        for (var item of user.value) {
          // 重複するデータ以外を含める
          if (!checkedUser.value.includes(item)){
            checkedUser.value.push(item)
          }
        }
      }
      dispUsers.value = checkedUser.value
      checkedOfficeIds.value.push(checkedOfficeId)
      optionOffice.value[id - 1].flg = true
    } else {
      // チェック外した時
      checkedOfficeIds.value = checkedOfficeIds.value.filter(t => t.id !== id)
      kariCheckedUsers.value = kariCheckedUsers.value.filter(t => t.officeId !== id)
      if (checkedGenderIds.value.length > 1
       || checkedOfficeIds.value.length > 1) {
        const kariCheckedUser = ref([] as User[]);
        const kariCheckedGenderUser = ref([] as User[]);
        if (checkedGenderIds.value.length > 1) {
          for (var genderId of checkedGenderIds.value) {
            user.value = usersOrigin.value.filter(t => t.gender === genderId.id)
            for (var item of user.value) {
              kariCheckedGenderUser.value.push(item)
            }
          }
          kariCheckedUser.value = kariCheckedGenderUser.value
        }
        // 事務所にチェックが入っている時
        const kariCheckedOfficeUser = ref([] as User[]);
        if (checkedOfficeIds.value.length > 1) {
          const kariCheckedOfficeUser = ref([] as User[]);
          // 他の検索項目にチェックが入っている時
          if (kariCheckedGenderUser.value.length > 0) {
            for (var officeId of checkedOfficeIds.value) {
              user.value = kariCheckedGenderUser.value.filter(t => t.officeId === officeId.id)
              for (var item of user.value) {
                // 重複するデータ以外を含める
                if (!kariCheckedOfficeUser.value.includes(item)){
                  kariCheckedOfficeUser.value.push(item)
                }
              }
            kariCheckedUser.value = kariCheckedOfficeUser.value
            }
          } else {
            // 事務所のみにチェックが入っている時
            for (var officeId of checkedOfficeIds.value) {
              user.value = usersOrigin.value.filter(t => t.officeId === officeId.id)
              for (var item of user.value) {
                kariCheckedUser.value.push(item)
              }
            }
          }
        }
        dispUsers.value = kariCheckedUser.value
      } else {
        dispUsers.value = usersOrigin.value
      }
    optionOffice.value[id - 1].flg = false
    }
  }

  // 芸風
  const checkedComedyStyleIds = ref([{ id: 0 }])
  const postComedyStyle = (id: number, flg: boolean) => {
    const user = ref([] as User[])
    const checkedComedyStyleId = { id: id }
    // チェックつけた時
    if (!flg) {
      user.value = usersOrigin.value.filter(function(value){
        return value.comedyStyleIdList.includes(id)
      })
      for (var item of user.value) {
        // 重複するデータ以外を含める
        if (!checkedUser.value.includes(item)){
          checkedUser.value.push(item)
        }
      }
      dispUsers.value = checkedUser.value
      checkedComedyStyleIds.value.push(checkedComedyStyleId)
      optionComedyStyle.value[id - 1].flg = true
    } else {
      // チェック外した時
      // チェック済みの芸風を取得
      checkedComedyStyleIds.value = checkedComedyStyleIds.value.filter(t => t.id !== id)
      // 表示中のデータからチェック済みの芸風を持つデータを取得
      user.value = checkedUser.value.filter(function(value){
        for (var item of checkedComedyStyleIds.value) {
          if (value.comedyStyleIdList.includes(item.id)){
            return value
          }
        }
      })
      checkedUser.value = user.value
      if (checkedUser.value.length == 0) {
        dispUsers.value = usersOrigin.value
      } else {
        dispUsers.value = checkedUser.value
      }
      optionComedyStyle.value[id - 1].flg = false
    }
  }
  const reg = async () => {
  // オブジェクトで置き換えたい
  let data:{
        //checkboxの状態
        isChecked: true
    } 
}



  </script>