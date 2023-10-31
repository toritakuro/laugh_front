<template>
  <v-container class="bak-color" fluid>
    <div>
      <ul class="step-box">
        <li class="step-1 done"><div class="step-num">１</div><div class="step-desc">アドレス登録</div></li>
        <li class="step-2"><div class="step-num">２</div><div class="step-desc">本人情報の入力</div></li>
        <li class="step-3"><div class="step-num">３</div><div class="step-desc">登録完了</div></li>
      </ul>
    </div>

    <div v-if="initStatus == 1">
      <v-row justify="center">
        <v-col class="mt-16" cols="4">
          <v-card-title class=" mb-4">
            <div><v-icon left>mdi-email</v-icon> メールアドレス登録</div>
          </v-card-title>
          
          <v-card>
            <v-card-text class="pt-8 ">
              <v-form>
                <v-col>
                  <v-text-field
                    v-model="email"
                    label="メールアドレス"
                    :rules="[rules.required]"
                  ></v-text-field>
                  <v-btn 
                    block 
                    class="mt-4" 
                    color="orange" 
                    @click="send"
                  >会員登録する</v-btn>
                </v-col>
              </v-form>
              <v-col>すでに会員の方は<router-link to="/login">こちらからログイン</router-link>してください</v-col>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </div>

    <div v-if="initStatus == 2">
      <v-row justify="center" >
        <v-col class="mt-16" cols="5">
          <v-card>
            <v-card-title style="text-align: center;">
              メールアドレス登録完了
            </v-card-title>
            <v-card-text class="text-container">
              <div class="mail-text">あなたのメールアドレス：<span class="email-orange">{{ email }}</span></div>
              <div class="description-text">※まだ会員登録は完了していません</div>
              <div class="description-text">メール本文に記載されているURLをクリックして<br>会員登録を完了してください</div>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
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
import { ref, computed } from 'vue'
import http from "@/http-common";

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
    console.log(error)
  })
  .finally(() => {
  });
}
</script>

<style>
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

.mail-text {
  text-align: center;
  font-size: 16px;
  margin-bottom: 36px;
}

.description-text {
  text-align: center;
  font-size: 12px;
}

.email-orange {
  color: orange;
  font-weight: bold;
}

.bak-color {
  background-color: #F8F9FA;
  min-height: 100vh;
}
</style>