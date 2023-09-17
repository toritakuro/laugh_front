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
              <div>{{ profileReq.userAddress }}</div>
            </td>
          </tr>
          <tr>
            <th>パスワード</th>
            <td><input type="password" v-model="profileReq.password" placeholder="パスワードを入力" class="psw-box" /></td>
          </tr>
          <tr>
            <th>パスワード【確認用】</th>
            <td><input type="password" v-model="password2" placeholder="確認用のパスワードを入力" class="psw-box"/>{{ passChk }}</td>
          </tr>
          <tr>
            <th>作家/芸人</th>
            <td>
              <input type="radio" name="sakka-geinin" v-model="profileReq.userType" value="1" id="composer"><label for="composer">作家</label>
              <input type="radio" name="sakka-geinin" v-model="profileReq.userType" value="2" id="comedian"><label for="comedian">芸人</label>
            </td>
          </tr>
          <tr>
            <th>活動名</th>
            <td><input type="text" v-model="profileReq.userName" placeholder="美味しんぼーず" class="text-box" /></td>
          </tr>
          <tr>
            <th>活動名（カナ）</th>
            <td><input type="text" v-model="profileReq.userNameKana" placeholder="オイシンボーズ" class="text-box" /></td>
          </tr>
          <tr>
            <th>活動開始年月</th>
            <td>
            <span ><input type="num" v-model="profileReq.debutYear" class="text-box">年</span>
            <input type="num" v-model="profileReq.debutMonth" class="text-box">月
            </td>
          </tr>
          <tr v-if="profileReq.userType == 2">
            <th>活動人数</th>
            <td><input type="number" value="" class="num-box" min="0"/>人</td>
          </tr>
          <tr>
            <th>性別</th>
            <td>
              <input type="radio" id="unknown" v-model="profileReq.gender" value="0">
              <label for="unknown">回答なし</label>
              <input type="radio" id="man" v-model="profileReq.gender" value="1">
              <label for="man">男性</label>
              <input type="radio" id="woman" v-model="profileReq.gender" value="2">
              <label for="woman">女性</label>
              <input type="radio" id="manwoman" v-model="profileReq.gender" value="3">
              <label for="manwoman">男女</label>
            </td>
          </tr>
          <tr>
            <th>事務所</th>
            <td>
              <label for="" class="slc-box">
                <select v-model="profileReq.officeId" name="user-office">
                  <option v-for="office in offices" :key="office.id" :value="office.id">
                    {{ office.name }}
                  </option>
                </select>
              </label>
            </td>
          </tr>
            <tr>
              <th>得意分野</th>
              <td>
                <input type="checkbox" id="manzai" v-model="profileReq.comedyStyleIdList" value="1"><label for="manzai">漫才</label>
                <input type="checkbox" id="pin" v-model="profileReq.comedyStyleIdList" value="2"><label for="pin">ピン</label>
                <input type="checkbox" id="comte" v-model="profileReq.comedyStyleIdList" value="3"><label for="comte">コント</label>
                <input type="checkbox" id="gag" v-model="profileReq.comedyStyleIdList" value="4"><label for="gag">ギャグ</label>
                <input type="checkbox" id="impersonate" v-model="profileReq.comedyStyleIdList" value="5"><label for="impersonate">モノマネ</label>
                <input type="checkbox" id="singing" v-model="profileReq.comedyStyleIdList" value="6"><label for="singing">歌ネタ</label>
                <input type="checkbox" id="rythm" v-model="profileReq.comedyStyleIdList" value="7"><label for="rythm">リズムネタ</label>
                <input type="checkbox" id="other" v-model="profileReq.comedyStyleIdList" value="8"><label for="other">その他</label>
              </td>
            </tr>
            <tr>
              <th>料金体系</th>
              <td>
                <input type="radio" id="hour-base" v-model="profileReq.feeType" value="1">
                <label for="hour-base">時給</label>
                <input type="radio" id="result-base" v-model="profileReq.feeType" value="2">
                <label for="result-base">成果物による</label>
              </td>
            </tr>
            <tr>
              <th>金額</th>
              <td v-if="profileReq.feeType == 1"><input type="number" v-model="profileReq.fee" class="num-box" min="0"/>円/時間</td>
              <td v-if="profileReq.feeType == 2"><input type="number" v-model="profileReq.fee" class="num-box" min="0"/>円</td>
            </tr>
            <tr v-if="profileReq.userType == 1">
              <th>特殊スキル</th>
              <td>
                <input type="checkbox" id="movie" v-model="profileReq.specialSkillIdList" value="1">
                <label for="movie">動画編集</label>
                <input type="checkbox" id="illustration" v-model="profileReq.specialSkillIdList" value="2">
                <label for="illustration">イラスト</label>
                <input type="checkbox" id="sound_production" v-model="profileReq.specialSkillIdList" value="3">
                <label for="sound_production">音源制作</label>
                <input type="checkbox" id="other_skill" v-model="profileReq.specialSkillIdList" value="4">
                <label for="other_skill">その他</label>
                <input type="text" v-model="profileReq.anotherSkill" class="register-input" placeholder="その他の内容を記載下さい">
              </td>
            </tr>
            <tr>
              <th>活動場所</th>
              <td>
                <label for="" class="slc-box">
                  <select v-model="profileReq.areaId">
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
              <td>
                <textarea v-model="profileReq.selfIntroduction" placeholder="よろしくお願いします。" class="self-introduction-box" @input="checkLength"></textarea><br>
                <p v-if="textTooLong">長すぎます。500文字以内で入力して下さい</p>
              </td>
            </tr>
            <tr>
							<th>画像</th>
							<td><ImgFileComponent @set-file="setFile"/></td>
            </tr>
        </table>
        <div class="btn-submit-box">
          <input @click="reg" type="button" value="登録" class="btn-submit" v-bind:disabled="disableRegisterButton"><br>
          <p v-if="disableRegisterButton">必須項目を入力していないと登録できません</p>
        </div>
      </v-form>
    </section>
  </main>
</template>

<script setup lang="ts">
// TypeScript が有効
import { ref, onMounted, computed} from 'vue'
import type Profile from "@/types/Profile";
import { useRouter, useRoute } from 'vue-router';
import ImgFileComponent from '../components/ImgFileComponent.vue'
import http from "@/http-common";
import { offices } from "../types/Office";

const router = useRouter();
const route = useRoute();

const password2 = ref('kuniyama');
const profileImg = ref();
const textTooLong = ref(false);

const disableRegisterButton = computed(() => {
  // 必要なフィールドがすべて埋まっているかを確認
  if (!profileReq.value.userAddress) return true;
  if (!profileReq.value.password) return true;
  if (!profileReq.value.userName) return true;
  if (!profileReq.value.userNameKana) return true;
  if (!profileReq.value.debutYear) return true;
  if (!profileReq.value.debutMonth) return true;
  if (profileReq.value.userType == 2 && !profileReq.value.memberNum) return true;
  if (!profileReq.value.gender) return true;
  if (!profileReq.value.officeId) return true;
  if (!profileReq.value.comedyStyleIdList.length) return true;
  if (!profileReq.value.feeType) return true;
  if (!profileReq.value.fee) return true;
  if (!profileReq.value.areaId) return true;
  if (!profileReq.value.selfIntroduction) return true;

  // パスワード確認用が正しく入力されていなければ登録できない
  if(passChk.value == 'パスワードは一致していません') return true;

  // 自己紹介が500文字を超えていたら登録できない
  if (textTooLong.value) return true;

  // すべての条件が満たされていれば、falseを返す
  return false
}
)

const checkLength = () => {
  textTooLong.value = profileReq.value.selfIntroduction.length > 500;
}

const setFile =  (base64:String) => {
	profileImg.value = base64.split(',')[1];
}

const profileReq = ref<Profile>({
  id : 0,
  userAddress : 'aiueo@a.a',
  userName : '国テスト',
  userNameKana : 'くにテスト',
  userType : 1,
  password : 'kuniyama',
  debutYear : 1991,
  debutMonth : 2,
  memberNum : 4,
  gender : 2,
  officeId : 6,
  comedyStyleIdList : [1,2],
  feeType : 1,
  fee : 100,
  specialSkillIdList : [],
  anotherSkill : 'なし',
  areaId : 1,
  selfIntroduction : '自己紹介文です。',
  profileImg : ''
})

const passChk = computed(() => {
  if(password2.value == '') { return };
  return (profileReq.value.password == password2.value) ? 'パスワードは一致しています' : 'パスワードは一致していません'
})

const reg = async () => {
  http.post("/profile/register", profileReq)
  .then(() => {
  })
  .catch((error) => {
    // エラー発生時の処理
    console.log(error)
  })
  .finally(() => {
    // 正常終了・エラー問わず必ず行う処理
  });
}


onMounted(() => {
  if (Array.isArray(route.params.address)) {
    profileReq.value.userAddress = route.params.address[0].replace(/\+/g, ".") || '';
  } else {
    profileReq.value.userAddress = route.params.address.replace(/\+/g, ".") || '';
  }
})

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

.btn-submit:disabled {
  cursor: not-allowed;
}
</style>

