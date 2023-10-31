<template>
    <v-container class="bakColor">
        <v-row justify="center" align-content="center">
            <ul class="step-box">
                <li class="step-1 done"><div class="step-num">１</div><div class="step-desc">アドレス登録</div></li>
                <li class="step-2 done"><div class="step-num">２</div><div class="step-desc">本人情報の入力</div></li>
                <li class="step-3 done"><div class="step-num">３</div><div class="step-desc">登録完了</div></li>
            </ul>
        </v-row>
        <v-row>
            <v-card
                class="mx-auto profileRegComWrap"
                prepend-icon="mdi-home"
                >
                <template v-slot:title>
                    登録完了
                </template>
                <v-col class="d-flex justify-center">
                    <v-col cols="6">
                        <v-col class="d-flex justify-center">
                            <h1 class="main-text">登録が完了しました</h1>
                        </v-col>
                        <v-col class="d-flex justify-center">
                            <div>
                                <div class="sub-text-box">
                                    <p>Laughにご登録いただきありがとうございます。</p>
                                    <p>引き続き、Laughをお楽しみください。</p>
                                </div>
                                <div class=" sub-text-box">
                                    <p>※こちらからログイン画面にアクセスできます</p>
                                    <v-col class="d-flex justify-center">
                                        <div>
                                            <a class="link-login" @click="displayUser()">ログイン画面へ</a>
                                        </div>
                                    </v-col>
                                </div>
                            </div>
                        </v-col>
                    </v-col>
                </v-col>

            </v-card>
        </v-row>
    </v-container>
</template>


<script setup lang="ts">
import { useRouter } from 'vue-router';

const displayUser = () => {
  router.push({ path: '/Login' })
}

const router = useRouter()

</script>

<style scoped>

.link-login {
  color: #6495ed; /* リンクの初期色 */
  transition: color 0.1s; /* リンクの色の変化を滑らかに */
  font-size: 12px;
  text-decoration: underline;
}
.link-login:hover {
  color: #ff9933; /* ホバー時の色 */
}

.profileRegComWrap {
    width: 900px;
}

.main-text {
    color: orange;
    font-weight: bold;
}

.sub-text-box {
    margin-top: 36px;
}

.lead-box {
    margin-top: 36px;
}

/* ステップバーの表示 */
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