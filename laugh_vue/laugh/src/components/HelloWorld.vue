<!-- <script setup lang="ts">
import axios from "axios";
import { createApp } from 'vue'

const url = "http://localhost:8080";

const getData = async () => {
  console.log("aaaa");
  let result = await axios.get(url);
  console.log(result)
};
defineProps<{
  msg: string
}>()

</script> -->
<script setup>
import { ref, onMounted } from 'vue'

// リアクティブな状態
const count = ref(1)
// 状態を変更し、更新をトリガーする関数。
function increment() {
  count.value++
}
const str = "あいうえ"

// ライフサイクルフック
onMounted(() => {
  console.log(`The initial count is ${count.value}.`)
})

const testssss = "hogehoge";
// テンプレート構文
const rawHtml = "<div>生のHTML</div>"
// 属性バインディグ
const dynamicId = 6

const objectOfAttrs = {
  id: 'container',
  class: 'wrapper'
}
let number = 5
const ok = true
let message = "abcd"
const id = 10;
let date = "10:00"
// const宣言が必要
const toTitleDate = (date) => {
  //console.log(date)
  return  date.split(':').reverse().join(':')
}
const seen = false;
const url ="https://ja.vuejs.org/guide/essentials/template-syntax.html#using-javascript-expressions";
const click = "click"
const method = () => {
  alert(1111);
}

</script>

<template>
  <div class="greetings">
    <h1 class="green">{{ msg }}</h1>
    <button @click="getData">Request</button>
    <h3>
      You’ve ffffssssfff createdddßd a project with
      <a href="https://vitejs.dev/" target="_blank" rel="noopener">Vite</a> +
      <a href="https://vuejs.org/" target="_blank" rel="noopener">Vue 3</a>. What's next?
    </h3>
    <!-- カウンタ -->
    <div id="app">
    {{ testssss }}
    <button @click="increment">
      Count is: {{ count }}
    </button>
    </div>

    <!-- htmlディレクティブ-->
    <p>Using text interpolation: {{ rawHtml }}</p>
    <p>Using v-html directive: <span v-html="rawHtml"></span></p>
    <!-- 属性バインディング -->
    <p v-bind:id="dynamicId">属性バインディング</p>
    <p :id="dynamicId">属性バインディング</p>

    <!-- 複数ディレクティブ -->
    <div v-bind="objectOfAttrs">複数ディレティブ</div>
    <!-- js展開 -->
    {{ number = 100 }}
    {{ ok ? 'YES' : 'NO' }}
    {{ message.split('').reverse().join('') }}
    <!-- js展開(ディレクト) -->
    <div :id="`list-${id}`">aaaaa</div>
    <time :title="toTitleDate(date)" :datetime="date">
      time
    </time>
    <!-- 制御 -->
    <p v-if="seen">Now you see me</p>

    <a v-bind:hoge="url"> アンカータグ </a>
    <a @click="method"> null入ってます </a>

  </div>
</template>


<style scoped>
h1 {
  font-weight: 500;
  font-size: 2.6rem;
  top: -10px;
}

h3 {
  font-size: 1.2rem;
}

.greetings h1,
.greetings h3 {
  text-align: center;
}

@media (min-width: 1024px) {
  .greetings h1,
  .greetings h3 {
    text-align: left;
  }
}
</style>
