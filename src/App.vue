<template lang="pug">
  //- template lang="pug"
  ul#app
    li#resume
      resume(
        v-if="loadVue",
        :class="codeClass",
        @add-css="addCSS"
      )
      // await

    li#app-vue
      codes(
        :class="codeClass",
        :codes-text="appText"
        @add-vue="addVue"
      )
      // await

    li#codes-vue
      codes(
        v-if="loadVue",
        :class="codeClass",
        :codes-text="codesText"
      )
      // await

</template>

<script>
  // script
  import Resume from 'components/Resume'
  import Codes from 'components/Codes'
  // await

  // ++vue
  // await

  import appText from 'assets/text/app.txt'
  import codesText from 'assets/text/codes.txt'
  // await

  export default {
    data () {
      return {
        appText,
        codesText,
        codeClass: [],
        classCounter: 0,
        loadVue: false,
        isTemplateDone: false
      }
    },
  // await

    methods: {
      addCSS () {
        this.codeClass.push(`css-${this.classCounter++}`)

        if (this.classCounter === 2) {
          require('highlight.js/styles/atom-one-dark.css')
        }
      },

      addVue () {
        this.loadVue = true
      }
    },
  // await

    mounted () {

    },

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

    > li
      flex: 1
      list-style: none

      &#resume
        flex: 2

      &#app-vue
        margin: 0 20px

      > pre
        overflow-y: auto
        max-height: 450px
        white-space: pre-wrap
        word-wrap: break-word

        a
          color: #f00
          text-decoration: none

        &.css-0
          padding: 1em
          color: #abb2bf
          border: 4px solid #000

        &.css-1
          background: #282c34

        &.css-2
  // await

</style>
