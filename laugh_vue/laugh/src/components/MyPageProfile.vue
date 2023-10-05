<template>
  <!-- <v-form v-model="valid"> -->
    <v-container fluid>
      <v-row justify="lefft">
        <v-col cols="6">
          <v-form @submit.prevent>
          <v-text-field
          v-model="email"
          label="メールアドレス"
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
            v-model="gropNameKana"
            label="活動名"
            ></v-text-field>
            <v-text-field
            v-model="gropNameKana"
            label="活動名（カナ）"
            ></v-text-field>
            <v-textarea
            name="input-7-1"
            variant="filled"
            label="自己紹介文"
            auto-grow
            model-value="　　"
            ></v-textarea>
            <v-card-subtitle class="text-subtitle-1">活動開始年月</v-card-subtitle>
              <div class="d-flex flex-row">
                <v-sheet class="py-2 w-100">
                  <v-select
                    label="年"
                    :items="['','下限なし', '1,000円', '2,000円', '3,000円', '4,000円', '5,000円', '6,000円', '7,000円', '8,000円', '9,000円', '10,000円']"
                  ></v-select>
                </v-sheet>
              <v-sheet class="mb-4 align-self-center"><span class="search-ttl-span">～</span></v-sheet>
              <v-sheet class="py-2 w-100">
                <v-select
                  label="月"
                  :items="['','1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']"
                ></v-select>
              </v-sheet>
              </div>
              <v-card-subtitle class="text-subtitle-1 py-2">活動形態</v-card-subtitle>
                <v-select
                  label=""
                  :items="['','北海道','東北','関東','中部','近畿','中国・四国','九州']"
                ></v-select>
                <v-radio-group v-model="row" inline>
                  <v-radio
                    label="男"
                    value="man"
                    color="orange"
                  ></v-radio>
                  <v-radio
                    label="女"
                    value="weman"
                    color="orange"
                  ></v-radio>
                  <v-radio
                    label="男女"
                    value="man-weman"
                    color="orange"
                  ></v-radio>
                </v-radio-group>
              <v-card-subtitle class="text-subtitle-1 py-2">所属事務所</v-card-subtitle>
                <v-select
                  label=""
                  :items="['','吉本興業','人力舎','マセキ芸能社','松竹芸能', 'その他']"
                ></v-select>
              <v-card-subtitle class="text-subtitle-1 py-2">芸風の種類</v-card-subtitle>
                <v-select
                  label=""
                  :items="['','漫才','ピン','コント','モノマネ','歌ネタ','リズムネタ','その他']"
                ></v-select>
              <v-card-subtitle class="text-subtitle-1 py-2">得意分野</v-card-subtitle>
                <v-select
                  label=""
                  :items="['','漫才','ピン','コント','モノマネ','歌ネタ','リズムネタ','その他']"
                ></v-select>
                <v-radio-group v-model="row" inline>
                  <v-radio
                    label="出来高"
                    value="man"
                    color="orange"
                  ></v-radio>
                  <v-radio
                    label="時給"
                    value="weman"
                    color="orange"
                  ></v-radio>
                </v-radio-group>
              <v-card-subtitle class="text-subtitle-1 py-2">料金</v-card-subtitle>
                <v-select
                  label=""
                  :items="['','1,000円','2,000円','3,000円','4,000円','5,000円','6,000円','7,000円', '8,000円', '9,000円', '10,000円']"
                ></v-select>
              <v-card-subtitle class="text-subtitle-1">特殊スキル</v-card-subtitle>
                <v-checkbox
                  density="compact"
                  hide-details="true"
                  label="動画編集"
                  value="Unspecified">
                </v-checkbox>
                <v-checkbox
                  density="compact"
                  hide-details="true"
                  label="イラスト"
                  value="Unspecified">
                </v-checkbox>
                <v-checkbox
                  density="compact"
                  hide-details="true"
                  label="音源制作"
                  value="Unspecified">
                </v-checkbox>
                <v-checkbox
                  density="compact"
                  hide-details="true"
                  label="その他"
                  value="Unspecified">
                </v-checkbox>
              <v-card-subtitle class="text-subtitle-1 py-2">活動場所</v-card-subtitle>
                <v-select
                  label=""
                  :items="['','北海道','東北','関東','中部','近畿','中国・四国','九州']"
                ></v-select>
                <v-btn 
                type="submit" 
                block 
                class="mt-2 submit-btn" 
                color="orange-darken-1 #FB8C00"
                >登録</v-btn>
          </v-form>
        </v-col>          
      </v-row>
    </v-container>
</template>

<style scoped>


</style>


<script setup lang="ts">


</script>