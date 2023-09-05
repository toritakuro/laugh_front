<template>
<div class="search">
  <h3>性別</h3>
  <div v-for="select in optionGender">
    <input type="radio"  
      v-bind:value="select.name" 
      v-bind:key="select.id" 
      v-model="radiosGender">
    <label>{{ select.name }}</label>
  </div>
</div>
<div class="search">
  <h3>活動歴</h3>
  <div v-for="select in optionActivity">
    <input type="radio"  
      v-bind:value="select.name" 
      v-bind:key="select.id" 
      v-model="radiosActivity">
    <label>{{ select.name }}</label>
  </div>
</div>
<div class="search">
  <h3>事務所</h3>
  <div v-for="select in optionOffice">
    <input type="checkbox"  
      v-bind:value="select.name" 
      v-bind:key="select.id" 
      v-model="checkOffice">
    <label>{{ select.name }}</label>
  </div>
</div>
<div class="search">
  <h3>芸風</h3>
  <div v-for="select in optionComedyStyle">
    <input type="checkbox"  
      v-bind:value="select.name" 
      v-bind:key="select.id" 
      v-model="checkComedyStyle">
    <label>{{ select.name }}</label>
  </div>
</div>
<div class="search">
  <h3>料金体系</h3>
  <select v-model="selectFeeType">
    <option v-for="select in optionFeeType" 
      v-bind:value="select.name" 
      v-bind:key="select.id">
      {{ select.name }}
    </option>
  </select>
</div>
<div class="search">
  <h3>活動場所</h3>
  <select v-model="selectArea">
    <option v-for="select in optionArea" 
      v-bind:value="select.name" 
      v-bind:key="select.id">
      {{ select.name }}
    </option>
  </select>
</div>
</template>

<style>
  .search {
    margin: 8px;
  }
  .search h3 {
    background-color: rgba(239, 173, 51, 0.398);
  }
  .search div {
    margin-left: 8px;
  }
  .search select {
    margin-top: 2px;
    padding-left: 3px;
    width: 150px;
    border: 2px solid #f7ca9b;
    border-radius: 5px;
  }
</style>

<script setup lang="ts">
import { ref } from 'vue'
  const radiosGender = ref([])
  const optionGender = [
    { id: 1, name: '男'},
    { id: 2, name: '女'},
    { id: 3, name: '男女'}
  ]

  const radiosActivity = ref([])
  const optionActivity = [
    { id: 1, name: '１年未満'},
    { id: 2, name: '１年以上'},
    { id: 3, name: '３年以上'},
    { id: 4, name: '５年以上'},
    { id: 5, name: '７年以上'},
    { id: 6, name: '９年以上'},
    { id: 7, name: '指定しない'}
  ]

  const checkOffice = ref([])
  const optionOffice = ref([
    { id: 1, name: '吉本興業', flg: false},
    { id: 2, name: '人力舎', flg: false},
    { id: 3, name: 'マセキ芸能社', flg: false},
    { id: 4, name: '松竹芸能', flg: false},
    { id: 5, name: 'その他', flg: false}
  ])

  const checkComedyStyle = ref([])
  const optionComedyStyle = [
    { id: 1, name: '漫才'},
    { id: 2, name: 'ピン'},
    { id: 3, name: 'コント'},
    { id: 4, name: 'ギャグ'},
    { id: 5, name: 'モノマネ'},
    { id: 6, name: '歌ネタ'},
    { id: 7, name: 'リズムネタ'},
    { id: 8, name: 'その他'}
  ]

  const selectFeeType = ref('')
  const optionFeeType = [
    { id: 1, name: '時給'},
    { id: 2, name: '出来高' }
  ]

  const selectArea = ref('')
  const optionArea = [
    { id: 1, name: '北海道'},
    { id: 2, name: '東北' }, 
    { id: 3, name: '関東' },
    { id: 4, name: '中部' }, 
    { id: 5, name: '近畿' }, 
    { id: 6, name: '中国' }, 
    { id: 7, name: '九州' }
  ]
</script>