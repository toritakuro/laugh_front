<template>
  <v-container>
    <v-row justify="center" align-content="center">
      <ul class="step-box">
        <li class="step-1 done"><div class="step-num">１</div><div class="step-desc">会員登録</div></li>
        <li class="step-2 done"><div class="step-num">２</div><div class="step-desc">本人情報の入力</div></li>
        <li class="step-3"><div class="step-num">３</div><div class="step-desc">本人認証</div></li>
      </ul>
    </v-row>
    <v-row>
      <v-card
        class="mx-auto profileRegWrap"
        prepend-icon="mdi-home"
      >
        <template v-slot:title>
          新規登録
        </template>

        <v-card-text>
          <v-form @submit.prevent>
            <v-text-field
              v-model="email"
              label="メールアドレス"
              disabled
            ></v-text-field>
            <!-- <div class="mail-box">
              <p class="mail-text">jjjj@gmail.com</p>
            </div> -->
            <v-text-field
              v-model="password1"
              :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
              :rules="[rules.required,rules.min]"
              :type="show1 ? 'text' : 'password'"
              label="パスワード"
              counter
              @click:append="show1 = !show1"
            ></v-text-field>
            <v-text-field
              v-model="password2"
              :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
              :rules="[rules.required, rules.min, rules.matched]"
              :type="show2 ? 'text' : 'password'"
              label="【確認用】パスワード"
              counter
              @click:append="show2 = !show2"
            ></v-text-field>
            <v-radio-group v-model="row" inline>
              <v-radio
                label="作家"
                value="sakka"
                color="orange"
              ></v-radio>
              <v-radio
                label="芸人"
                value="geinin"
                color="orange"
              ></v-radio>
            </v-radio-group>
            <v-text-field
              v-model="gropName"
              label="活動名"
            ></v-text-field>
            <v-text-field
              v-model="gropNameKana"
              label="活動名（カナ）"
            ></v-text-field>            
            <v-radio-group v-model="sei" inline>
              <v-radio
                label="回答なし"
                value="seiNull"
                color="orange"
              ></v-radio>
              <v-radio
                label="男性"
                value="man"
                color="orange"
              ></v-radio>
              <v-radio
                label="女性"
                value="woman"
                color="orange"
              ></v-radio>
              <v-radio
                label="男女"
                value="ManMoman"
                color="orange"
              ></v-radio>
            </v-radio-group>
            <v-select :items="geininsakka" label="所属事務所"></v-select>
            <v-col class="d-flex justify-start">
              <v-checkbox
                v-model="tokuibunya"
                label="漫才"
                color="orange"
                value="manzai"
                hide-details
              ></v-checkbox>
              <v-checkbox
                v-model="tokuibunya"
                label="ピン"
                color="orange"
                value="pin"
                hide-details
              ></v-checkbox>
              <v-checkbox
                v-model="tokuibunya"
                label="コント"
                color="orange"
                value="konto"
                hide-details
              ></v-checkbox>
              <v-checkbox
                v-model="tokuibunya"
                label="ギャグ"
                color="orange"
                value="gyagu"
                hide-details
              ></v-checkbox>
              <v-checkbox
                v-model="tokuibunya"
                label="モノマネ"
                color="orange"
                value="monomane"
                hide-details
              ></v-checkbox>
              <v-checkbox
                v-model="tokuibunya"
                label="歌ネタ"
                color="orange"
                value="utaneta"
                hide-details
              ></v-checkbox>
              <v-checkbox
                v-model="tokuibunya"
                label="リズムネタ"
                color="orange"
                value="rizumuneta"
                hide-details
              ></v-checkbox>
              <v-checkbox
                v-model="tokuibunya"
                label="その他"
                color="orange"
                value="sonota"
                hide-details
              ></v-checkbox>
            </v-col>
            <v-select :items="tihou" label="活動場所"></v-select>
            <v-textarea 
              v-model="selfIntroduction" 
              outlined 
              solo 
              name="input-7-4" 
              label="自己紹介" 
            ></v-textarea>
            <img v-if="uploadImageUrl" :src="uploadImageUrl" />
            <v-file-input
              v-model="input_image"
              accept="image/*"
              label="画像ファイルをアップロードしてください"
              prepend-icon="mdi-image"
              @change="onImagePicked"
            ></v-file-input>
            <div>{{ input_image }}</div>
            <v-btn 
              type="submit" 
              block 
              class="mt-2" 
              color="orange" 
            >送信</v-btn>
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
// test.value = "aiueo";
const test2 = ref(['aa']);

const geininsakka = ref(['アヴィラ', '浅井企画', 'ASH&Dコーポレーション', 'アミー・パーク', 'UMEDA芸能', 'FMG', 'MLクリエーション', '大川興業', '太田プロダクション', 'オフィス北野', 'オリジン・コーポレーション'
                   , 'お笑い集団ティーライズ', 'グレープカンパニー', 'ケイダッシュステージ', 'K-PRO', 'ザ・森東', 'サンミュージックプロダクション', 'SHUプロモーション', '松竹芸能', 'スパンキープロダクション'
                   , 'ソニー・ミュージックアーティスツ', 'タイタン', 'トゥインクル・コーポレーション', '徳間ジャパンコミュニケーションズ', 'どっかんプロ', 'トップ・カラー', 'ナチュラルエイト', 'ニュースタッフプロダクション'
                   , 'ノーリーズン', 'ファインステージ', 'プロダクション人力舎', 'プロデューサーハウスあ・うん', 'ホリプロ', 'ホリプロコム', 'マセキ芸能社', '三木プロダクション', '吉本興業', 'ワタナベエンターテインメント'
                   , 'ワハハ本舗', '無所属']);
const tihou = ref(['北海道', '東北', '関東', '北陸甲信越', '中部', '関西', '中国', '四国', '九州']);

const show1 = ref(false);
const show2 = ref(false);
const password1 = ref('');
const password2 = ref('');
const row = ref(null);
const sei = ref(null);
const tokuibunya = ref([]);
const selfIntroduction = ref('');
const gropName = ref('');
const gropNameKana = ref('');
const email = ref('jjj@gmail.com');

// passwordバリデーションチェック
const rules = {
  matched: v => password1.value == password2.value || 'パスワードと確認用パスワードが異なります',
  required: value => !!value || 'パスワードを入力してください',
  min: v => v.length >= 8 || 'パスワードは8文字以上、入力してください',
}

// 画像のアップロード
const input_image = ref(null);
const uploadImageUrl = ref('');

// const methods = {
//   onImagePicked(file) {
//       if (file !== undefined && file !== null) {
//         if (file.name.lastIndexOf('.') <= 0) {
//           return
//         }
//         const fr = new FileReader()
//         fr.readAsDataURL(file)
//         fr.addEventListener('load', () => {
//           this.uploadImageUrl.value = fr.result
//         })
//       } else {
//         this.uploadImageUrl.value = ''
//       }
//     }
// };

// if ((password1.value).length == 0 ) {
//   relative1.value = "パスワードを入力してください";
// }

// const rules = ref(
//   const required1 = ref('');
//   const min1 = ref('');
//   if ((password1.value).length == 0 ) {
//     relative1.value = "パスワードを入力してください";
//   }
//   if ((password1.value).length < 8 ) {
//     min1.value = "パスワードは8文字以上、入力してください";
//   }
// );

// if ((password1.value).length < 8) {
//   min1 = "パスワードは8文字以上、入力してください";
// }
// -------------------------------

// data: () => ({
//       geininsakka: ['アヴィラ', '浅井企画', 'ASH&Dコーポレーション', 'アミー・パーク', 'UMEDA芸能', 'FMG', 'MLクリエーション', '大川興業', '太田プロダクション', 'オフィス北野', 'オリジン・コーポレーション'
//                   , 'お笑い集団ティーライズ', 'グレープカンパニー', 'ケイダッシュステージ', 'K-PRO', 'ザ・森東', 'サンミュージックプロダクション', 'SHUプロモーション', '松竹芸能', 'スパンキープロダクション'
//                   , 'ソニー・ミュージックアーティスツ', 'タイタン', 'トゥインクル・コーポレーション', '徳間ジャパンコミュニケーションズ', 'どっかんプロ', 'トップ・カラー', 'ナチュラルエイト', 'ニュースタッフプロダクション'
//                   , 'ノーリーズン', 'ファインステージ', 'プロダクション人力舎', 'プロデューサーハウスあ・うん', 'ホリプロ', 'ホリプロコム', 'マセキ芸能社', '三木プロダクション', '吉本興業', 'ワタナベエンターテインメント'
//                   , 'ワハハ本舗', '無所属'],
//                   tihou: ['北海道', '東北', '関東', '北陸甲信越', '中部', '関西', '中国', '四国', '九州'],
//       show1: false,
//       show2: false,
//       password1: '',
//       password2: '',
//       rules: {
//           required: value => !!value || 'パスワードを入力してください',
//           min: v => v.length >= 8 || 'パスワードは8文字以上、入力してください',
//           matched: 
//         },
//     }),


// //画像のアップロード
</script>

<style scoped>

.profileRegWrap {
  width: 900px;
}

.d-flex {
  padding-left: 0px;
  padding-top: 0px;
  padding-right: 0px;
}

.mail-box {
  margin-bottom: 22px;
}

.mail-text {
  font-size: 24px;
  padding: 12px;
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
