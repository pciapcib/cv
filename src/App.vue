<template lang="pug">
  #app
    img(src="./assets/logo.png")
    h1 {{ msg }}

    codes
</template>

<script>
  import Codes from './components/Codes'

  export default {
    data () {
      return {
        msg: 'Hello Vue!'
      }
    },

    components: {
      Codes
    }
  }
</script>

<style lang="sass">
  body
    font-family: Helvetica, sans-serif
</style>
