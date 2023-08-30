<template>
  <header>
    <h1 class="menu_top">
      Laugh
    </h1>
  </header>
  <main>
    <section class="user-register-box">
      <v-form>
        <h2 class="title-sub">新規会員登録</h2>
        <table class="user-register-list">
          <tr>
            <th>e-mail（ユーザーID）</th>
            <td>
              <div>{{ userAddress }}</div>
            </td>
          </tr>
          <tr>
            <th>パスワード</th>
            <td><input type="password" v-model="password" placeholder="パスワードを入力" class="psw-box" /></td>
          </tr>
          <tr>
            <th>パスワード【確認用】</th>
            <td><input type="password" v-model="password2" placeholder="確認用のパスワードを入力" class="psw-box"/></td>
          </tr>
          <tr>
            <th>作家/芸人</th>
            <td>
              <input type="radio" name="sakka-geinin" v-model="userType" value="1" id="composer"><label for="composer">作家</label>
              <input type="radio" name="sakka-geinin" v-model="userType" value="2" id="comedian"><label for="comedian">芸人</label>
            </td>
          </tr>
          <tr>
            <th>活動名</th>
            <td><input type="text" v-model="userName" placeholder="美味しんぼーず" class="text-box" /></td>
          </tr>
          <tr>
            <th>活動名（カナ）</th>
            <td><input type="text" v-model="userNameKana" placeholder="オイシンボーズ" class="text-box" /></td>
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
              <input type="radio" id="unknown" v-model="gender" value="0">
              <label for="unknown">回答なし</label>
              <input type="radio" id="man" v-model="gender" value="1">
              <label for="man">男性</label>
              <input type="radio" id="woman" v-model="gender" value="2">
              <label for="woman">女性</label>
              <input type="radio" id="manwoman" v-model="gender" value="3">
              <label for="manwoman">男女</label>
            </td>
          </tr>
          <tr>
            <th>事務所</th>
            <td>
              <label for="" class="slc-box">
                <select v-model="officeId" name="user-office">
                  <option value="1" selected>--事務所を選択--</option>
                  <option value="2" >アヴィラ</option>
                  <option value="3" >浅井企画</option>
                  <option value="4" >ASH&Dコーポレーション</option>
                  <option value="5" >アミー・パーク</option>
                  <option value="6" >UMEDA芸能</option>
                  <option value="7" >FMG</option>
                  <option value="8" >MLクリエーション</option>
                  <option value="9" >大川興業</option>
                  <option value="10" >太田プロダクション</option>
                  <option value="11" >オフィス北野</option>
                  <option value="12" >オリジン・コーポレーション</option>
                  <option value="13" >お笑い集団ティーライズ</option>
                  <option value="14" >グレープカンパニー</option>
                  <option value="15" >ケイダッシュステージ</option>
                  <option value="16" >K-PRO</option>
                  <option value="17" >ザ・森東</option>
                  <option value="18" >サンミュージックプロダクション</option>
                  <option value="19" >SHUプロモーション</option>
                  <option value="20" >松竹芸能</option>
                  <option value="21" >スパンキープロダクション</option>
                  <option value="22" >ソニー・ミュージックアーティスツ</option>
                  <option value="23" >タイタン</option>
                  <option value="24" >トゥインクル・コーポレーション</option>
                  <option value="25" >徳間ジャパンコミュニケーションズ</option>
                  <option value="26" >どっかんプロ</option>
                  <option value="27" >トップ・カラー</option>
                  <option value="28" >ナチュラルエイト</option>
                  <option value="29" >ニュースタッフプロダクション</option>
                  <option value="30" >ノーリーズン</option>
                  <option value="31" >ファインステージ</option>
                  <option value="32" >プロダクション人力舎</option>
                  <option value="33" >プロデューサーハウスあ・うん</option>
                  <option value="34" >ホリプロ</option>
                  <option value="35" >ホリプロコム</option>
                  <option value="36" >マセキ芸能社</option>
                  <option value="37" >三木プロダクション</option>
                  <option value="38" >吉本興業</option>
                  <option value="39" >ワタナベエンターテインメント</option>
                  <option value="40" >ワハハ本舗</option>
                  <option value="41" >無所属</option>
                </select>
              </label>
            </td>
          </tr>
            <tr>
              <th>得意分野</th>
              <td>
                <input type="checkbox" id="manzai" v-model="comedyStyleIdList" value="1"><label for="manzai">漫才</label>
                <input type="checkbox" id="pin" v-model="comedyStyleIdList" value="2"><label for="pin">ピン</label>
                <input type="checkbox" id="comte" v-model="comedyStyleIdList" value="3"><label for="comte">コント</label>
                <input type="checkbox" id="gag" v-model="comedyStyleIdList" value="4"><label for="gag">ギャグ</label>
                <input type="checkbox" id="impersonate" v-model="comedyStyleIdList" value="5"><label for="impersonate">モノマネ</label>
                <input type="checkbox" id="singing" v-model="comedyStyleIdList" value="6"><label for="singing">歌ネタ</label>
                <input type="checkbox" id="rythm" v-model="comedyStyleIdList" value="7"><label for="rythm">リズムネタ</label>
                <input type="checkbox" id="other" v-model="comedyStyleIdList" value="8"><label for="other">その他</label>
              </td>
            </tr>
            <tr>
              <th>料金体系</th>
              <td>
                <input type="radio" id="hour-base" v-model="feeType" value="1">
                <label for="hour-base">時給</label>
                <input type="radio" id="result-base" v-model="feeType" value="2">
                <label for="result-base">成果物による</label>
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
                <label for="" class="slc-box">
                  <select v-model="areaId">
                    <option value="1">北海道</option>
                    <option value="2">東北</option>
                    <option value="3">関東</option>
                    <option value="4">北陸甲信越</option>
                    <option value="5">中部</option>
                    <option value="6">関西</option>
                    <option value="7">中国</option>
                    <option value="8">四国</option>
                    <option value="9">九州</option>
                  </select>
                </label>
              </td>
            </tr>
            <tr>
              <th>自己紹介</th>
              <!-- <td><input type="textarea" v-model="selfIntroduction" placeholder="よろしくお願いします。" class="self-introduction-box" /></td> -->
              <td><textarea v-model="selfIntroduction" placeholder="よろしくお願いします。" class="self-introduction-box" ></textarea></td>
            </tr>
            <tr>
							<th>画像</th>
							<td><ImgFileComponent @set-file="setFile"/></td>
            </tr>
        </table>
        <div class="btn-submit-box">
          <input @click="reg" type="button" value="登録" class="btn-submit">
        </div>
      </v-form>
    </section>
  </main>
</template>

<script setup lang="ts">
// TypeScript が有効
import axios from "axios";
import { ref, onMounted } from 'vue'
import ProfileService from '@/services/ProfileService';
import type ResponseData from "@/types/ResponseData";
import { useRouter, useRoute } from 'vue-router';
import ImgFileComponent from '../components/ImgFileComponent.vue'

const router = useRouter();
const route = useRoute();

const userAddress = ref('aiueo@a.a');
const userName = ref('国山');
const userNameKana = ref('くにやま');
const userType = ref(1);
const password = ref('kuniyama');
const password2 = ref('kuniyama');
const debutYear = ref(1991);
const debutMonth = ref(2);
const memberNum = ref(4);
const gender = ref(2);
const officeId = ref();
const comedyStyleIdList = ref([1,2]);
const feeType = ref(1);
const fee = ref('100');
const specialSkillIdList = ref([]);
const anotherSkill = ref('');
const areaId = ref('');
const selfIntroduction = ref('こんにちは。');
const profileImg = ref();

const setFile =  (base64:String) => {
	profileImg.value = base64.split(',')[1];
}

const reg = async () => {
  // オブジェクトで置き換えたい
  let data = {
    userType: userType.value,
    userAddress: userAddress.value,
    password: password.value,
    userName: userName.value,
    userNameKana: userNameKana.value,
    debutYear: debutYear.value,
    debutMonth: debutMonth.value,
    memberNum: memberNum.value,
    gender: gender.value,
    officeId: officeId.value,
    comedyStyleIdList: comedyStyleIdList.value,
    feeType: feeType.value,
    fee: fee.value,
    specialSkillIdList: specialSkillIdList.value,
    anotherSkill: anotherSkill.value,
    areaId: areaId.value,
    selfIntroduction: selfIntroduction.value,
		profileImg: profileImg.value 
  };
  ProfileService.create(data).then((response: ResponseData) => {
  });

  // router.push("/demo");
}

// onMounted(() => {
//   if (Array.isArray(route.params.address)) {
//     console.log(route.params.address[0]);
//     userAddress.value = route.params.address[0].replace(/\+/g, ".") || '';
//   } else {
//     console.log(route.params.address);
//     userAddress.value = route.params.address.replace(/\+/g, ".") || '';
//   }
// })

</script>

<style>
header {
	background-color: antiquewhite;
}

.menu_top {
	font-size: 56px;
	color: #fd7e00;
	font-weight: 800;
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
</style>

