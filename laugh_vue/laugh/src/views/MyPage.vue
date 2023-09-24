<template>
<v-container fluid="true">
  <v-row>
    <v-col lg="3" md="3" sm="3" xs="3">
      <v-card width="100%">
      <template v-slot:title>
        <div class="text-right">
          <v-chip 
            :color="userType" 
            size="large"
            variant="outlined">
            芸人
          </v-chip>
        </div>
      </template>
      <v-card-text>
        <div>
          <v-img
            width="250"
            :aspect-ratio="1"
            src="https://cdn.vuetifyjs.com/images/parallax/material.jpg"
            cover
          ></v-img>
        </div>

      <table>
        <tbody>
          <tr>
            <td>活動名</td>
          </tr>
          <tr>
            <td>活動太郎</td>
          </tr>
          <tr>
            <td>活動形態</td>
          </tr>
          <tr>
            <td>漫才</td>
          </tr>
          <tr>
            <td>特殊スキル</td>
          </tr>
          <tr>
            <td>動画</td>
          </tr>
        </tbody>
      </table>
      </v-card-text>
      </v-card>
    </v-col>
    
    <v-col lg="8" md="8" sm="8" xs="8">
      
    <v-card>
      <v-tabs
        v-model="tab"
        bg-color="orange-darken-2"
        slider-color="orange-lighten-4"
      >
        <v-tab value="profile" @click="getProfile">Profile</v-tab>
        <v-tab value="laugh" @click="getLugh">Laugh</v-tab>
      </v-tabs>
      <v-card-text>
      <v-window v-model="tab">
        <v-window-item value="profile">
        <MyPageProfile ref="profileRef"></MyPageProfile>
        </v-window-item>
        <v-window-item value="laugh">
          <MyPageLaugh ref="laughRef"></MyPageLaugh>
        </v-window-item>
      </v-window>
    </v-card-text>
    </v-card>
    </v-col>
  </v-row>
</v-container>

</template>

<script setup lang="ts">
  import { ref } from 'vue';
  import MyPageProfile from '@/components/MyPageProfile.vue'
  import MyPageLaugh from '@/components/MyPageLaugh.vue'

  const laughRef = ref();
  const profileRef = ref();

  /** 子どものメソッドを実行 */
  const getLugh = () => {
    laughRef.value.getLaugh();
  }
  const getProfile = () => {
  profileRef.value.getProfile();
  }
  const tab = ref(null);
  const userType = ref("primary");
</script>

<style scoped>
  tr:nth-child(odd) td {
    font-weight: bold;
    font-size: 13px;
    height: 35px;
    padding-top: 14px;
  }
  tr:nth-child(even) td {
    padding-left: 5px;
  }
</style>