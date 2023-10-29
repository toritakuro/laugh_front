<template>
    <v-container fluid="true">
      <v-row justify="center">
        <v-col cols="6">
          <h1 class="pa-2 pt-0 qa-title">サイトについて</h1>
          <v-card class="mx-auto qa-box">
            <div class="question pa-3"><v-icon icon="mdi mdi-alpha-q-circle" class="pr-3"/>Laughとはどんなサイトですか？</div>
            <div class="anser pl-11 pa-3 pb-0">作家と芸人をつなぐマッチングサイトです。</div>
            <div class="anser pl-11 pa-3 pt-0">"Laugh"ボタンを押すと相手にLaughが送信され、相手がそれを笑認するとマッチング完了となります。</div>
          </v-card>
          <h1 class="pa-2 qa-title">機能について</h1>
          <v-card class="mx-auto qa-box">
            <div class="question pa-3"><v-icon icon="mdi mdi-alpha-q-circle" class="pr-3"/>LaughとSuper Laughの違いは何ですか？</div>
            <div class="anser pl-11 pa-3">Laughは相手の笑認を得てからマッチングするのに対し、Super Laughは相手の笑認なしで強制マッチングする機能のことです。</div>
          </v-card>
          <v-card class="mx-auto qa-box mt-4">
            <div class="question pa-3"><v-icon icon="mdi mdi-alpha-q-circle" class="pr-3"/>Laugh(ボタン)に制限はありますか？</div>
            <div class="anser pl-11 pa-3">ございません。無制限です。</div>
          </v-card>
          <v-card class="mx-auto qa-box mt-4">
            <div class="question pa-3"><v-icon icon="mdi mdi-alpha-q-circle" class="pr-3"/>Laughを解除するとどうなりますか？</div>
            <div class="anser pl-11 pa-3">マッチングが解消され、検索対象からも外れます。</div>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
</template>

<style scoped>
.qa-title {
  font-size: 26px;
  text-align: center;
}
.qa-box {
  font-size: 20px;
  border-radius: 12px;
}
.question {
  background-color: #FB8C00;
  color: #FFF;
  font-weight: bold;
}

</style>

<script setup lang="ts">

</script>