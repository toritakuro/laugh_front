<template>
  <v-container v-if="initStatus == 1">
    <v-row justify="center" align-content="center">
      <ul class="step-box">
        <li class="step-1 done"><div class="step-num">１</div><div class="step-desc">アドレス登録</div></li>
        <li class="step-2"><div class="step-num">２</div><div class="step-desc">本人情報の入力</div></li>
        <li class="step-3"><div class="step-num">３</div><div class="step-desc">登録完了</div></li>
      </ul>
    </v-row>
    <v-row>
      <v-card
        class="mx-auto profileRegWrap"
        prepend-icon="mdi-home"
      >
        <template v-slot:title>
          メールアドレス登録
        </template>

        <v-card-text>
          <v-form>
            <v-text-field
              v-model="email"
              label="メールアドレス"
              :rules="[rules.required]"
            ></v-text-field>
            <v-btn 
              block 
              class="mt-2" 
              color="orange" 
              @click="send"
              
            >会員登録する</v-btn>
          </v-form>
        </v-card-text>

        <v-card-text>すでに会員の方は<a href="">こちらからログイン</a>してください</v-card-text>
      </v-card>
    </v-row>
  </v-container>

  <v-container v-if="initStatus == 2">
    <v-row justify="center" align-content="center">
      <ul class="step-box">
        <li class="step-1 done"><div class="step-num">１</div><div class="step-desc">アドレス登録</div></li>
        <li class="step-2"><div class="step-num">２</div><div class="step-desc">本人情報の入力</div></li>
        <li class="step-3"><div class="step-num">３</div><div class="step-desc">登録完了</div></li>
      </ul>
    </v-row>
    <h2 class="title-sub">登録用メールを送信しました</h2>
    <div class="cen-box">
      <dl class="mail-inp-box">
        <dt>あなたのメールアドレス</dt>
        <dd>{{ email }}</dd>
      </dl>
      <p class="text-supplement">メール本文に記載されている「メールアドレス認証」を<br>クリックして会員登録を完了してください</p>
      <p class="text-supplement"><span>※まだ会員登録は完了していません</span></p>
    </div>
  </v-container>
  
  <v-dialog v-model="showModal" max-width="500px">
    <v-card>
      <v-card-title>登録できません。</v-card-title>
      <v-card-text>
        メールアドレスを入力して下さい。
      </v-card-text>
      <v-card-actions>
        <v-btn color="blue darken-1" text @click="showModal = false">閉じる</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>

</template>



<script setup lang="ts">
// TypeScript が有効
import { ref, computed } from 'vue'
import http from "@/http-common";
import { useRouter } from 'vue-router';

const router = useRouter();
const initStatus = ref(1);
const showModal = ref(false);
const email = ref('');


const rules = {
  required: (value: any) => !!value || '入力してください',
}

const isFormValid = computed(() => {
  return email.value != ''
  }
)

const send = async () => {

  if(!isFormValid.value) {
    showModal.value = true;
    return;
  }

  let data = {
    email: email.value
  };

  http.post("/profile/init", data)
  .then(() => {
    initStatus.value = 2;
  })
  .catch((error) => {
    // エラー発生時の処理
    console.log(error)
  })
  .finally(() => {
    // 正常終了・エラー問わず必ず行う処理
  });
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

.profileRegWrap {
  width: 900px;
}
.step-box {
  display: flex;
  justify-content: center;
  padding-top: 10px;
  padding-bottom: 60px;
}

.step-box > li {
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  text-align: center;
}

.step-box > li > .step-num  {
  width: 50px;
  height: 50px;
  font-size: 30px;
  color: #f6f6f6;
  justify-content: center;
  text-align: center;
  border-radius: 40px;
  background-color: #cccccc;
}

.step-box > li > .step-desc {
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #555555;
  font-size: 24px;
  bottom: -50px;
  width: 200px;
  height: 37px;
  text-align: center;
  white-space: normal;
  line-height: 15px;
}

.step-box > li + li {
  position: relative;
  margin-left: 260px;
}

.step-box > li + li:before {
  content: '';
  display: block;
  position: absolute;
  top: 50%;
  left: -256px;
  width: 252px;
  height: 1px;
  background-color: #555555;
  transform: translateY(-50%);
}

.step-box > li.done > .step-num,
.step-box > li + li.done:before {
  background-color: orange;
}

.step-box > li.done > .step-desc {
  color: orange;
  font-weight: bold;
}
</style>