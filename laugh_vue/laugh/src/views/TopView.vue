<template>
  <v-container fluid>
    <v-row justify="center">
      <v-col cols="6">
        <v-row>
          <v-col cols="7">
          <v-card>
              <v-img
                aspect-ratio="16/9"
                cover
                src="https://cdn.vuetifyjs.com/images/parallax/material.jpg"
              ></v-img>
              <v-card-title class="text-h5">美味しんぼーず</v-card-title>
              <v-card-subtitle class="mb-1 text-subtitle-1">芸歴:1年</v-card-subtitle>
              <v-card-item class="pl-3">
                <v-chip-group>
                  <v-chip>漫才</v-chip><v-chip>コント</v-chip>
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
              ></v-text-field>
            </v-col>
            <v-col>
              <v-card-subtitle class="text-subtitle-1">事務所</v-card-subtitle>
              <v-checkbox
                label="吉本興業"
                density="compact"
                hide-details="true"
                value="yoshimoto"
              ></v-checkbox>
              <v-checkbox
                density="compact"
                hide-details="true"
                label="人力舎"
                value="jinrikisya">
              </v-checkbox>
              <v-checkbox
                density="compact"
                hide-details="true"
                label="マセキ芸能社"
                value="maseki">
              </v-checkbox>
              <v-checkbox
                density="compact"
                hide-details="true"
                label="松竹芸能"
                value="shochiku">
              </v-checkbox>
              <v-checkbox
                density="compact"
                hide-details="true"
                label="指定しない"
                value="Unspecified">
              </v-checkbox>
            </v-col>
            <v-col>
              <v-card-subtitle class="text-subtitle-1">性別</v-card-subtitle>
              <v-checkbox
                label="男"
                density="compact"
                hide-details="true"
                value="John"
              ></v-checkbox>
              <v-checkbox
                density="compact"
                hide-details="true"
                label="女"
                value="Jacob">
              </v-checkbox>
              <v-checkbox
                density="compact"
                hide-details="true"
                label="男女"
                value="Jacob">
              </v-checkbox>
              <v-checkbox
                density="compact"
                hide-details="true"
                label="指定しない"
                value="Unspecified">
              </v-checkbox>
            </v-col>
            <v-col>
              <v-card-subtitle class="text-subtitle-1">活動歴</v-card-subtitle>
              <v-checkbox
                density="compact"
                hide-details="true"
                label="10年以上"
                value="Unspecified">
              </v-checkbox>
              <v-checkbox
                density="compact"
                hide-details="true"
                label="8年以上"
                value="Unspecified">
              </v-checkbox>
              <v-checkbox
                density="compact"
                hide-details="true"
                label="6年以上"
                value="Unspecified">
              </v-checkbox>
              <v-checkbox
                density="compact"
                hide-details="true"
                label="4年以上"
                value="Unspecified">
              </v-checkbox>
              <v-checkbox
                density="compact"
                hide-details="true"
                label="2年以上"
                value="Unspecified">
              </v-checkbox>
              <v-checkbox
                density="compact"
                hide-details="true"
                label="1年以上"
                value="Unspecified">
              </v-checkbox>
              <v-checkbox
                density="compact"
                hide-details="true"
                label="1年以下"
                value="Unspecified">
              </v-checkbox>
              <v-checkbox
                density="compact"
                hide-details="true"
                label="指定しない"
                value="Unspecified">
              </v-checkbox>
            </v-col>
            <v-col>
              <v-card-subtitle class="text-subtitle-1">芸風</v-card-subtitle>
              <v-checkbox
                density="compact"
                hide-details="true"
                label="漫才"
                value="Unspecified">
              </v-checkbox>
              <v-checkbox
                density="compact"
                hide-details="true"
                label="ピン"
                value="Unspecified">
              </v-checkbox>
              <v-checkbox
                density="compact"
                hide-details="true"
                label="コント"
                value="Unspecified">
              </v-checkbox>
              <v-checkbox
                density="compact"
                hide-details="true"
                label="ギャグ"
                value="Unspecified">
              </v-checkbox>
              <v-checkbox
                density="compact"
                hide-details="true"
                label="モノマネ"
                value="Unspecified">
              </v-checkbox>
              <v-checkbox
                density="compact"
                hide-details="true"
                label="歌ネタ"
                value="Unspecified">
              </v-checkbox>
              <v-checkbox
                density="compact"
                hide-details="true"
                label="リズムネタ"
                value="Unspecified">
              </v-checkbox>
              <v-checkbox
                density="compact"
                hide-details="true"
                label="その他"
                value="Unspecified">
              </v-checkbox>
            </v-col>
            <v-col>
              <v-card-subtitle class="text-subtitle-1 py-2">料金体系</v-card-subtitle>
              <v-select
                label=""
                :items="['','時給','出来高']"
              ></v-select>
            </v-col>
            <v-col>
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
          <v-col>
          <v-card-subtitle class="text-subtitle-1">特殊スキル</v-card-subtitle>
            <v-checkbox
              density="compact"
              hide-details="true"
              label="動画編集"
              value="Unspecified">
            </v-checkbox>
            <v-checkbox
              density="compact"
              hide-details="true"
              label="イラスト"
              value="Unspecified">
            </v-checkbox>
            <v-checkbox
              density="compact"
              hide-details="true"
              label="音源制作"
              value="Unspecified">
            </v-checkbox>
            <v-checkbox
              density="compact"
              hide-details="true"
              label="その他"
              value="Unspecified">
            </v-checkbox>
          </v-col>
          <v-col>
              <v-card-subtitle class="text-subtitle-1 py-2">活動場所</v-card-subtitle>
              <v-select
                label=""
                :items="['','北海道','東北','関東','中部','近畿','中国・四国','九州']"
              ></v-select>
          </v-col>




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
  import { ref } from 'vue'
  const aa = ref(true);

  const items = ref([
        { text: 'トカゲのおっさん', icon: 'mdi-video' },
        { text: 'ゴレンジャイ', icon: 'mdi-file' },
      ]) ;
  const radiosGender = ref([])
  const optionGender = [
    { id: 1, name: '男'},
    { id: 2, name: '女'},
    { id: 3, name: '男女'}
  ]

  const radiosActiveHistory = ref([])
  const optionActiveHistory = [
    { id: 1, name: '1年未満'},
    { id: 2, name: '1年以上'},
    { id: 3, name: '3年以上'},
    { id: 3, name: '5年以上'},
    { id: 3, name: '7年以上'},
    { id: 3, name: '9年以上'},
    { id: 3, name: '指定しない'},
  ]

  const checkOffice = ref([])
  const optionOffice = ref([
    { id: 1, name: '吉本興業', flg: false},
    { id: 2, name: '人力舎', flg: false},
    { id: 3, name: 'マセキ芸能社', flg: false},
    { id: 4, name: '松竹芸能', flg: false},
    { id: 5, name: 'その他', flg: false}
  ])

  const selectedFeeType = ref([])
  const optionFeeType = [
    { id: 1, name: '時給'},
    { id: 2, name: '出来高' }
  ]

  </script>