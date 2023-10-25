<template>
    <v-container fluid>
      <v-row class="topWrap">
        <v-col class="regWrap overflow-auto rounded">
          <div class="float-btn">
          <v-btn color="orange-darken-1" size="default" @click="updProfile">更新</v-btn>
          </div>
          <v-form @submit.prevent>
            <v-container>
              <v-row>
                <v-col lg="5" class="pt-0 pb-0 pl-0">
                  <v-text-field
                    v-model="userRef.userName"
                    label="活動名"
                    density="compact"
                  ></v-text-field>
                </v-col>
                <v-col lg="6" class="ml-2 pt-0 pb-0 pl-0">
                <v-text-field
                  v-model="userRef.userNameKana"
                  label="活動名（カナ）"
                  density="compact"
                ></v-text-field>
                </v-col>
              </v-row>
              <!-- 結成 -->
              <v-row>
                <v-col class="pt-0 pb-0 pl-0">
                  <div class="label-color mb-3">デビュー</div>
                </v-col>
              </v-row>
              <v-row>
                <v-col class="pt-0">
                  <input type="month" name="test" v-model="userRef.debutDtStr">
                </v-col>
              </v-row>
              <!-- 性別 -->
              <v-row>
                <v-col class="pt-0 pb-0 pl-0">
                  <div class="label-color mb-3"><span>性別</span></div>
                </v-col>
              </v-row>
              <v-row dense="true">
                <v-col class="pa-0">
                  <v-radio-group inline hide-details v-model="userRef.gender">
                    <v-radio
                    label="回答なし"
                    :value="0"
                    color="orange-darken-2"
                  ></v-radio>
                    <v-radio
                    label="男性"
                    :value="1"
                    color="orange-darken-2"
                  ></v-radio>
                  <v-radio
                    label="女性"
                    :value="2"
                    color="orange-darken-2"
                  ></v-radio>
                  <v-radio
                    label="男女"
                    :value="3"
                    color="orange-darken-2"
                  ></v-radio>
                  </v-radio-group>
                </v-col>
              </v-row>
              <!-- 所属 -->
              <v-row>
                <v-col class="mt-1 pt-0 pb-0 pl-0">
                  <v-select
                    v-model="userRef.officeId"
                    label="所属事務所"
                    :items="office"
                    item-value="id"
                    item-title="name"
                    density="compact"
                  ></v-select>
                </v-col>
              </v-row>
              <!-- 芸風/得意分野-->
              <v-row>
                <v-col class="pt-0 pb-0 pl-0">
                  <div class="label-color mb-3"><span v-show="isComedian">芸風</span><span v-show="isComposer">得意分野</span></div>
                </v-col>
              </v-row>
              <v-row class="pl-1"  dense="true">
                <!-- 一組目 -->
                <v-col lg="3" md="12">
                  <v-row dense="true">
                    <v-col lg="6" md="12" class="pa-0" >
                      <v-checkbox
                        v-model="userRef.comedyStyleIdList"
                        label="漫才"
                        color="orange-darken-2"
                        density="compact"
                        :value="1"
                        hide-details
                      ></v-checkbox>
                    </v-col>
                    <v-col lg="6" md="12" class="pa-0">
                      <v-checkbox
                        v-model="userRef.comedyStyleIdList"
                        label="ピン"
                        color="orange-darken-2"
                        density="compact"
                        :value="2"
                        hide-details
                      ></v-checkbox>
                    </v-col>
                  </v-row>
                </v-col>

                <!-- 二組目 -->
                <v-col lg="3" md="12" class="pl-1">
                  <v-row dense="true">
                    <v-col lg="6" sm="12" class="pa-0">
                      <v-checkbox
                        v-model="userRef.comedyStyleIdList"
                        label="コント"
                        color="orange-darken-2"
                        density="compact"
                        :value="3"
                        hide-details
                      ></v-checkbox>
                    </v-col>
                    <v-col lg="6" sm="12" class="pa-0">
                      <v-checkbox
                        v-model="userRef.comedyStyleIdList"
                        label="ギャグ"
                        color="orange-darken-2"
                        density="compact"
                        :value="4"
                        hide-details
                      ></v-checkbox>
                    </v-col>
                  </v-row>
                </v-col>

                <!-- 三組目 -->
                <v-col lg="3" class="pl-1">
                  <v-row dense="true"><!--   -->
                    <v-col lg="6" sm="12" class="pa-0 ml-2">
                      <v-checkbox
                        v-model="userRef.comedyStyleIdList"
                        label="歌ネタ"
                        color="orange-darken-2"
                        density="compact"
                        :value="6"
                        hide-details
                      ></v-checkbox>
                    </v-col><!--   -->
                    <v-col lg="5" sm="12" class="pa-0 ml-1">
                      <v-checkbox
                        v-model="userRef.comedyStyleIdList"
                        label="漫談"
                        color="orange-darken-2"
                        density="compact"
                        :value="8"
                      ></v-checkbox>
                    </v-col>
                  </v-row>       
                </v-col>
                <v-col lg="3" md="12" class="pl-1">
                  <v-row dense="true">
                    <v-col lg="7" offset-lg="1" sm="12" class="pa-0">
                      <v-checkbox
                        v-model="userRef.comedyStyleIdList"
                        label="モノマネ"
                        color="orange-darken-2"
                        density="compact"
                        :value="5"
                      ></v-checkbox>
                    </v-col>
                  </v-row>                  
                </v-col>
                <v-col lg="3" sm="12" class="pl-1" >
                  <v-row dense="true" class="dense1">
                    <v-col lg="11" sm="12" class="pa-0">
                      <v-checkbox
                        v-model="userRef.comedyStyleIdList"
                        label="リズムネタ"
                        color="orange-darken-2"
                        density="compact"
                        :value="7"
                      ></v-checkbox>
                    </v-col>
                  </v-row>                  
                </v-col>
              </v-row>
              <v-row v-show="isComposer">
                <v-col class="pt-0 pb-0 pl-0">
                  <div class="label-color mb-3" ><span>金額</span></div>
                </v-col>
              </v-row>
              <v-row dense="true" v-show="isComposer">
                <v-col class="pa-0" lg="4">
                  <v-radio-group inline hide-details v-model="userRef.feeType">
                    <v-radio
                    class="mr-1"
                    label="時給"
                    :value="1"
                    color="orange-darken-2"
                  ></v-radio>
                    <v-radio
                    label="成果物"
                    :value="2"
                    color="orange-darken-2"
                  ></v-radio>
                  </v-radio-group>
                </v-col>
              </v-row>
              <v-row dense="true" v-show="isComposer">
                <v-col class="pa-0" lg="3">
                  <v-text-field
                    class="input-number ml-4 mt-1"
                    v-model="userRef.fee"
                    :label="feeLabel"
                    :suffix="feeSuffix"
                    density="compact"
                  ></v-text-field>
                </v-col>
              </v-row>
              <!-- 特技 -->
              <v-row v-show="isComposer">
                <v-col class="pt-0 pb-0 pl-0">
                  <div class="label-color mb-3" ><span>特技</span></div>
                </v-col>
              </v-row>
              <v-row class="pl-1" v-show="isComposer" dense="true">
                <v-col lg="12" md="12" class="pa-0">
                  <v-row dense="true">
                    <v-col lg="2" md="12">
                      <v-checkbox
                        v-model="userRef.specialSkillIdList"
                        label="動画編集"
                        color="orange-darken-2"
                        density="compact"
                        :value="1"
                        hide-details
                      ></v-checkbox>
                    </v-col>
                    <v-col lg="2" md="12" class="pl-0 pr-0">
                      <v-checkbox
                        v-model="userRef.specialSkillIdList"
                        label="イラスト"
                        color="orange-darken-2"
                        density="compact"
                        :value="2"
                        hide-details
                      ></v-checkbox>
                    </v-col>
                    <v-col lg="2" md="12" class="pl-0 pr-0">
                      <v-checkbox
                        v-model="userRef.specialSkillIdList"
                        label="音源作成"
                        color="orange-darken-2"
                        density="compact"
                        :value="3"
                        hide-details
                      ></v-checkbox>
                    </v-col>
                    <v-col lg="6" md="12" class="pa-0">
                      <v-text-field
                        v-model="userRef.anotherSkill"
                        label="その他の場合はここに入力"
                        density="compact"
                      ></v-text-field> 
                    </v-col>
                  </v-row>
                </v-col>
              </v-row>
              <!-- 活動場所 -->
              <v-row>
                <v-col class="pt-0 pb-0 pl-0">
                  <v-select
                    v-model="userRef.areaId"
                    density="compact"
                    label="活動場所"
                    :items="area"
                    item-value="id"
                    item-title="name"
                  ></v-select>
                </v-col>
              </v-row>
              <!-- 自己紹介 -->
              <v-row>
                <v-col class="pt-0 pb-0 pl-0">
                  <v-textarea
                    name="input-7-1"
                    variant="filled"
                    label="自己紹介文"
                    auto-grow
                    v-model="userRef.selfIntroduction"
                  ></v-textarea>
                </v-col>
              </v-row>
            </v-container>
          </v-form>
        </v-col>          
      </v-row>
    </v-container>
</template>

<style scoped>
.regWrap {
  border: 1px solid #efefef;
  height: 70vh;
  
}
.topWrap {
  position: relative;
}
.float-btn {
  position: absolute;
  top: 5px;
  right: 20px;
  z-index: 100;
}
.dense1 {
  margin-top: -30px;
}
::v-deep .input-number input {
  text-align: right;
  padding-right: 5px;
}
</style>


<script setup lang="ts">
import { computed, ref } from 'vue';
import http from "@/http-common";
import type Master from "@/types/Master";
import type User from '@/types/User';
import { useStore } from 'vuex';

const store = useStore();
const userRef = ref<User>({});
const office = ref<Master[]>([]);
const area = ref<Master[]>([]);


const isComedian = computed(() => userRef.value.userType == 1);
const isComposer = computed(() => userRef.value.userType == 2);
const feeLabel = computed(() => (userRef.value.feeType == 1) ? '時給' : '成果物');
const feeSuffix = computed(() => (userRef.value.feeType == 1) ? '円/時間' : '円');

const updProfile = async () => {
  await http.post('/profile/edit', userRef.value)
}


const getProfile = async () => {
  office.value =  (await http.get('/master/office')).data.data;
  area.value =  (await http.get('/master/area')).data.data;

  const {data } = await http.get('/mypage',{
      params: {
        userId: store.state.user.userId,
        userType: store.state.user.userType 
      }}
    );
    userRef.value = data.data;
}

const getMaster = async () => {
  office.value =  (await http.get('/master/office')).data.data;
  area.value =  (await http.get('/master/area')).data.data;
}

defineExpose({
  getProfile,
})
</script>