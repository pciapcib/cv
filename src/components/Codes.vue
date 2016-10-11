<template lang="pug">
  //- template lang="pug"
  pre
    code(v-html="codeHtml")
    // await

    code {{ codeProgress }}
    // await

</template>

<script>
  // script
  import hljs from 'highlight.js/lib/highlight'

  import stylus from 'highlight.js/lib/languages/stylus'
  import javascript from 'highlight.js/lib/languages/javascript'
  // await

  import promisify from 'assets/js/promisify'
  import scrollToBottom from 'assets/js/scrollToBottom'
  // await

  const langs = {
    stylus,
    javascript
  }

  Object
    .keys(langs)
    .forEach(lang =>
      hljs.registerLanguage(lang, langs[lang]))
  // await

  export default {
    data () {
      return {
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
          .split(/ *\/\/ await\n/g)
      },

      curBlock () {
        return this.codes[this.blockCounter]
      }
    },
  // await

    methods: {
      printCodes () {
        promisify({
          promiseNumber: this.codes.length,
          step: this.printBlock,
          interval: 300
        }, () => {

        })
      },
  // await

      printBlock (resolve) {
        scrollToBottom(this)

        if (this.curBlock === undefined) {
          return
        }

        return () => {
          promisify({
            promiseNumber: this.curBlock.length,
            step: this.printChar,
            interval: 8
          }, () => {
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
        const curChar = this.curBlock[this.charCounter]

        scrollToBottom(this)

        return () => {
          this.codeProgress += curChar
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
