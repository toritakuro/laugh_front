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
    <img :src="targetImage" alt="選択された画像" class="image">
    <canvas ref="canvas"></canvas>
  </div>
</template>
<!-- https://qiita.com/hoshimado/items/7b9f73f9f146a66e2502 -->
<script setup lang="ts">
  // 親コンポーネントから呼び出す時のv-onディレクティブの定義
  // <FileComponet @setFile>の@setFileの部分=の渡らせる親の定義した関数の引数として設定した値を渡す
  const emit = defineEmits(['setFile']);
  //import { emit } from 'process';
  import { computed, ref } from 'vue'

  const enterFlg = ref(false);
  let file = ref<File>();
  let targetImage = ref<string>('')
  
  const canvas = ref<HTMLCanvasElement>(); // canvas要素のrefを作成

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
      file.value = e.dataTransfer.files[0];
      getFileAsBase64(e.dataTransfer.files[0])
      .then((imgDateBase64: string)=> {
        return resizeImage64withCanvase(imgDateBase64, canvas);
      });
      // これを呼び出したときに親のメソッドも呼び出される
      emit('setFile', file);
    }
  }
  /**
   * ファイルオブジェクトからBase64へ変換
   * @param filePath 
   */
  const getFileAsBase64 = (filePath:Blob): Promise<string> => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = e => {
          if (e.target && e.target.result) {
            // : Promise<string>で定義したのでe.target.result as stringで定義する
            resolve(e.target.result as string)
          } else {
            reject(new Error('Failed to read file.'));
          }
        };
        reader.onerror = error => reject(error);

        reader.readAsDataURL(filePath);
      }
    );
  }

  /**
   * ファイルをリサイズ
   * @param loeadFile 
   * @param canvas 
   */
  const resizeImage64withCanvase = (loeadFile: string, canvas: HTMLCanvasElement) => {
    return new Promise<HTMLImageElement>((resolve) => {
      const image = new Image();
      image.onload = () => resolve(image);
      image.src = loeadFile;
    }).then((image: HTMLImageElement) => {
      const ctx = canvas.getContext('2d');
      if (!ctx) {
        throw new Error('2d context is not supported.');
      }
      const MAX_SIZE = 600;
      if (image.width < MAX_SIZE && image.height < MAX_SIZE) {
        [canvas.width, canvas.height] = [image.width, image.height];
      } else {
        let dstWidth;
        let dstHeight;
        // 横 : 縦 = 320 : x で計算 
        if (image.width > image.height) {
          dstWidth = MAX_SIZE;
          dstHeight = (image.height * MAX_SIZE) / image.width;
        } else {
          dstHeight = MAX_SIZE;
          dstWidth = (image.width * MAX_SIZE) / image.height;
        }
        canvas.width = dstWidth;
        canvas.height = dstHeight;
        // canvasに既に描画されている画像があればそれを消す
        ctx.clearRect(0,0,dstWidth,dstHeight);
        ctx.drawImage(image, 0, 0, image.width, image.height, 0, 0, dstWidth, dstHeight);
      }

      // canvasから画像をbase64として取得する
      const base64 = canvas.toDataURL('image/jpeg');
      return Promise.resolve(base64);
    });
  }
  // アスペクト比というのは矩形の長辺(横):短辺(縦)
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
