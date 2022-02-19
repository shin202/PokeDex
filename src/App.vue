<template>
  <div id="app" v-if="!is_loading">
    <router-view></router-view>
  </div>

  <div id="app" class="position-absolute w-100 h-100 d-flex justify-content-center align-items-center" v-else>
    <pacman-loader :color="'#B6CCFE'" :size="'30px'"/>
  </div>
</template>

<script>
  export default {
    name: 'App',
    data() {
      return {
        is_loading: true,
      }
    },
    methods: {
      loading() {
        setTimeout(() => {
          this.is_loading = false;
        }, 3000);
      }
    },
    mounted() {
      this.loading();
    },
  }
</script>

<style lang="scss">
  @import url('https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,400;1,300&display=swap');
  html {
    font-size: 62.5%;
    scroll-behavior: smooth;

    &::-webkit-scrollbar {
      width: 1vw;
    }

    &::-webkit-scrollbar-track {
      background-color: #EDF2FB;
    }

    &::-webkit-scrollbar-thumb {
      background-color: #B6CCFE;
      border-radius: 0.6rem;
    }
  }

  #app {
    font-family: 'Lato', sans-serif;
    font-size: 1.6rem;
    background-color: #EDF2FB;
    color: #0A3668;
    min-height: 100vh;
    min-width: 36rem;
    user-select: none;
    -webkit-user-select: none;
  }
</style>