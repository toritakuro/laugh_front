<template>
  <header>
    <h1 class="menu_top">
      Laugh
    </h1>
  </header>
  <main>
    <section class="mail-box" v-if="initStatus == 1">
      <v-form>
        <h2 class="title-sub">新規会員登録</h2>
        <div class="cen-box">
          <dl class="mail-inp-box">
            <dt class="text-supplement">メールアドレスで登録する</dt>
            <!-- <dd><input type="text" value="" placeholder="メールアドレスを入力してください" class="text-box" onkeyup="keyUp()" /></dd> -->
            <dd><input type="text" v-model="userAddress" class="register-input" ></dd>
          </dl>
          <div class="btn-submit-box">
            <v-btn @click="send" depressed color="primary">同意して会員登録する（無料）</v-btn>
          </div>
          <p class="text-supplement">すでに会員の方は<a href="">こちらからログイン</a>してください</p>
        </div>
      </v-form>
    </section>

    <section class="mail-box" v-if="initStatus == 2">
        <h2 class="title-sub">登録用メールを送信しました</h2>
        <div class="cen-box">
          <dl class="mail-inp-box">
            <dt>あなたのメールアドレス</dt>
            <dd>{{ userAddress }}</dd>
          </dl>
          <p class="text-supplement">メール本文に記載されている「メールアドレス認証」を<br>クリックして会員登録を完了してください</p>
          <p class="text-supplement"><span>※まだ会員登録は完了していません</span></p>
        </div>
    </section>

  </main>

</template>



<script setup lang="ts">
// TypeScript が有効
import axios from "axios";
import { ref, onMounted } from 'vue'
import ProfileService from '@/services/ProfileService';
import type ResponseData from "@/types/ResponseData";
import { useRouter } from 'vue-router';

const router = useRouter();
const initStatus = ref(1);

const userAddress = ref('s.kunisu@c4c.co.jp');

const send = async () => {
  // オブジェクトで置き換えたい
  let data = {
    userAddress: userAddress.value
  };
  ProfileService.send(data).then((response: ResponseData) => {
    
  });
  initStatus.value = 2;
  // router.push("/demo");
}

</script>


<style>
header {
    background-color: antiquewhite;
}

main {
    width: 100%;
}

.menu_top {
    font-size: 56px;
    color: #fd7e00;
    font-weight: 800;
}

.mail-box {
    width: 50%;
    margin: 0 auto;
}

.title-sub {
    text-align: center;
    color: #868686;
    font-size: 32px;
    font-weight: 800;
}

.cen-box {
    width: 70%;
    margin: 0 auto;
    margin-top: 48px;
}

.mail-inp-box dd {
    margin: 0;
}

.btn-submit-box {
    width: 100%;
    margin-top: 12px;
}

.text-box {
    width: 100%;
    padding: 10px 15px;
    font-size: 16px;
    border-radius: 3px;
    border: 2px solid #ff9900;
    box-sizing: border-box;
}

.text-box:focus {
    border: 2px solid #ffcd90; 
    z-index: 10;
    outline: 0;
}

.btn-submit {
    width: 100%;
    background-color: #ff9900;
    font-size: 22px;
    border-radius: 5px;
    border: solid 3px #ff8800;
    box-shadow: 3px 3px 3px gray;
    transition: 0.3s;
    padding: 4px 36px;
}

.btn-submit:hover {
    background-color: #ffbb3c;
}

.text-supplement {
    font-size: 20px;
}

.text-supplement.terms {
    text-align: center;
    margin-top: 48px;
    margin-bottom: 0px;
}
</style>