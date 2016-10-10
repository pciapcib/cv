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
      }
    },

    methods: {
      printResume () {
        return promisify(this.pug.length, this.printBlock, 400, () => {
          this.isPrinting = false
        })
      },

      printBlock (resolve) {
        this.$el.scrollTop = this.$el.scrollHeight

        if (this.curBlock === undefined) {
          return
        }

        return () => {
          promisify(this.curBlock.length, this.printChar, 10, () => {
            this.codeProgress = ''

            this.codeHtml += this.xml[this.blockCounter++]

            if (this.curBlock && this.curBlock.includes('++css')) {
              this.$emit('add-css')

              this.blockCounter++
            }

            this.charCounter = 0

            resolve()
          })
        }
      },

      printChar (resolve) {
        const curChar = this.pug[this.blockCounter][this.charCounter]

        this.$el.scrollTop = this.$el.scrollHeight

        return () => {
          this.codeProgress += curChar
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
