<template>
  <div class="about">
    <h1>This aaaais an about page</h1>
  </div>
</template>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
<script>
import { computed } from 'vue'
import { useStore } from 'vuex'

export default {
  setup () {
    const store = useStore()

    return {
      // computed 関数のステートにアクセスします
      count: computed(() => store.state.count),
    }
  }
}
</script>
