<template>
  <div class="modal">
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
          @click="uploadFile(contentsModal)"
        >アップロード</v-btn>
      </v-form>
  </div>
</template>
  
  <script setup lang="ts">
  import FileComponent from "../components/FileComponent.vue"
  import { computed, ref, watchEffect, reactive } from 'vue'
  import { useRouter , useRoute} from 'vue-router';
  import { useStore } from 'vuex'
  import type Laugh from "@/types/Laugh";
  import http from "@/http-common";

  const props = defineProps(["contentsReq"]);
  // const fileType = ref(props.fileType);
  // const title = ref(props.title);
  // const detail = ref(props.detail);
  // const fileType = ref('');
  // const title = ref('');
  // const detail = ref('');

  const contentsModal = reactive({
    fileType: 1,
    title: '',
    detail: ''
  })

  watchEffect(() => {
    contentsModal.title = props.contentsReq.title;
    contentsModal.detail = props.contentsReq.detail;
  });

  const emit = defineEmits(['set-file', 'set-content', 'upload-file']);
  const uploadFile = (contentsModal: any) => {
    emit("set-content", contentsModal);
    emit("upload-file");
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