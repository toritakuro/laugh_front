<template>
  <div>
    <div 
      @dragenter="dragenter"
      @dragleave="dragLeave"
      @dragover.prevent
      @drop.prevent="drop"
      :class="['fileWrap ', {enter: enterFlg}]"
    >
      ここに画像ファイルをドラッグ＆ドロップ
    </div>
    <img v-if="targetImage" :src="targetImage" alt="選択された画像" class="image">
    <canvas class="ds-none" ref="canvas"></canvas>
  </div>
</template>
<script setup lang="ts">
  const emit = defineEmits(['setFile']);
  import { ref } from 'vue'

  const enterFlg = ref(false);
  let file = ref<File>();
  let targetImage = ref<string>('')
  
  const canvas = ref<HTMLCanvasElement>(); // canvas要素のrefを作成

  const dragenter = () => {
    enterFlg.value = true;
  }
  const dragLeave = () => {
    enterFlg.value = false;
  }

  /**
   * ファイルをリサイズしemitで親へbase64を渡す
   * @param e 
   */
  const drop = async (e: DragEvent) => {
    if (!e.dataTransfer) {
      return;
    }
    enterFlg.value = false;
    file.value = e.dataTransfer.files[0];

    try {
      const imgDateBase64 = await getFileAsBase64(e.dataTransfer.files[0]);
      if (!canvas.value) {
        throw new Error('Canvas is undefined');
      }

      const resizedBase64 = await resizeImage64withCanvase(imgDateBase64, canvas.value);
      targetImage.value = resizedBase64;
      emit('setFile', resizedBase64);
    } catch (error) {
      console.error(error);
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
    return new Promise<HTMLImageElement>((resolve, reject) => {
      const image = new Image();
      image.onload = () => resolve(image);
      image.onerror = error => reject(error);;
      image.src = loeadFile;
    }).then((image: HTMLImageElement) => {
      const regex = image.src.match(/data:(.*);base64/);
      let mineType;
      if (regex) {
        mineType = regex[1]
      } else {
        throw new Error('illeagal');
      }
      const ctx = canvas.getContext('2d');
      if (!ctx) {
        throw new Error('2d context is not supported.');
      }

      const MAX_SIZE = 300;
      let canvasWidth = 0
      let canvasHeight = 0
      if (image.width < MAX_SIZE && image.height < MAX_SIZE) {
        canvasWidth = image.width;
        canvasHeight = image.height;
      } else {
        // 横 : 縦 = MAX_SIZE : x で計算 
        if (image.width > image.height) {
          canvasWidth = MAX_SIZE;
          canvasHeight = (image.height * MAX_SIZE) / image.width;
        } else {
          canvasHeight = MAX_SIZE;
          canvasWidth = (image.width * MAX_SIZE) / image.height;
        }
      }

      // 描画処理
      canvas.width = canvasWidth;
      canvas.height = canvasHeight;
      ctx.drawImage(image, 0, 0, image.width, image.height, 0, 0, canvasWidth, canvasHeight);

      return Promise.resolve(canvas.toDataURL(mineType));
    })
  }
</script>

<style scoped>

  div.fileWrap {
    width: 400px;
    height: 50px;
    background-color: aqua;
  }
  .enter {
    border: 10px dotted powderblue;
  }
</style>
