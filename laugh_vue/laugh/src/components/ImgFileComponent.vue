<template>
  <div>
    <!-- dragenterはホバーされた時 https://reffect.co.jp/vue/drag-drop-file-upload/で記事になっている-->
    <div 
      @dragenter="dragenter"
      @dragleave="dragLeave"
      @dragover.prevent
      @drop.prevent="drop"
      :class="['fileWrap ', {enter: enterFlg}]"
    >
      ファイルの場所
    </div>
  </div>
</template>

<script setup lang="ts">
  // 親コンポーネントから呼び出す時のv-onディレクティブの定義
  // <FileComponet @setFile>の@setFileの部分=の渡らせる親の定義した関数の引数として設定した値を渡す
  const emit = defineEmits(['setFile']);
  //import { emit } from 'process';
  import { computed, ref } from 'vue'

  const enterFlg = ref(false);
  let file = ref<File[]>([]);

  // ref は値にreactiveはオブジェクトに設定
  const dragenter = () => {
    // .valueで値を設定することが可能
    enterFlg.value = true;
  }
  const dragLeave = () => {
    // .valueで値を設定することが可能
    enterFlg.value = false;
  }
  // これが発火したときに親が取得したい
  const drop = (e: DragEvent) => {
    if (e.dataTransfer) {
      enterFlg.value = false;
      file.value = Array.from(e.dataTransfer.files);
      // これを呼び出したときに親のメソッドも呼び出される
      emit('setFile', file);
    }
  }
</script>

<style scoped>
  div.fileWrap {
    width: 100px;
    height: 100px;
    background-color: aqua;
  }
  .enter {
    border: 10px dotted powderblue;
  }
</style>
