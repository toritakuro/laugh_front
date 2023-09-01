<template>
<!-- 
<v-container fluid>
        <v-row>
<v-col
            cols="12"
            sm="6"
          >
            <v-text-field
              v-model="password"
              :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
              :rules="[rules.required, rules.min]"
              :type="show1 ? 'text' : 'password'"
              name="input-10-1"
              label="Normal with hint text"
              hint="At least 8 characters"
              counter
              @click:append="show1 = !show1"
            ></v-text-field>
          </v-col>
  
          <v-col
            cols="12"
            sm="6"
          >
            <v-text-field
              :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
              :rules="[rules.required, rules.min]"
              :type="show2 ? 'text' : 'password'"
              name="input-10-2"
              label="Visible"
              hint="At least 8 characters"
              value="wqfasds"
              class="input-group--focused"
              @click:append="show2 = !show2"
            ></v-text-field>
          </v-col>

      </v-row>
      </v-container> -->

  <header>
    <h1 class="menu_top">
      Laugh
    </h1>
  </header>
  <main>
    <section class="user-register-box">
      <!-- <v-form> -->
        <h2 class="title-sub">新規会員登録</h2>
        <table class="user-register-list">
          <tr>
            <th>e-mail（ユーザーID）</th>
            <td>
              <v-col cols="12" sm="6" md="10">
                <v-text-field dense single-line outlined label="メール"></v-text-field>
              </v-col>
            </td>
          </tr>
          <tr>
            <th>パスワード</th>
            <td>
              <v-col cols="12" sm="6" md="10">
                <v-text-field :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'" :type="visible1 ? 'text' : 'password'" density="compact"
                              placeholder="パスワードを入力してください" prepend-inner-icon="mdi-lock-outline" variant="outlined" @click:append-inner="visible1 = !visible1">
                            </v-text-field>
              </v-col>
            </td>
          </tr>
          <tr>
            <th>パスワード【確認用】</th>
            <td>
              <v-col cols="12" sm="6" md="10">
                <v-text-field :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'" :type="visible2 ? 'text' : 'password'" density="compact"
                              placeholder="パスワード【確認用】を入力してください" prepend-inner-icon="mdi-lock-outline" variant="outlined" @click:append-inner="visible2 = !visible2">
                            </v-text-field>
              </v-col>
            </td>
          </tr>
          <tr>
            <th>作家/芸人</th>
            <td>
              <!-- <input type="radio" name="sakka-geinin" v-model="userType" value="1" id="composer"><label for="composer">作家</label>
              <input type="radio" name="sakka-geinin" v-model="userType" value="2" id="comedian"><label for="comedian">芸人</label> -->
              <v-container fluid>
                <v-radio-group column class="aaa">
                  <v-radio label="作家" value="radio-1"></v-radio>
                  <v-radio label="芸人" value="radio-2"></v-radio>
                </v-radio-group>
              </v-container>
            </td>
          </tr>
          <tr>
            <th>活動名</th>
            <td>
              <v-col cols="12" sm="6" md="10">
                <v-text-field dense single-line outlined label="美味しんぼーず"></v-text-field>
              </v-col>
            </td>
          </tr>
          <tr>
            <th>活動名（カナ）</th>
            <td>
              <v-col cols="12" sm="6" md="10">
                <v-text-field dense single-line outlined label="オイシンボーズ"></v-text-field>
              </v-col>
            </td>
          </tr>
          <tr>
            <th>活動開始年月</th>
            <td>
            <span ><input type="num" v-model="debutYear" class="text-box">年</span>
            <input type="num" v-model="debutMonth" class="text-box">月
            </td>
          </tr>
          <tr v-if="userType == 2">
            <th>活動人数</th>
            <td><input type="number" value="" class="num-box" min="0"/>人</td>
          </tr>
          <tr>
            <th>性別</th>
            <td>
              <v-container fluid>
                <v-radio-group column class="aaa">
                  <v-radio label="回答なし" value="radiooo-1"></v-radio>
                  <v-radio label="男性" value="radiooo-2"></v-radio>
                  <v-radio label="女性" value="radiooo-3"></v-radio>
                  <v-radio label="男女" value="radiooo-4"></v-radio>
                </v-radio-group>
              </v-container>
            </td>
          </tr>
          <tr>
            <th>事務所</th>
            <td>
              <v-container fluid>
                <v-row align="center">
                  <v-col class="d-flex" cols="12" sm="10">
                    <v-select :items="geininsakka" label="事務所"></v-select>
                  </v-col>
                </v-row>
              </v-container>
            </td>
          </tr>
            <tr>
              <th>得意分野</th>
              <td>
                <!-- <input type="checkbox" id="manzai" v-model="comedyStyleIdList" value="1"><label for="manzai">漫才</label>
                <input type="checkbox" id="pin" v-model="comedyStyleIdList" value="2"><label for="pin">ピン</label>
                <input type="checkbox" id="comte" v-model="comedyStyleIdList" value="3"><label for="comte">コント</label>
                <input type="checkbox" id="gag" v-model="comedyStyleIdList" value="4"><label for="gag">ギャグ</label>
                <input type="checkbox" id="impersonate" v-model="comedyStyleIdList" value="5"><label for="impersonate">モノマネ</label>
                <input type="checkbox" id="singing" v-model="comedyStyleIdList" value="6"><label for="singing">歌ネタ</label>
                <input type="checkbox" id="rythm" v-model="comedyStyleIdList" value="7"><label for="rythm">リズムネタ</label>
                <input type="checkbox" id="other" v-model="comedyStyleIdList" value="8"><label for="other">その他</label> -->
                
                <v-card flat>
                  <v-card-text>
                      <v-row>
                        <v-col class="d-flex justify-center" cols="12" sm="10">
                          <div class="d-flex justify-center">
                              <v-col cols="6" sm="3" md="2">
                                <v-checkbox v-model="ex4" label="漫才" color="orange" value="chk1" ></v-checkbox>
                              </v-col>
                              <v-col cols="6" sm="3" md="2">
                                <v-checkbox v-model="ex4" label="ピン" color="orange" value="chk2" ></v-checkbox>
                              </v-col>
                              <v-col cols="6" sm="3" md="2">
                                <v-checkbox v-model="ex4" label="コント" color="orange" value="chk3" ></v-checkbox>
                              </v-col>
                              <v-col cols="6" sm="3" md="2">
                                <v-checkbox v-model="ex4" label="ギャグ" color="orange" value="chk4" ></v-checkbox>
                              </v-col>
                              <v-col cols="6" sm="3" md="2">
                                <v-checkbox v-model="ex4" label="モノマネ" color="orange" value="chk5" ></v-checkbox>
                              </v-col>
                              <v-col cols="6" sm="3" md="2">
                                <v-checkbox v-model="ex4" label="歌ネタ" color="orange" value="chk6" ></v-checkbox>
                              </v-col>
                              <v-col cols="6" sm="3" md="2">
                                <v-checkbox v-model="ex4" label="リズムネタ" color="orange" value="chk7" ></v-checkbox>
                              </v-col>
                              <v-col cols="6" sm="3" md="2">
                                <v-checkbox v-model="ex4" label="その他" color="orange" value="chk8" ></v-checkbox>
                              </v-col>
                            </div>
                        </v-col>
                      </v-row>
                    </v-card-text>
                  </v-card>
              </td>
            </tr>
            <tr>
              <th>料金体系</th>
              <td>
                <!-- <input type="radio" name="okane" id="hour-base" v-model="feeType" value="1">
                <label for="hour-base">時給</label>
                <input type="radio" name="okane" id="result-base" v-model="feeType" value="2">
                <label for="result-base">成果物による</label> -->
                <v-container >
                <v-radio-group column class="aaa">
                  <v-radio label="時給" value="radioo-1"></v-radio>
                  <v-radio label="成果物による" value="radioo-2"></v-radio>
                </v-radio-group>
              </v-container>
              </td>
            </tr>
            <tr>
              <th>金額</th>
              <td v-if="feeType == 1"><input type="number" v-model="fee" class="num-box" min="0"/>円/時間</td>
              <td v-if="feeType == 2"><input type="number" v-model="fee" class="num-box" min="0"/>円</td>
            </tr>
            <tr v-if="userType == 1">
              <th>特殊スキル</th>
              <td>
                <input type="checkbox" id="movie" v-model="specialSkillIdList" value="1">
                <label for="movie">動画編集</label>
                <input type="checkbox" id="illustration" v-model="specialSkillIdList" value="2">
                <label for="illustration">イラスト</label>
                <input type="checkbox" id="sound_production" v-model="specialSkillIdList" value="3">
                <label for="sound_production">音源制作</label>
                <input type="checkbox" id="other_skill" v-model="specialSkillIdList" value="4">
                <label for="other_skill">その他</label>
                <input type="text" v-model="anotherSkill" class="register-input" placeholder="その他の内容を記載下さい">
              </td>
            </tr>
            <tr>
              <th>活動場所</th>
              <td>
                <v-col class="d-flex" cols="12" sm="10">
                  <v-select :items="tihou" label="地方を選択"></v-select>
                </v-col>
              </td>
            </tr>
            <tr>
              <th>自己紹介</th>
              <!-- <td><input type="textarea" v-model="selfIntroduction" placeholder="よろしくお願いします。" class="self-introduction-box" /></td> -->
              <!-- <td><textarea v-model="selfIntroduction" placeholder="よろしくお願いします。" class="self-introduction-box" ></textarea></td> -->
              <td>
                <v-col cols="12" sm="6" md="10">
                  <v-textarea v-model="selfIntroduction" single-line outlined solo name="input-7-4" label="よろしくおねがいします。" ></v-textarea>
                </v-col>
              </td>
            </tr>
            <tr>
							<th>画像</th>
              <td>
                <!-- <ImgFileComponent @set-file="setFile"/>
                <div>
                  <label v-if="!value" class="upload-content-space user-photo default">
                    <input ref="file" class="file-button" type="file" @change="upload" />アップロード</label>
                    <div v-if="value" class="uploaded">
                      <label class="upload-content-space user-photo">
                      <input ref="file" class="file-button" type="file" @change="upload" />
                      <img class="user-photo-image" :src="value" />
                    </label>
                  </div>
                </div> -->
                <v-col cols="12" sm="6" md="10">
                  <v-file-input label="画像のアップロード" filled prepend-icon="mdi-camera"></v-file-input>
                </v-col>
              </td>
            </tr>
        </table>
        <div class="d-block">
          <v-btn block elevation="2" small x-large color="orange">登録</v-btn>
        </div>
      <!-- </v-form> -->
    </section>
  </main>
</template>

<script setup>

// TypeScript が有効
import axios from "axios";
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router';
//import ImgFileComponent from '../components/ImgFileComponent.vue'

const router = useRouter();
const route = useRoute();
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
