<template>
    
  <body>
    
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
      <li>
          <v-radio label="1年未満" value="1"></v-radio>
          <v-radio label="1年以上" value="2"></v-radio>
          <v-radio label="3年以上" value="3"></v-radio>
          <v-radio label="5年以上" value="1"></v-radio>
          <v-radio label="7年以上" value="2"></v-radio>
          <v-radio label="9年以上" value="3"></v-radio>
          <v-radio label="指定しない" value="3"></v-radio>
      </li>
  
      <li class="search-ttl">事務所</li>
        <v-checkbox label="吉本興業" name="office" value=1 id="yoshimoto"></v-checkbox>
        <v-checkbox label="人力舎" name="office" value=2 id="jinrikisha"></v-checkbox>
        <v-checkbox label="マセキ芸能社" name="office" value=3 id="maseki"></v-checkbox>
        <v-checkbox label="松竹芸能" name="office" value=4 id="shochiku"></v-checkbox>
        <v-checkbox label="その他" name="office" value=5 id="office-sonota"></v-checkbox>
  
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
      <li>
        <v-select
          label=""
          :items="['時給', '出来高']"
        ></v-select>
      </li>
  
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
  </body>
  </template>
  <style>
      ヘッダー
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
  
  const radiosGender = ref([])
  const optionGender = [
    { id: 1, name: '男'},
    { id: 2, name: '女'},
    { id: 3, name: '男女'}
  ]

  
  </script>