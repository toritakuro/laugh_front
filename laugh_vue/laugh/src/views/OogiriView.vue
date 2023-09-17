<template>
  <div>
    <button @click="fetchAndGoToDetail">詳細ページへ</button>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const fetchAndGoToDetail = () => {
  // 詳細ページへ遷移
  router.push({ path: '/oogiri/detail', query: { themeId: 1 }  })
}
</script>
