<template>
  <v-container>
    <v-row>ステップバーを書く(錦)</v-row>
    <v-row>
      <v-card
        class="mx-auto w-50"
        width="400"
        prepend-icon="mdi-home"
      >
        <template v-slot:title>
          新規登録
        </template>

        <v-card-text>
          <v-form @submit.prevent>
            <v-text-field
              v-model="firstName"
              :rules="rules"
              label="名前"
            ></v-text-field>
            <v-text-field
              v-model="firstName"
              :rules="rules"
              label="メールアドレス"
            ></v-text-field>
            <v-text-field
              v-model="firstName"
              :rules="rules"
              label="ほげげ"
            ></v-text-field>
            <v-text-field
              v-model="firstName"
              :rules="rules"
              label="ほげ"
            ></v-text-field>
            <v-btn type="submit" block class="mt-2">Submit</v-btn>
          </v-form>
        </v-card-text>
      </v-card>
    </v-row>
  </v-container>
</template>

<script setup>

// TypeScript が有効
import axios from "axios";
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router';

const router = useRouter();
const route = useRoute();
// setupをscriptタグに書くことによってexport defaultせずに使えるようになる compositionAPIというvue3からの機能
const test = ref('test');
test.value = "aiueo";
// //画像のアップロード

// new Vue({
//   el: '#app',
//   vuetify: new Vuetify(),
  
// })

// export default {
//   // data () {
//   //     return {
//   //       show1: false,
//   //       password: '',
//   //       rules: {
//   //         required: value => !!value || '入力必須です。',
//   //         min: v => v.length >= 8 || '8文字以上入力してください',
//   //         emailMatch: () => (`The email and password you entered don't match`),
//   //       },
//   //     }
//   //   }

//     data: () => ({
//       geininsakka: ['アヴィラ', '浅井企画', 'ASH&Dコーポレーション', 'アミー・パーク', 'UMEDA芸能', 'FMG', 'MLクリエーション', '大川興業', '太田プロダクション', 'オフィス北野', 'オリジン・コーポレーション'
//                   , 'お笑い集団ティーライズ', 'グレープカンパニー', 'ケイダッシュステージ', 'K-PRO', 'ザ・森東', 'サンミュージックプロダクション', 'SHUプロモーション', '松竹芸能', 'スパンキープロダクション'
//                   , 'ソニー・ミュージックアーティスツ', 'タイタン', 'トゥインクル・コーポレーション', '徳間ジャパンコミュニケーションズ', 'どっかんプロ', 'トップ・カラー', 'ナチュラルエイト', 'ニュースタッフプロダクション'
//                   , 'ノーリーズン', 'ファインステージ', 'プロダクション人力舎', 'プロデューサーハウスあ・うん', 'ホリプロ', 'ホリプロコム', 'マセキ芸能社', '三木プロダクション', '吉本興業', 'ワタナベエンターテインメント'
//                   , 'ワハハ本舗', '無所属'],
//       tihou: ['北海道', '東北', '関東', '北陸甲信越', '中部', '関西', '中国', '四国', '九州'],
//     }),

//     // data: () => ({
//     //   geininsakka: ['アヴィラ', '浅井企画', 'ASH&Dコーポレーション', 'アミー・パーク', 'UMEDA芸能', 'FMG', 'MLクリエーション', '大川興業', '太田プロダクション', 'オフィス北野', 'オリジン・コーポレーション'
//     //               , 'お笑い集団ティーライズ', 'グレープカンパニー', 'ケイダッシュステージ', 'K-PRO', 'ザ・森東', 'サンミュージックプロダクション', 'SHUプロモーション', '松竹芸能', 'スパンキープロダクション'
//     //               , 'ソニー・ミュージックアーティスツ', 'タイタン', 'トゥインクル・コーポレーション', '徳間ジャパンコミュニケーションズ', 'どっかんプロ', 'トップ・カラー', 'ナチュラルエイト', 'ニュースタッフプロダクション'
//     //               , 'ノーリーズン', 'ファインステージ', 'プロダクション人力舎', 'プロデューサーハウスあ・うん', 'ホリプロ', 'ホリプロコム', 'マセキ芸能社', '三木プロダクション', '吉本興業', 'ワタナベエンターテインメント'
//     //               , 'ワハハ本舗', '無所属'],
//     //   tihou: ['北海道', '東北', '関東', '北陸甲信越', '中部', '関西', '中国', '四国', '九州'],
//     // }),

//   //   data () {
//   //   return {
//   //     show1: false,
//   //     show2: true,
//   //     show3: false,
//   //     show4: false,
//   //     password: 'Password',
//   //     rules: {
//   //       required: value => !!value || 'Required.',
//   //       min: v => v.length >= 8 || 'Min 8 characters',
//   //       emailMatch: () => (`The email and password you entered don't match`),
//   //     },
//   //   }
//   // },
// }

</script>

<style scoped>

header {
	background-color: antiquewhite;
}

.menu_top {
	font-size: 56px;
	color: #fd7e00;
	font-weight: 700;
}

main {
	width: 1200px;
	background-color: white;
	margin: 50px auto;
}

.user-register-box {
	margin-top: -37px;
	padding: 12px 12px 64px 12px;
}

.title-sub {
	font-size: 32px;
	font-weight: 800;
	margin-top: 1px;
	margin-left: 12px;
	margin-bottom: 0px;
}

.user-register-list {
	border-collapse:collapse;
	margin-top: 12px;
	margin-left: 12px;
}

.user-register-list th {
	background-color: antiquewhite;
	font-size: 20px;
	text-align: center;
	color: #fd7e00;
	padding: 12px 16px;
  
}

.user-register-list td {
	font-size: 20px;
	padding: 12px 16px;
}

.submit-button {
	text-align: center;
	margin-top: 12px;
	margin-left: 12px;
}

.text-box {
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

.psw-box {
	padding: 10px 15px;
	font-size: 16px;
	border-radius: 3px;
	border: 2px solid #ff9900;
	box-sizing: border-box;
}

.psw-box:focus {
	border: 2px solid #ffcd90;
	background-color: #ffe6b4;
	z-index: 10;
	outline: 0;
}

.num-box {
	padding: 10px 15px;
	font-size: 16px;
	border-radius: 3px;
	border: 2px solid #ff9900;
	box-sizing: border-box;
}

.num-box:focus {
	border: 2px solid #ffcd90;
	z-index: 10;
	outline: 0;
}

.slc-box {
	position: relative;
}

.slc-box::before,
.slc-box::after {
	position: absolute;
	content: '';
	pointer-events: none;
}

.slc-box::before {
	right: 0;
	display: inline-block;
	width: 42px;
	height: 42px;
	border-radius: 0 3px 3px 0;
	background-color: #ff9900;
	content: '';
}

.slc-box::after {
	position: absolute;
	top: 50%;
	right: 21px;
	transform: translate(50%, -50%) rotate(45deg);
	width: 6px;
	height: 6px;
	border-bottom: 3px solid #fff;
	border-right: 3px solid #fff;
	content: '';
}

.slc-box select {
	appearance: none;
	-webkit-appearance: none;
	-moz-appearance: none;
	min-width: 230px;
	height: 2.8em;
	padding: 10px 15px;
	border: 2px solid #ff9900;
	border-radius: 3px;
	color: #333333;
	font-size: 15px;
	cursor: pointer;
}

.slc-box select:focus {
	outline: 1px solid #ffcd90;
}

.self-introduction-box {
	padding: 10px 15px;
	font-size: 16px;
	border-radius: 3px;
	border: 2px solid #ff9900;
	box-sizing: border-box;
  width: 500px;
  height: 200px;
}

.self-introduction-box:focus {
	border: 2px solid #ffcd90;
	background-color: #ffe6b4;
	z-index: 10;
	outline: 0;
}

.btn-submit-box {
	text-align: center;
	margin-top: 24px;
}

.btn-submit {
	background-color: #ff9900;
	font-size: 24px;
	border-radius: 5px;
	border: solid 3px #ff8800;
	box-shadow: 3px 3px 3px gray;
	transition: 0.3s;
	padding: 4px 36px;
	letter-spacing: 12px;
}

.btn-submit:hover {
	background-color: #ffbb3c;
}

input {
  margin-left: 12px;
}

.user-photo {
  cursor: pointer;
  outline: none;
}

.user-photo.default {
  align-items: center;
  background-color: #0074fb;
  border: 1px solid #0051b0;
  border-radius: 2px;
  box-sizing: border-box;
  display: inline-flex;
  font-weight: 600;
  justify-content: center;
  letter-spacing: 0.3px;
  color: #fff;
  height: 4rem;
  padding: 0 1.6rem;
  max-width: 177px;
}

.user-photo.default:hover {
  background-color: #4c9dfc;
}

.user-photo.default:active {
  background-color: #0051b0;
}

.user-photo-image {
  max-width: 85px;
  display: block;
}

.user-photo-image:hover {
  opacity: 0.8;
}

.file-button {
  display: none;
}

.uploaded {
  align-items: center;
  display: flex;
}

.d-block {
  margin: 0 auto;
  width: 200px;
  margin-top: 48px;
}

</style>
