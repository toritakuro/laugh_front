<template>
  <div>
    <v-form>
      <p>新規登録</p>
      <div>
        <span>メアド※必須</span>
        <!-- <input type="text" v-model="userAddress" class="register-input" > -->
        {{ userAddress }}
      </div>
      <div>
        <span>活動名※必須</span>
        <input type="text" v-model="userName" class="register-input">
      </div>
      <div>
        <span>活動名(かな)※必須</span>
        <input type="text" v-model="userNameKana" class="register-input">
      </div>
      <div>
        <span>活動タイプ※必須</span>
        <input type="radio" id="composer" v-model="userType" value="1" class="ml-10">
        <label for="composer">作家</label>
        <input type="radio" id="comedian" v-model="userType" value="2">
        <label for="comedian">芸人</label>
      </div>
      <div>
        <span>パスワード※必須</span>
        <input type="password"  v-model="password" class="register-input">
      </div>
      <div>
        <span>活動開始年月※必須</span>
        <input type="num" v-model="debutYear" class="register-input-sm">年
        <input type="num" v-model="debutMonth" class="register-input-sm">月
      </div>
      <div v-if="userType == 2">
        <span>活動人数</span>
        <input type="number" v-model="memberNum" class="register-input">
      </div>
      <div>
        <span>性別</span>
        <input type="radio" id="unknown" v-model="gender" value="0" class="ml-10">
        <label for="unknown">回答なし</label>
        <input type="radio" id="man" v-model="gender" value="1">
        <label for="man">男性</label>
        <input type="radio" id="woman" v-model="gender" value="2">
        <label for="woman">女性</label>
        <input type="radio" id="manwoman" v-model="gender" value="3">
        <label for="manwoman">男女</label>
      </div>
      <div>
        <span>事務所</span>
        <select v-model="officeId" class="register-input">
          <option value="1">ませき</option>
          <option value="2">よしもと</option>
          <option value="3">その他</option>
        </select>
      </div>
      <div>
        <span>得意分野</span>
        <input type="checkbox" id="manzai" v-model="comedyStyleIdList" value="1" class="ml-10">
        <label for="manzai">まんざい</label>
        <input type="checkbox" id="comte" v-model="comedyStyleIdList" value="2">
        <label for="comte">こんと</label>
        <input type="checkbox" id="other" v-model="comedyStyleIdList" value="3">
        <label for="other">その他</label>
      </div>
      <div v-if="userType == 1">
        <span>料金体系※作家必須</span>
        <input type="number" v-model="feeType" class="ml-10">
      </div>
      <div v-if="userType == 1">
        <span>金額※作家必須</span>
        <input type="number" v-model="fee" class="ml-10">
      </div>
      <div v-if="userType == 2">
        <span>特殊スキル</span>
        <input type="checkbox" id="movie" v-model="specialSkillIdList" value="1" class="ml-10">
        <label for="movie">動画編集</label>
        <input type="checkbox" id="design" v-model="specialSkillIdList" value="2">
        <label for="design">デザイン</label>
        <input type="checkbox" id="other_skill" v-model="specialSkillIdList" value="3">
        <label for="other_skill">その他</label>
        <input type="text" v-model="anotherSkill" class="register-input" placeholder="その他の内容記載して">
      </div>
      <div>
        <span>活動場所</span>
        <select v-model="areaId" class="register-input">
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
      </div>
      <div>
        <span>自己紹介</span>
        <input type="textarea" v-model="selfIntroduction" class="register-input">
      </div>
      <div>
        <span>画像</span>
        <!-- <input type="file" @change="onFileChange"> -->
        <!-- <v-file-input label="File input"></v-file-input> -->
        <ImgFileComponent @set-file="setFile"/>
      </div>

      <v-btn @click="reg" depressed color="primary">登録</v-btn>
    </v-form>
  </div>

</template>

<style>
.register-input {
  border:2px solid black;
  margin-left: 50px;
}
.register-input-sm {
  border:2px solid black;
  width:80px;
  margin-left: 30px;
}
</style>

<script setup lang="ts">
// TypeScript が有効
import axios from "axios";
import { ref, onMounted } from 'vue'
import ProfileService from '@/services/ProfileService';
import type ResponseData from "@/types/ResponseData";
import { useRouter, useRoute  } from 'vue-router';
import ImgFileComponent from '../components/ImgFileComponent.vue'

// const router = useRoute();
const router = useRouter();
const route = useRoute();

const userAddress = ref('');
const userName = ref('国山');
const userNameKana = ref('くにやま');
const userType = ref(1);
const password = ref('kuniyama');
//const debutDt = ref('2023-07-12');
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
const profileImgPath = ref();

const onFileChange = (e:any) => {
  profileImgPath.value = e.target.files[0];
}

const setFile =  (base64:String) => {
  // console.log(base64);
  profileImgPath.value = base64.split(',')[1];
}

const reg = async () => {
  // オブジェクトで置き換えたい
  let data = {
    userType: userType.value,
    userAddress: userAddress.value,
    password: password.value,
    userName: userName.value,
    userNameKana: userNameKana.value,
    //debutDt: debutDt.value,
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
    profileImgPath: profileImgPath.value
  };
  console.log(data);
  ProfileService.create(data).then((response: ResponseData) => {
    
  });
  // router.push("/demo");
}

onMounted(() => {
  if (Array.isArray(route.params.address)) {
    userAddress.value = route.params.address[0] || '';
  } else {
    userAddress.value = route.params.address || '';
  }
})



</script>