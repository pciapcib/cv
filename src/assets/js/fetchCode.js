const fs = require('fs')
const path = require('path')

const templateComment = 'template lang="pug"'
const scriptComment = 'script'
const styleComment = 'style lang="sass"'

const tags = {
  template: {
    comment: templateComment,
    reg: new RegExp(`<${templateComment}>([\\s\\S]*?)<\/template>`)
  },

  script: {
    comment: scriptComment,
    reg: new RegExp(`<${scriptComment}>([\\s\\S]*?)<\/script>`)
  },

  style: {
    comment: styleComment,
    reg: new RegExp(`<${styleComment}>([\\s\\S]*?)<\/style>`)
  }
}

fs.readFile(path.resolve(__dirname, '../../components/Codes.vue'), (err, data) => {
  if (err) throw err

  const dataString = data.toString()

  const textObj = {}

  void ['template', 'script', 'style'].forEach(tag => {
    const text = match(tags[tag].reg)

    if (text) {
      textObj[tag] = `// ${tags[tag].comment}\n${text.slice(0, -1)}`
    }
  })

  fs.writeFileSync(path.resolve(__dirname, '../text/codes.json'), JSON.stringify(textObj))

  function match (reg) {
    const matched = dataString.match(reg)

    return matched ? matched[1] : ''
  }
})

