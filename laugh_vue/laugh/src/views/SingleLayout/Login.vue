<template>
	<v-app id="app">
	  <v-container class="fill-height" fluid>
      <v-row align="center" justify="center">
        <v-col>
          <v-img class="mx-auto" max-width="1800" height="180" :src="imgUrl" alt="Laugh Login"></v-img>
          <v-form id="lgn-form" ref="form" v-model="valid" lazy-validation @submit.prevent="checkLogin">
            <v-text-field v-model="email" label="メールアドレス" required></v-text-field>
            <v-text-field class="pwd-inp" v-model="password" label="パスワード" type="password" required></v-text-field>
            <v-btn color="orange-darken-1" @click="getUser" width="320" height="56">
              <span style="font-size: 16px;">ログイン</span>
            </v-btn>
            
            <div class="pwd-link">
              <router-link to="/" class="forgot-pwd-link" @mouseover="changeColor" @mouseout="resetColor">
                パスワードをお忘れの方
              </router-link>
            </div>          
            <v-alert v-model="error" type="error" dismissible>{{ errorMessage }}</v-alert>
          </v-form>

          <div class="mem-regist mt-5 text-center">
            <span>まだ会員登録していない方は</span>
            <router-link to="/" class="forgot-pwd-link" @mouseover="changeColor" @mouseout="resetColor">
              こちらから登録
            </router-link>
            <span>(無料)お願いします</span>
          </div>
        </v-col>
      </v-row>
    </v-container>
	</v-app>
</template>

<style scoped>
#lgn-form {
  width: 320px;
  margin-left: auto;
  margin-right: auto;
}
.pwd-inp {
  margin-bottom: 20px;
}
.pwd-link {
  margin-top: 4px;
}
.forgot-pwd-link {
  color: #6495ed; /* リンクの初期色 */
  text-decoration-color:#6495ed; /* 下線部の色 */
  transition: color 0.1s; /* リンクの色の変化を滑らかに */
  font-size: 16px;
}
.forgot-pwd-link:hover {
  color: #FB8C00; /* ホバー時の色 */
  text-decoration-color:#FB8C00; /* 下線部の色 */
}
</style>

<script setup lang="ts">
import axios from "axios";
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import LoginService from '@/services/LoginService';
import type ResponseData from "@/types/ResponseData";
import type User from "@/types/User";
import store from "@/store";

const valid = ref(true);
const imgUrl = ref('/img/laugh-logo.png');
const error = ref(false);
const errorMessage = ref('メールアドレスまたはパスワードに誤りがあります');
const form = ref();

const router = useRouter();
const email = ref('');
const password = ref('');

const checkLogin = async (event: Event) => {
  event.preventDefault(); // フォームのデフォルトの送信動作を防止
  if (form.value.validate()) { // フォームのバリデーションチェック
    await getUser();
  }
};

const getUser = async () => {
  let data = {
    email: email.value,
    password: password.value
  };
  try {
    const response = await LoginService.getLoginUser(data.email, data.password);
    if (response.status === 200) {
      // ログイン成功
        alert(`ようこそ！`);
        store.commit('token/saveIdToken', response.data.data.idToken);
        store.commit('token/saveRefreshToken', response.data.data.refreshToken);
        store.commit('user/saveUserId', response.data.data.id);
        store.commit('user/saveUserType', response.data.data.userType);
        router.push({ name: 'demo' });
    } else {
      // ログイン失敗
      error.value = true;
    }
  } catch (err) {
    console.error(err);
    error.value = true;
  }
};
</script>