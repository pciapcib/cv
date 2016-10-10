<template lang="pug">
  //- template lang="pug"
  #app
    resume
    // await

    codes(
      :codes-text="appText"
    )
    // await

    codes(
      :codes-text="codesText"
    )
    // await

</template>

<script>
  // script
  import Resume from 'components/Resume'
  import Codes from 'components/Codes'

  import appText from 'assets/text/app.txt'
  import codesText from 'assets/text/codes.txt'
  // await

  export default {
    data () {
      return {
        appText,
        codesText,
        isTemplateDone: false
      }
    },
  // await

    methods: {

    },
  // await

    components: {
      Resume,
      Codes
    }
  }
  // await

</script>

<style lang="sass">
  // style lang="sass"
  body
    font-family: Helvetica, sans-serif

  *
    transition: all .4s ease-out
  // await

  #app
    display: flex

    > pre
      flex: 1
      max-height: 450px
      overflow-y: auto
      white-space: pre-wrap
      word-wrap: break-word
  // await

  .pre-high-light
    code
      color: #000
      background-color: #fff
  // await
</style>
