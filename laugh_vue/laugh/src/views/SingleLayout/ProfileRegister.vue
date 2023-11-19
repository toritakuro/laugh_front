<template>
  <v-container class="bakColor">
    <v-row justify="center" align-content="center">
      <ul class="step-box">
        <li class="step-1 done"><div class="step-num">１</div><div class="step-desc">アドレス登録</div></li>
        <li class="step-2 done"><div class="step-num">２</div><div class="step-desc">本人情報の入力</div></li>
        <li class="step-3"><div class="step-num">３</div><div class="step-desc">登録完了</div></li>
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
          <v-form>
            <v-radio-group v-model="profileReq.userType" inline :rules="[rules.radioVerify]">
              <v-radio
                label="芸人"
                value="1"
                color="orange"
              ></v-radio>
              <v-radio
                label="作家"
                value="2"
                color="orange"
              ></v-radio>
            </v-radio-group>
            <!-- 画像トリミング新規登録はここを見る -->
            <v-list-item-tile>プロフィール画像</v-list-item-tile>
            <v-col class="d-flex justify-center">
              <v-col class="profBox" cols="3">
                <input ref="file" @change="setImage" type="file" name="image" accept="image/*" style="display: none;">
                <div v-if="cropImg === ''" class="default profilePhoto" @click.prevent="showFileChooser">
                  <v-img
                    :aspect-ratio="1"
                    :src="src"
                    ></v-img>
                </div>
                <div v-if="cropImg !== ''" class="profilePhoto" @click.prevent="showFileChooser">
                  <v-img
                    :aspect-ratio="1"
                    :src="cropImg"
                    cover
                    class="rounded-lg"
                  ></v-img>
                </div>
                <ImageModalComponent :modelValue="modalFlg" :imgBase64="imgSrc" @update:modelValue="setModelValue" @update:imgValue="setImg"></ImageModalComponent>
              </v-col>
            </v-col>
            <!-- 画像トリミング -->
            <v-text-field
              v-model="profileReq.userAddress"
              label="メールアドレス"
              disabled
              density="compact"
            ></v-text-field>
            <!-- <div class="mail-box">
              <p class="mail-text">jjjj@gmail.com</p>
            </div> -->
            <v-text-field
              v-model="profileReq.password"
              :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
              :rules="[rules.required,rules.min]"
              :type="show1 ? 'text' : 'password'"
              label="パスワード ※入力必須"
              counter
              @click:append="show1 = !show1"
              density="compact"
            ></v-text-field>
            <v-text-field
              v-model="password2"
              :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
              :rules="[rules.required, rules.min, rules.matched]"
              :type="show2 ? 'text' : 'password'"
              label="【確認用】パスワード ※入力必須"
              counter
              @click:append="show2 = !show2"
              density="compact"
            ></v-text-field>
            <v-text-field
              v-model="profileReq.userName"
              label="活動名 ※入力必須"
              :rules="[rules.textVerify]"
              density="compact"
            ></v-text-field>
            <v-text-field
              v-model="profileReq.userNameKana"
              label="活動名（カナ） ※入力必須"
              :rules="[rules.textVerify]"
              density="compact"
            ></v-text-field>
            <v-col class="inp-month-box" cols="6">
              <v-list-item-tile>デビュー</v-list-item-tile>
              <div class="month-box">
                <input 
                  type="month"
                  v-model="profileReq.debutDtStr"
                  :rules="[rules.debutYearVerify]"
                />
              </div>
            </v-col>
            <v-col v-if="profileReq.userType == 1" class="d-flex justify-start">
              <v-text-field
                v-model="profileReq.memberNum"
                label="活動人数"
                :rules="[rules.textVerify]"
                density="compact"
              ></v-text-field>            
            </v-col>

            <v-list-item-tile>性別</v-list-item-tile>
            <v-radio-group inline v-model="profileReq.gender" :rules="[rules.radioVerify]">
              <v-radio
                label="回答なし"
                value="0"
                color="orange"
              ></v-radio>
              <v-radio
                label="男性"
                value="1"
                color="orange"
              ></v-radio>
              <v-radio
                label="女性"
                value="2"
                color="orange"
              ></v-radio>
              <v-radio
                label="男女"
                value="3"
                color="orange"
              ></v-radio>
            </v-radio-group>
            <v-select :items="officeRef" item-title="name" item-value="id" label="所属事務所" v-model="profileReq.officeId" density="compact"></v-select>

            <v-list-item-tile v-if="profileReq.userType == 1">芸風</v-list-item-tile>
            <v-list-item-tile v-if="profileReq.userType == 2">得意分野</v-list-item-tile>
            <v-col class="d-flex justify-start first_row" v-if="profileReq.userType == 1 || profileReq.userType == 2">
              <div class="chkW">
                <v-checkbox
                  v-model="profileReq.comedyStyleIdList"
                  label="漫才"
                  color="orange"
                  value="1"
                  density="compact"
                ></v-checkbox>
              </div>
              <div class="chkW">
                <v-checkbox
                  v-model="profileReq.comedyStyleIdList"
                  label="コント"
                  color="orange"
                  value="2"
                  density="compact"
                ></v-checkbox>
              </div>
              <div class="chkW">
                <v-checkbox
                  v-model="profileReq.comedyStyleIdList"
                  label="ギャグ"
                  color="orange"
                  value="3"
                  density="compact"
                ></v-checkbox>
              </div>
              <div class="chkW">
                <v-checkbox
                  v-model="profileReq.comedyStyleIdList"
                  label="モノマネ"
                  color="orange"
                  value="4"
                  density="compact"
                ></v-checkbox>
              </div>
            </v-col>
            <v-col class="d-flex justify-start second_row" v-if="profileReq.userType == 1 || profileReq.userType == 2" density="compact">
              <div class="chkW">
                <v-checkbox
                  v-model="profileReq.comedyStyleIdList"
                  label="歌ネタ"
                  color="orange"
                  value="5"
                  :rules="[rules.chkVerify]"
                  density="compact"
                ></v-checkbox>
              </div>
              <div class="chkW">
                <v-checkbox
                  v-model="profileReq.comedyStyleIdList"
                  label="リズムネタ"
                  color="orange"
                  value="6"
                  density="compact"
                ></v-checkbox>
              </div>
              <div class="chkW">
                <v-checkbox
                  v-model="profileReq.comedyStyleIdList"
                  label="その他"
                  color="orange"
                  value="7"
                  density="compact"
                ></v-checkbox>
              </div>
            </v-col>

            <v-col class="radio-box">
              <v-list-item-tile v-if="profileReq.userType == 2">料金体系</v-list-item-tile>
              <v-radio-group inline v-if="profileReq.userType == 2" v-model="profileReq.feeType" :rules="[rules.radioVerify]">
                <v-radio
                  label="時給"
                  value="1"
                  color="orange"
                ></v-radio>
                <v-radio
                  label="成果物による"
                  value="2"
                  color="orange"
                ></v-radio>
              </v-radio-group>
            </v-col>

            <v-col class="d-flex justify-start inp-box" cols="6">
              <v-text-field v-model="profileReq.fee" label="金額" class="input-number" suffix="円/時間" v-if="profileReq.userType == 2 && profileReq.feeType == 1" :rules="[rules.textVerify]" density="compact"></v-text-field>
              <v-text-field v-model="profileReq.fee" label="金額" class="input-number" suffix="円" v-if="profileReq.userType == 2 && profileReq.feeType == 2" :rules="[rules.textVerify]" density="compact"></v-text-field>
            </v-col>
            
            <v-list-item-tile v-if="profileReq.userType == 2">特技</v-list-item-tile>
            <v-col class="d-flex justify-start tokugi-box" v-if="profileReq.userType == 2">
              <v-col class="d-flex justify-start" cols="6">
              <v-checkbox
                v-model="profileReq.specialSkillIdList"
                label="動画編集"
                color="orange"
                value="1"
                hide-details
              ></v-checkbox>
              <v-checkbox
                v-model="profileReq.specialSkillIdList"
                label="イラスト制作"
                color="orange"
                value="2"
                hide-details
              ></v-checkbox>
              <v-checkbox
                v-model="profileReq.specialSkillIdList"
                label="音源制作"
                color="orange"
                value="3"
                hide-details
              ></v-checkbox>
              </v-col>
              <v-text-field
                v-model="profileReq.anotherSkill"
                label="その他の場合はここに入力"
                density="compact"
              ></v-text-field> 
            </v-col>

            <v-col class="sec-box">
              <v-select :items="areaRef" item-title="name" item-value="id" label="活動場所" v-model="profileReq.areaId" density="compact"></v-select>
            </v-col>

            <v-textarea 
              v-model="profileReq.selfIntroduction" 
              outlined 
              solo 
              name="input-7-4" 
              label="自己紹介" 
              :rules="[rules.max500]"
            ></v-textarea>
            <v-col class="d-flex justify-center">
              <v-col cols="5">
                <v-btn 
                  block 
                  class="mt-2" 
                  color="orange-darken-1"
                  @click="reg"
                >登　録</v-btn>
              </v-col>
            </v-col>
            <v-date-picker v-model="picker"></v-date-picker>
          </v-form>
        </v-card-text>
      </v-card>
    </v-row>
  </v-container>
  <v-dialog v-model="showModal" max-width="500px">
    <v-card>
      <v-card-title>登録できません。</v-card-title>
      <v-card-text>以下の原因が考えられるため、ご確認下さい。<br>
        ・必須項目が未入力である<br>
        ・パスワードと【確認用】パスワードが一致していない<br>
        ・パスワードや自己紹介が文字数制限を満たしていない
      </v-card-text>
      <v-card-actions>
        <v-btn color="blue darken-1" text @click="showModal = false">閉じる</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>

</template>

<script setup lang="ts">

onMounted(() => {
  if (Array.isArray(route.params.address)) {
    profileReq.value.userAddress = route.params.address[0].replace(/\+/g, ".") || '';
  } else {
    profileReq.value.userAddress = route.params.address.replace(/\+/g, ".") || '';
  }
})

// TypeScript が有効
import { ref, onMounted, computed, watch  } from 'vue'
import { useRouter, useRoute } from 'vue-router';
import http from "@/http-common";
import type Profile from "../../types/Profile";
import ImageModalComponent from "../../components/ImageModalComponent.vue"
import { offices } from "../../types/Office";
import { areas } from "../../types/Area";
import { years } from "../../types/Year";
import { months } from "../../types/Month";

const router = useRouter();
const route = useRoute();
const officeRef = ref(offices);
const areaRef = ref(areas);
const yearRef = ref(years);
const monthRef = ref(months);
const showModal = ref(false);

const show1 = ref(false);
const show2 = ref(false);
const password2 = ref('');
const picker = ref('');

const profileReq = ref<Profile>({
  id : null,
  userAddress : '',
  userName : '',
  userNameKana : '',
  userType : null,
  password : '',
  debutDtStr : '',
  debutMonth : null,
  memberNum : null,
  gender : null,
  officeId : null,
  comedyStyleIdList : [],
  feeType : null,
  fee : null,
  specialSkillIdList : [],
  anotherSkill : '',
  areaId : null,
  selfIntroduction : '',
  profileImgPath : ''
})

// 画像登録用
const modalFlg = ref(false)

/** base64に変換 */
const imgSrc = ref('');
const cropImg = ref('');
const file = ref();
const src = ref("/img/man.svg");
const setImage = (e: any) => {
  const file = e.target.files[0];
  if (!file.type.includes('image/')) {
    alert('画像ファイルを選んでください');
    return;
  }
  if (typeof FileReader === 'function') {
    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target != null) {
        imgSrc.value = event.target.result as string;
        // 画像の変更にはreplaceが必要らしい
        //cropper.value.replace(event.target.result);
      }
    };
    reader.readAsDataURL(file);
  } else {
    alert('FileReader APIがサポートされていません');
  }
  // 時差が必要みたい
  setTimeout(() => {
    console.log(11);
    modalFlg.value = true;
  }, 200);
};
/** emitで受けるメソッド */
const setModelValue = (value:Boolean) => {
  modalFlg.value = false;
  file.value.value ='' // 初期化
} 
const setImg = (img:string) => {
  cropImg.value = img;
  profileReq.value.profileImgPath = img;
} 
const showFileChooser = () => {
  file.value.click();
};

const reg = async () => {
  
  if(!isFormValid.value) {
    showModal.value = true;
    return;
  }
  console.log(profileReq.value)
  http.post("/profile/register", profileReq.value)
  .then(() => {
  })
  .catch((error) => {
    // エラー発生時の処理
    console.log(error)
  })
  .finally(() => {
    // 正常終了・エラー問わず必ず行う処理
  });
  router.push({ path: '/profile/register/completion' })
}


const isFormValid = computed(() => {
  const cmnValid = (profileReq.value.password == password2.value)
    && (profileReq.value.userName != '')
    && (profileReq.value.userNameKana != '')
    && (profileReq.value.userType != null)
    && (profileReq.value.password != '')
    && (profileReq.value.selfIntroduction.length <= 500);

  if (profileReq.value.userType == 1) {
    return cmnValid
      && (profileReq.value.memberNum != null)
      && (profileReq.value.gender != null)
      && (profileReq.value.debutDtStr != null)
  }

  if (profileReq.value.userType == 2) {
    return cmnValid
      && (profileReq.value.fee != null)
      && (profileReq.value.feeType != null);
  }

  return false;
}

)

// passwordバリデーションチェック
const rules = {
  matched: (v: any) => profileReq.value.password == password2.value || 'パスワードと確認用パスワードが異なります',
  required: (value: any) => !!value || 'パスワードを入力してください',
  min: (v: any) => v.length >= 8 || 'パスワードは8文字以上、入力してください',
  radioVerify: (value: any) => !!value || '必ず選択してください',
  textVerify: (value: any) => !!value || '必ず入力してください',
  debutYearVerify: (value: any) => !!value || '年月を入力してください',
  max500: (v: any) => v.length <= 500 || '500文字以内で入力してください',
  chkVerify: (v: any) => v.length > 0 || '必ずチェックを入れてください',
}

</script>

<style scoped>

::v-deep .input-number input {
  text-align: right;
  padding-right: 5px;
}

.profBox {
  border: solid 3px #cccccc;
  border-radius: 10px;
}
.bakColor {
  background-color: #F8F9FA; 
}

.chkW {
  width: 206px;
}

.subText {
  color: #f6f6f6;
  font-weight: bold;
}

.first_row {
  margin-top: 0px;
}

.second_row {
  margin-top: -40px;
}

.inp-box {
  margin-top: -20px;
  padding-left: 0px;
  padding-top: 0px;
  padding-right: 0px;
}

.sec-box {
  padding-left: 0px;
  padding-top: 0px;
  padding-right: 0px;
}

.tokugi-box {
  margin-top: -10px;
  padding-left: 0px;
  padding-top: 0px;
  padding-right: 0px;
}
.profileRegWrap {
  width: 900px;
}

.d-flex {
  padding-left: 0px;
  padding-top: 0px;
  padding-right: 0px;
}

.inp-month-box {
  padding-left: 0px;
  padding-top: 0px;
  padding-right: 0px;
}

.month-box > input {
  margin-top: 12px;
  padding: 11px;
}
.mail-box {
  margin-bottom: 22px;
}

.radio-box {
  margin-top: -10px;
  padding-left: 0px;
  padding-top: 0px;
  padding-right: 0px;
}

.mail-text {
  font-size: 24px;
  padding: 12px;
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