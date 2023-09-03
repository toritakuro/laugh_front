<template>
  <v-container fluid>
    <v-row justify="center">
      <v-col cols="7" >
        <v-row>
          <v-col cols="6">
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
            cols="4"
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
                value="John"
              ></v-checkbox>
              <v-checkbox
                density="compact"
                hide-details="true"
                label="マセキ芸能社"
                value="Jacob">
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
            </v-col>
          </v-card>
          </v-col>
        </v-row>
      </v-col>
    </v-row>


  </v-container>
  <main class="main-content">
    <section>
      <div class="sort-box">
        <v-select
          label=""
          :items="['', '最終投稿日', '芸歴(昇順)', '芸歴(降順)']"
        ></v-select>
      </div>
      <v-card class="card-box">
        <v-img
          :width="460"
          aspect-ratio="16/9"
          cover
          src="https://cdn.vuetifyjs.com/images/parallax/material.jpg"
        ></v-img>
        <ul class="profile">
            <li>活動名： よしもと</li>
            <li>活動歴： 1年未満</li>
            <li>芸風の種類： 漫才</li>
            <li>一言： よろしくお願いします。</li>
          </ul>
        <ul class="neta-list">
          <li class="sp-neta-list">イチオシのネタ</li>
          <li class="neta-list"><a href="./aaa">こんなC4C杯は嫌だ</a></li>
        </ul>
      </v-card>
      <v-card class="card-box">
        <v-img
          :width="460"
          aspect-ratio="16/9"
          cover
          src="https://cdn.vuetifyjs.com/images/parallax/material.jpg"
        ></v-img>
        <ul class="profile">
            <li>活動名： よしもと</li>
            <li>活動歴： 1年未満</li>
            <li>芸風の種類： 漫才</li>
            <li>一言： よろしくお願いします。</li>
          </ul>
        <ul class="neta-list">
          <li class="sp-neta-list">イチオシのネタ</li>
          <li class="neta-list"><a href="./aaa">こんなC4C杯は嫌だ</a></li>
        </ul>
      </v-card>
      <v-card class="card-box">
        <v-img
          :width="460"
          aspect-ratio="16/9"
          cover
          src="https://cdn.vuetifyjs.com/images/parallax/material.jpg"
        ></v-img>
        <ul class="profile">
            <li>活動名： よしもと</li>
            <li>活動歴： 1年未満</li>
            <li>芸風の種類： 漫才</li>
            <li>一言： よろしくお願いします。</li>
          </ul>
        <ul class="neta-list">
          <li class="sp-neta-list">イチオシのネタ</li>
          <li class="neta-list"><a href="./aaa">こんなC4C杯は嫌だ</a></li>
        </ul>
      </v-card>
      <v-card class="card-box">
        <v-img
          :width="460"
          aspect-ratio="16/9"
          cover
          src="https://cdn.vuetifyjs.com/images/parallax/material.jpg"
        ></v-img>
        <ul class="profile">
            <li>活動名： よしもと</li>
            <li>活動歴： 1年未満</li>
            <li>芸風の種類： 漫才</li>
            <li>一言： よろしくお願いします。</li>
          </ul>
        <ul class="neta-list">
          <li class="sp-neta-list">イチオシのネタ</li>
          <li class="neta-list"><a href="./aaa">こんなC4C杯は嫌だ</a></li>
        </ul>
      </v-card>
  </section> 
    <ul class="user-search-box">
      <li class="search-ttl">芸名</li>
        <v-text-field
              v-model="name"
              :rules="nameRules"
              required
        ></v-text-field>

  <li class="search-ttl">性別</li>
  <v-radio-group v-model="radiosGender">
    <v-radio
      v-for="select in optionGender"
      v-bind:key="select.id"
      v-bind:label="select.name"
      v-bind:value="select.name"
    ></v-radio>
  </v-radio-group>

  <li class="search-ttl">活動歴</li>
  <v-radio-group v-model="radiosActiveHistory">
    <v-radio
      v-for="select in optionActiveHistory"
      v-bind:key="select.id"
      v-bind:label="select.name"
      v-bind:value="select.name"
    ></v-radio>
  </v-radio-group>

  <li class="search-ttl">事務所</li>
  <v-checkbox-group v-model="optionOffice">
    <v-checkbox
      v-for="select in optionOffice"
      v-bind:key="select.id"
      v-bind:label="select.name"
      v-bind:value="select.name"
    ></v-checkbox>
  </v-checkbox-group>
    
      <li class="search-ttl">芸風</li>
      <v-checkbox label="漫才" name="office" value=1 id="mannzai"></v-checkbox>
      <v-checkbox label="ピン" name="office" value=2 id="pin"></v-checkbox>
      <v-checkbox label="コント" name="office" value=3 id="kont"></v-checkbox>
      <v-checkbox label="ギャグ" name="office" value=4 id="gyagu"></v-checkbox>
      <v-checkbox label="モノマネ" name="office" value=5 id="monomane"></v-checkbox>
      <v-checkbox label="歌ネタ" name="office" value=6 id="utaneta"></v-checkbox>
      <v-checkbox label="リズムネタ" name="office" value=7 id="rhythmneta"></v-checkbox>
      <v-checkbox label="その他" name="office" value=8 id="geihu-sonota"></v-checkbox>

    <li class="search-ttl">料金体系</li>   
    <v-select v-model="selectedFeeType">
      <option v-for="select in optionFeeType"
      v-bind:key="select.id"
      v-bind:label="select.name"
      v-bind:value="select.name">
      {{ select.name }}
      </option>
    </v-select>
  
      <li class="search-ttl">金額</li>
      <li class="search-fee">
        <v-select
          label=""
          :items="['下限なし', '1,000円', '2,000円', '3,000円', '4,000円', '5,000円', '6,000円', '7,000円', '8,000円', '9,000円', '10,000円']"
        ></v-select>
        <span class="search-ttl-span">～</span>
        <v-select
          label=""
          :items="['上限なし', '1,000円', '2,000円', '3,000円', '4,000円', '5,000円', '6,000円', '7,000円', '8,000円', '9,000円', '10,000円']"
        ></v-select>
      </li>
  
      <li class="search-ttl">特殊スキル</li>
      <v-checkbox label="動画編集" name="office" value=1 id="videoEdit"></v-checkbox>
      <v-checkbox label="イラスト" name="office" value=2 id="illustration"></v-checkbox>
      <v-checkbox label="音源制作" name="office" value=3 id="soundMake"></v-checkbox>
      <v-checkbox label="その他" name="office" value=4 id="skill-sonota"></v-checkbox>
  
      <li class="search-ttl">活動場所</li>
      <li>
        <v-select
          label=""
          :items="['', '北海道', '東北', '関東', '中部', '近畿', '中国・四国', '九州']"
        ></v-select>
      </li>
  
      <div>
        <v-btn>絞り込み</v-btn>
        <v-btn class="clear-btn">条件クリア</v-btn>
      </div>
    </ul>
  </main>
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