<template lang="pug">
  #app
    h1 {{ msg }}

    pre
      codes(
        :lang="'stylus'",
        :codes="codes.template"
      )

    pre
      codes(
        :lang="'javascript'",
        :codes="codes.script"
      )
</template>

<script>
  import Codes from './components/Codes'
  import codes from './assets/text/codes'

  export default {
    data () {
      return {
        codes,
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

  .pre-high-light code
      color: #000
      background-color: #fff
</style>
