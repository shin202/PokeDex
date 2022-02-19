<template>
  <div class="home">
    <pokemon/>
  </div>
</template>

<script>
// @ is an alias to /src

import Pokemon from '@/components/Pokemon.vue' 
export default {
  name: 'Home',
  components: {
    Pokemon,
  }
}
</script>

<style lang="scss">
</style>
