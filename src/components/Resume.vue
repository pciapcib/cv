<template lang="pug">
  pre
    code(v-html="codeHtml")

    code {{ codeProgress }}
</template>

<script>
  import promisify from 'assets/js/promisify'
  import scrollToBottom from 'assets/js/scrollToBottom'

  import pug from 'assets/text/resume-pug.txt'
  import xml from 'assets/text/resume-xml.txt'

  export default {
    data () {
      return {
        pug: pug.split(/ *\/\/ await\n{2}/),
        xml: xml.replace(/(\n| {2})/g, '').split('<!-- await-->'),
        blockCounter: 0,
        charCounter: 0,
        codeHtml: '',
        codeProgress: ''
      }
    },

    computed: {
      curBlock () {
        return this.pug[this.blockCounter]
      }
    },

    methods: {
      printResume () {
        promisify({
          promiseNumber: this.pug.length,
          step: this.printBlock,
          interval: 250
        }, () => {

        })
      },

      printBlock (resolve) {
        scrollToBottom(this)

        if (this.curBlock === undefined) {
          return
        }

        return () => {
          promisify({
            promiseNumber: this.curBlock.length,
            step: this.printChar,
            interval: 3
          }, () => {
            this.codeProgress = ''
            this.codeHtml += this.xml[this.blockCounter++]

            this.emitAdd(['app', 'css', 'codes'])

            this.charCounter = 0

            resolve()
          })
        }
      },

      printChar (resolve) {
        const curChar = this.curBlock[this.charCounter]

        scrollToBottom(this)

        return () => {
          this.codeProgress += curChar
          this.charCounter++

          resolve()
        }
      },

      emitAdd (events) {
        const { curBlock } = this

        if (curBlock) {
          events.forEach(event => {
            if (curBlock.includes(`++${event}`)) {
              this.$emit(`add-${event}`)

              this.blockCounter++
            }
          })
        }
      }
    },

    mounted () {
      this.printResume()
    }
  }
</script>
