<template>
  <v-app id="inspire">

    <v-main>
      <v-container
        class="py-8 px-6"
        style="width: 80%;"
        fluid
      >
        <v-row>
          <v-col
            v-for="(item, i) in oogiri"
            :key="i"
            cols="12"
          >
            <v-card>
              <v-list style="padding: 0;" lines="two">
                <!-- お題 -->
                <v-tabs bg-color="orange-darken-2">
                  <div class="d-flex align-center">
                    <v-card-title>{{ item.themeContent }}</v-card-title>
                    <v-card-subtitle>{{ item.themeUserName }}</v-card-subtitle>
                  </div>
                </v-tabs>

                <template v-for="(answer, i) in item.answers" :key="answer.answerId">
                  <v-list-item>
                    <!-- アイコン -->
                      <template v-slot:prepend>
                        <v-avatar color="grey-darken-1">aaa</v-avatar>
                      </template>
                      <!-- 回答情報 -->
                      <div class="d-flex align-center justify-space-between mb-1">
                        <v-list-item-title style="white-space: unset">{{ answer.answerContent }}</v-list-item-title>
                        <v-btn class="ma-1" :disabled="isUserAnswer(answer)" size="x-small" icon @click="reaction(answer)">
                          <v-icon :color="isReacted(answer) ? 'orange' : 'grey'" size="large">mdi-emoticon-lol-outline</v-icon>
                          <p>{{ countReactionsWithStatus(answer.reactions, 11) }}</p>
                        </v-btn>
                      </div>
                      <div class="d-flex align-center justify-end">
                        <v-list-item-subtitle>{{ answer.answerUserName }}</v-list-item-subtitle>
                      </div>
                      <div class="d-flex align-center justify-end">
                        <v-btn class="deleteBtn align-center justify-space-end ma-2" :color="'#F5F5F5'" v-if="isUserAnswer(answer)" @click="answer.dialog = true" size="x-small">削除</v-btn>
                      </div>
                  </v-list-item>
                  <v-divider thickness="2px" color="orange-darken-1" class="mr-2"
                    v-if="i !== item.answers.length -1"
                    :key="`divider-${answer.answerId}`"
                    inset
                  ></v-divider>
                  <!-- 削除モーダル -->
                  <v-dialog
                    v-model="answer.dialog"
                    width="auto"
                  >
                  <v-card>
                    <v-card-text style="background-color: #f57c00; color: white;">
                      この回答を削除します。よろしいですか？
                    </v-card-text>
                    <v-card-actions class="justify-center d-flex">
                      <v-btn color="'#F5F5F5'" @click="answer.dialog = false">閉じる</v-btn>
                      <v-btn color="orange" @click=deleteAnswer(answer)>削除する</v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
                </template>
              </v-list>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
      <!-- 新規回答 -->
      <v-row justify="center">
        <v-col cols="12" sm="6" class="d-flex align-center justify-center">
          <v-textarea v-model="newAnswer" label="新規回答" variant="solo-filled" class="ma-2" :counter="100" :maxlength="100"></v-textarea>
          <v-btn @click="regAnswer" :disabled="!isInputValid">送信</v-btn>
        </v-col>
      </v-row>
    </v-main>
  </v-app>
</template>


<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { useRoute } from 'vue-router';
import type Oogiri from "@/types/Oogiri";
import http from "@/http-common";
import { useStore } from 'vuex'

const oogiri = ref<Oogiri[]>([]);
const newAnswer = ref('');
const route = useRoute();
const store = useStore();
const userId = store.getters['user/getUserId']; 

// 大喜利詳細取得
const getOogiriDetail = async () => {
  const themeId = route.query.themeId;
  const {data} = await http.get('oogiri/detail',{
    params: {
      themeId: themeId
    }}
  )
  oogiri.value = [data.data];
}

// 各回答モーダルを非表示に
oogiri.value.forEach(item => {
  item.answers.forEach(answer => {
    answer.dialog = false;
  });
});

// ユーザーの回答かどうかを判定する
const isUserAnswer = (answer) => {
    return answer.answerUserId === userId;
}

// 回答を削除する
const deleteAnswer = async (answer) => {
  const answerId = answer.answerId;
  await http.post('oogiri/answer/delete', {
    answerId: answerId
  });
  answer.dialog = false;
  getOogiriDetail();
}

// 空文字チェック
const isInputValid = computed(() => {
  return newAnswer.value.trim() !== '';
})

// ステータスごとのリアクション数を集計する
const countReactionsWithStatus = (reactions, status) => {
      return reactions.filter(reaction => reaction.reactionStatus === status).length;
}

// リアクション済みかどうかを判定する
const isReacted = (answer) => {
    for (const reaction of answer.reactions) {
      if (reaction.reactionUserId === userId && reaction.reactionStatus === 11) {
        return true; // リアクションしている場合
      }
    }
    return false; // リアクションしていない場合
}

// リアクションボタン押下時
const reaction = async (answer) => {
  
  var reacFlg = false;
  var reacDelFlg = false;
  var reactionedId;
  
  for (const reaction of answer.reactions) {
    if (reaction.reactionUserId == userId && reaction.reactionStatus == 11) { // リアクション済み且つステータスが11
      reacFlg = true;
      reactionedId = reaction.reactionId;
    }
    if (reaction.reactionUserId == userId && reaction.reactionStatus == 99) { // リアクション済み且つステータスが99(削除済み)
      reacFlg = true;
      reacDelFlg = true;
      reactionedId = reaction.reactionId;
    }
  }
  // 登録用オブジェクト
  const regReaction = {
    answerId: answer.answerId,
    userId: userId, // TODO：ログインユーザーのIDを入れる
    reactionStatus: 11
  }

  // 再リアクション用オブジェクト
  const editReaction = {
    reactionId: reactionedId,
    reactionStatus: 11
  }

  // リアクション削除用オブジェクト
  const editDelReaction = {
    reactionId: reactionedId,
    reactionStatus: 99
  }

  if (reacFlg && !reacDelFlg) {
    // リアクション済みの回答だった場合ステータスを99に更新
    await http.post('oogiri/reaction/edit', editDelReaction)
  } else if(reacFlg && reacDelFlg) {
    // リアクション削除済みの場合ステータスを11に更新
    await http.post('oogiri/reaction/edit', editReaction)
  } else {
    // 未リアクションの時、11で登録
    await http.post('oogiri/reaction', regReaction)
  }
  getOogiriDetail();
}


// 回答投稿
const regAnswer = async() => {
  const answerData = {
    themeId: route.query.themeId,
    userId: userId,
    answerContent: newAnswer.value
  }
  await http.post('oogiri/answer', answerData);
  newAnswer.value = '';
  getOogiriDetail();
}

// マウント時にデータを取得し代入する
onMounted(() => {
  getOogiriDetail();
});
</script>