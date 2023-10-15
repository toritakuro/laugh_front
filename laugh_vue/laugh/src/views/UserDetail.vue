<template>
    <!-- <p>{{router.query.user}}</p> -->
</template>

<style>

</style>

<script setup lang="ts">
import { computed, ref, onMounted } from 'vue'
import { useRoute } from 'vue-router';

const route = useRoute()
onMounted(() => {
    console.log(route.query.user)
  })

</script>
