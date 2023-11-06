<template>
  <div>
    <v-file-input
      accept="*"
      prepend-icon="mdi-upload"
      outlined
      :clearable="false"
      :show-size="1000"
      label="ファイルをアップロードしてください"
      @change="handleFileSelect"
      class="ml-8 mt-4"
    ></v-file-input>
  </div>
</template>
<script setup lang="ts">
  const emit = defineEmits(['setFile']);
  import { ref } from 'vue'

  let targetImage = ref<string>('')

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


  const handleFileSelect = async (e: Event) => {
    const input = e.target as HTMLInputElement;
    if (!input.files) {
      return;
    }
    const selectedFile = input.files[0];

    // ファイル名から拡張子を取得
    const fileExtension = selectedFile.name.split('.').pop() || '';
    
    try {
      const imgDataBase64 = await getFileAsBase64(selectedFile);
      targetImage.value = imgDataBase64;
      emit('setFile', imgDataBase64, fileExtension);
    } catch (error) {
      console.error(error);
    } 
  };

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

  .clear-btn {
    display: block;
    margin-top: 10px;
    margin-left: 4px;
  }
</style>
