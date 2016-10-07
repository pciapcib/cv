<template lang="pug">
  div
    code.hljs(
      v-show="isPrinting"
    ) {{ codeProgress }}

    code(
      v-show="!isPrinting",
      v-html="codeHtml",
      :class="codeClass"
    )
</template>

<script>
  import hljs from 'highlight.js/lib/highlight'
  import 'highlight.js/styles/atom-one-dark.css'

  export default {
    data () {
      return {
        isPrinting: true,
        counter: 0,
        codeProgress: '',
        codeHtml: '',
        codeClass: ['hljs']
      }
    },

    props: {
      lang: {
        type: String,
        default: ''
      },

      codes: {
        type: String,
        required: true
      }
    },

    computed: {
      codeBlock () {
        return `${this.codes} `
      },

      hlAnalysis () {
        return hljs.highlightAuto(this.codeBlock)
      }
    },

    methods: {
      printCodes () {
        return new Array(this.codeBlock.length)
          .fill(() => new Promise(resolve => setTimeout(this.printChar(resolve), 10)))
          .reduce((cur, next) => cur.then(next), Promise.resolve())
          .then(() => {
            const { value, language } = this.hlAnalysis

            this.isPrinting = false
            this.codeHtml = value
            this.codeClass.push(this.lang, language)
          })
      },

      printChar (resolve) {
        return () => {
          this.codeProgress += this.codeBlock[this.counter++]

          resolve()
        }
      }
    },

    mounted () {
      hljs.registerLanguage(this.lang, require(`highlight.js/lib/languages/${this.lang}`))

      this.printCodes()
    }
  }
</script>
