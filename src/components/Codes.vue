<template lang="pug">
  // template lang="pug"
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

  import codesText from 'assets/text/codes.txt'
  // await

  const langs = {
    stylus,
    javascript,
    scss
  }

  Object.keys(langs).forEach(lang =>
    hljs.registerLanguage(lang, langs[lang]))
  // await

  const codes = codesText.split(/\n *\/\/ code/).map(code =>
    code.split(/ *\/\/ await\n/))
  // await

  export default {
    data () {
      return {
        isPrinting: true,
        codeCounter: 0,
        blockCounter: 0,
        charCounter: 0,
        codes,
        codeHtml: '',
        codeProgress: '',
        codeClass: ['hljs']
      }
    },
  // await

    props: {
      // wcodes: {
        // type: String
        // required: true
      // },
  // await

      callback: {
        type: Function,
        default () {}
      }
    },
  // await

    computed: {
      hlAnalysis () {
        return hljs.highlightAuto(this.codeBlock)
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
        const code = this.codes[this.codeCounter]

        this.$el.scrollTop = this.$el.scrollHeight

        return () => {
          promisify(code.length, this.printBlock, 500, () => {
            this.codeCounter++
            this.blockCounter = 0

            resolve()
          })
        }
      },
  // await

      printBlock (resolve) {
        const block = this.codes[this.codeCounter][this.blockCounter]

        return () => {
          promisify(block.length, this.printChar, 15, () => {
            this.codeProgress = ''
            this.codeHtml += hljs.highlightAuto(block).value

            this.blockCounter++
            this.charCounter = 0

            resolve()
          })
        }
      },
  // await

      printChar (resolve) {
        const char = this.codes[this.codeCounter][this.blockCounter][this.charCounter]

        this.$el.scrollTop = this.$el.scrollHeight

        return () => {
          if (this.charCounter || char !== '\n') {
            this.codeProgress += char
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
