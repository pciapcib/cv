<template lang="pug">
  pre#resume
    code(
      v-if="codeHtml",
      v-html="codeHtml"
    )

    code {{ codeProgress }}
</template>

<script>
  import promisify from 'assets/js/promisify'

  import pug from 'assets/text/resume-pug.txt'
  import xml from 'assets/text/resume-xml.txt'

  export default {
    data () {
      return {
        pug: pug.split(/ *\/\/ await\n{2}/),
        xml: xml.replace(/(\n| {2})/g, '').split('<!-- await-->'),
        isPrinting: true,
        blockCounter: 0,
        charCounter: 0,
        codeHtml: '',
        codeProgress: ''
      }
    },

    computed: {
      curBlock () {
        return this.pug[this.blockCounter]
      },

      curChar () {
        return this.curBlock[this.charCounter]
      }
    },

    methods: {
      printResume () {
        return promisify(this.pug.length, this.printBlock, 600, () => {
          this.isPrinting = false
        })
      },

      printBlock (resolve) {
        this.$el.scrollTop = this.$el.scrollHeight

        return () => {
          promisify(this.curBlock.length, this.printChar, 15, () => {
            this.codeProgress = ''
            this.codeHtml += this.xml[this.blockCounter++]

            this.charCounter = 0

            resolve()
          })
        }
      },

      printChar (resolve) {
        this.$el.scrollTop = this.$el.scrollHeight

        return () => {
          this.codeProgress += this.curChar
          this.charCounter++

          resolve()
        }
      }
    },

    mounted () {
      this.printResume()
    }
  }
</script>

<style lang="sass">
  #resume
    a
      color: #f00
      text-decoration: none
</style>
