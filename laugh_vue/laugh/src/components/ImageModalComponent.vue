<template>
<v-dialog v-model="modalFlg" width="600">
  <v-card>
    <v-card>
      <v-card-text class="justify-center">
        <vue-cropper
          ref="cropper"
          :aspect-ratio="16 / 9"
          :src="props.imgBase64"
        />
        <v-container class="text-center">
          <v-row justify="end">
            <v-col cols="4" class="pr-0"><v-btn block rounded="xl" @click.prevent="closeModal">キャンセル</v-btn></v-col>
            <v-col cols="3"><v-btn block color="orange-darken-2" rounded="xl" @click.prevent="fixImg">保存</v-btn></v-col>
          </v-row>
        </v-container>
      </v-card-text>
    </v-card>
  </v-card>
</v-dialog>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useStore } from 'vuex'
import VueCropper from 'vue-cropperjs';
import 'cropperjs/dist/cropper.css';
import type User from '@/types/User'
import http from "@/http-common";
import { reactive } from 'vue';
const store = useStore();

const props = defineProps({ 
  modelValue: {
    type: Boolean,
    default: false
  },
  imgBase64: {
    type: String,
    default: ''
  }
});
/** 親コンポーネントに返却 */
const emit = defineEmits(['update:modelValue','update:imgValue']);

let userRef = reactive<User>({});

/** モーダルの表示フラグ */
const modalFlg = computed({
  get() {
    return props.modelValue;
  },
  set(value) {
    emit('update:modelValue', value);
  }
})

/** 画像の切り取り */
const cropper = ref();
const fixImg = () => {
  modalFlg.value = false;
  emit('update:imgValue', cropper.value.getCroppedCanvas().toDataURL());
  updProfileImg();
}
/** モーダルを閉じる */
const closeModal = () => { modalFlg.value = false; }
/** 画像送信 */
const updProfileImg = () => {
  // store.state.user.userId;
  userRef.id = 5;
  userRef.profileImg = cropper.value.getCroppedCanvas().toDataURL();
  http.post('/demo/updProfileImg', userRef);
}
</script>