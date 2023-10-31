<template>
	<v-app id="app" style="background-color: #F8F9FA;">
	  <v-container class="mt-16 pt-16">
      <MessageComponent></MessageComponent>
      <v-row justify="center" class="mb-4"><p class="font-weight-bold">ようこそ! Laughへ</p></v-row>
      <v-row justify="space-around">
        <v-avatar size="80" color="#FFEBEE" :class="{ shake: disabled }" class="img" @click="warnDisabled">
          <v-img height="100px" :src="imgUrl" alt="Laugh Login"></v-img>
        </v-avatar>
      </v-row>
      <v-row justify="center">
        <v-col lg="4" md="6" sm="8">
          <v-card >
            <v-form id="login-form" class="mt-5" ref="form" v-model="valid" lazy-validation @submit.prevent="checkLogin">
            <v-card-text class="pa-7">
              <v-text-field class="mb-8" autocomplete="off"  density="compact" v-model="email" label="メールアドレス" hide-details required></v-text-field>
              <div class="mb-5">
              <v-text-field density="compact" autocomplete="off" v-model="password" label="パスワード" type="password" hide-details required></v-text-field>
              <!-- <div class="mb-5 text-right">
                <a href="#" class="link" >パスワードをお忘れの方</a>
              </div> -->
              </div>
              <div class="password-link">
              </div>
              <v-btn color="orange-darken-1" @click="getUser" append-icon="mdi-login" block>ログイン
                  <template v-slot:append>
                    <v-icon color="#ffffff"></v-icon>
                  </template>
              </v-btn>
            </v-card-text>
            </v-form>
          </v-card>
        <div class="mem-regist mt-5 text-center" style="font-size: 12px;">
            <span>まだ会員登録していない方は</span>
            <a href="#"  class="link" @mouseover="changeColor" @mouseout="resetColor">
              こちらから登録
            </a>
            <span>(無料)お願いします</span>
          </div>
        </v-col>
      </v-row>
    </v-container>
	</v-app>
</template>

<style>

.link {
  color: #6495ed; /* リンクの初期色 */
  transition: color 0.1s; /* リンクの色の変化を滑らかに */
  font-size: 12px;
}
.forgot-password-link:hover {
  color: #ff9933; /* ホバー時の色 */
}

.shake {
  animation: shake 0.82s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
  transform: translate3d(0, 0, 0);
}
.img:hover {
  cursor: pointer
} 
@keyframes shake {
  10%,
  90% {
    transform: translate3d(-1px, 0, 0);
  }

  20%,
  80% {
    transform: translate3d(2px, 0, 0);
  }

  30%,
  50%,
  70% {
    transform: translate3d(-4px, 0, 0);
  }

  40%,
  60% {
    transform: translate3d(4px, 0, 0);
  }
}
</style>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import LoginService from '@/services/LoginService';
import store from "@/store";
import MessageComponent from "@/components/MessageComponent.vue"

const valid = ref(true);
const imgUrl = ref('/img/laugh-logo.png');
const error = ref(false);
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
        store.commit('token/saveIdToken', response.data.data.idToken);
        store.commit('token/saveRefreshToken', response.data.data.refreshToken);
        store.commit('user/saveUserId', response.data.data.id);
        store.commit('user/saveUserType', response.data.data.userType);
        router.push({ name: 'top' });
    } else {
      // ログイン失敗
      error.value = true;
    }
  } catch (err) {
    console.error(err);
    error.value = true;
  }
};
const disabled = ref(false)

function warnDisabled() {
  disabled.value = true
  setTimeout(() => {
    disabled.value = false
  }, 1500)
}
</script>