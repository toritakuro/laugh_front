<template>
  <div class="modal" v-if="regEditType == 1">
    <v-form @click.stop class="form-container">
      <v-radio-group 
        v-model="contentsModal.fileType" 
        inline
        >
        <v-radio
          label="動画"
          value="1"
          color="orange"
        ></v-radio>
        <v-radio
          label="PDF"
          value="2"
          color="orange"
        ></v-radio>
      </v-radio-group>
      <v-text-field
        v-model="contentsModal.title"
        label="タイトル"
        placeholder="ここにタイトルを入力"
      ></v-text-field>
      <v-textarea
        v-model="contentsModal.detail"
        label="説明文"
        class="mt-4"
      ></v-textarea>
      
      <FileComponent @set-file="setFile"/>

      <v-btn 
        class="mt-12"
        style="width:80%;"
        color="orange-darken-1" 
        @click="uploadContent(contentsModal)"
      >アップロード</v-btn>
    </v-form>
  </div>

  <div class="modal" v-if="regEditType == 2">
    <v-form @click.stop class="form-container">
      <v-text-field
        v-model="contentsEditModal.title"
        label="タイトル"
        placeholder="ここにタイトルを入力"
      ></v-text-field>
      <v-textarea
        v-model="contentsEditModal.detail"
        label="説明文"
        class="mt-4"
      ></v-textarea>

      <v-btn 
        class="mt-12"
        style="width:80%;"
        color="orange-darken-1" 
        @click="editContent(contentsEditModal)"
      >編集</v-btn>
    </v-form>
  </div>
</template>
  
  <script setup lang="ts">
  import FileComponent from "../components/FileComponent.vue"
  import {  ref, watchEffect, reactive } from 'vue'

  const regEditType = ref(1); // 1なら登録、2なら更新。TODO: 20231105 マジックナンバー使ってるので修正したい
  const props = defineProps(["contentsReq", "contentsEditReq","regEditType"]);

  const contentsModal = reactive({
    fileType: 1,
    title: '',
    detail: '',
    content: ''
  })

  const contentsEditModal = reactive({
    title: '',
    detail: '',
  })

  watchEffect(() => {
    contentsModal.title = props.contentsReq?.title;
    contentsModal.detail = props.contentsReq?.detail;
    contentsModal.content = props.contentsReq?.content;
    contentsEditModal.title = props.contentsEditReq?.title;
    contentsEditModal.detail = props.contentsEditReq?.detail;
    regEditType.value = props.regEditType;
  });

  const emit = defineEmits(['set-file', 'edit-content', 'upload-content']);
  const uploadContent = (contentsModal: any) => {
    emit("upload-content", contentsModal);
  }
  const editContent = (contentsEditModal: any) => {
    emit("edit-content", contentsEditModal);
  }
  const setFile = (base64:string, extension:string) => {
    emit("set-file", base64, extension);
  }
  
  </script>
  
  <style scoped>
    .modal {
    padding: 40px 60px;
    border: 2px solid #000000;
    background: #FFFF;
    z-index: 99;
    display: block;
    text-align: center;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border-radius: 10px;
    height: 70%;
    width: 50%;
  }
  </style>