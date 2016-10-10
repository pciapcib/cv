<template lang="pug">
  //- template lang="pug"
  pre
    code.hljs(
      v-if="codeHtml",
      v-html="codeHtml"
    )
    // await

    code.hljs(v-if="isPrinting") {{ codeProgress }}
    // await

</template>

<script>
  // script
  import hljs from 'highlight.js/lib/highlight'

  import stylus from 'highlight.js/lib/languages/stylus'
  import javascript from 'highlight.js/lib/languages/javascript'
  import scss from 'highlight.js/lib/languages/scss'
  // await

  import 'highlight.js/styles/atom-one-dark.css'
  // await

  import promisify from 'assets/js/promisify'
  // await

  const langs = {
    stylus,
    javascript,
    scss
  }

  Object
    .keys(langs)
    .forEach(lang => hljs.registerLanguage(lang, langs[lang]))
  // await

  export default {
    data () {
      return {
        isPrinting: true,
        codeCounter: 0,
        blockCounter: 0,
        charCounter: 0,
        codeHtml: '',
        codeProgress: ''
      }
    },
  // await

    props: {
      codesText: {
        type: String,
        required: true
      },
  // await

      callback: {
        type: Function,
        default () {}
      }
    },
  // await

    computed: {
      codes () {
        return this.codesText
          .split(/\n *\/\/ code/)
          .map(code => code.split(/ *\/\/ await\n/g))
      },

      curCode () {
        return this.codes[this.codeCounter]
      },

      curBlock () {
        return this.curCode[this.blockCounter]
      },

      curChar () {
        return this.curBlock[this.charCounter]
      }
    },
  // await

    methods: {
      printCodes () {
        return promisify(this.codes.length, this.printCode, 600, () => {

        })
      },
  // await

      printCode (resolve) {
        return () => {
          promisify(this.curCode.length, this.printBlock, 500, () => {
            this.codeCounter++
            this.blockCounter = 0

            resolve()
          })
        }
      },
  // await

      printBlock (resolve) {
        this.$el.scrollTop = this.$el.scrollHeight

        return () => {
          promisify(this.curBlock.length, this.printChar, 15, () => {
            this.codeProgress = ''
            this.codeHtml += hljs.highlightAuto(this.curBlock).value

            this.blockCounter++
            this.charCounter = 0

            resolve()
          })
        }
      },
  // await

      printChar (resolve) {
        this.$el.scrollTop = this.$el.scrollHeight

        return () => {
          if (this.charCounter || this.curChar !== '\n') {
            this.codeProgress += this.curChar
          }

          this.charCounter++

          resolve()
        }
      }
    },
  // await

    mounted () {
      this.printCodes()
    }
  }
</script>
