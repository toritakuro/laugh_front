<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-text-field
          label="投稿者名"
          v-model="item.themeUserName"
        ></v-text-field>
      </v-col>
      <v-col cols="12">
        <v-textarea
          label="お題"
          v-model="item.themeContent"
        ></v-textarea>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12">
        <v-btn class="mr-100" @click="updateItem">更新</v-btn>
        <v-btn class="mr-6" @click="deleteItem">削除</v-btn>
        <v-btn @click="cancel">キャンセル</v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { ref } from "vue";

export default {
  name: "EditItem",
  props: {
    themeId: {
      type: Number,
      required: true
    }
  },
  setup(props) {
    const item = ref({
      themeId: props.themeId,
      themeUserName: "",
      themeContent: ""
    });

    // TODO: themeIdを使用してAPIからデータを取得してitemを更新

    const updateItem = () => {
      // TODO: itemの内容をAPIに送信してデータを更新
      console.log("Updated:", item.value);
    };

    const cancel = () => {
      // TODO: 例えば前のページに戻るなどの処理
      console.log("Cancelled");
    };

    return { item, updateItem, cancel };
  }
};
</script>