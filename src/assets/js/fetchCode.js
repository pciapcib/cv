const fs = require('fs')
const path = require('path')

const codesReg = [
  /<template lang="pug">\n([\s\S]*?)<\/template>/,
  /<script>\n([\s\S]*?)<\/script>/,
  /<style lang="sass">\n([\s\S]*?)<\/style>/
]

fs.readFile(path.resolve(__dirname, '../../components/Codes.vue'), (err, data) => {
  if (err) throw err

  const dataString = data.toString().replace(/\n {2}/g, '\n')

  const textOut = codesReg.map(reg => match(reg))

  fs.writeFileSync(path.resolve(__dirname, '../text/codes.txt'), textOut.join('// code\n'))

  function match (reg) {
    const matched = dataString.match(reg)

    return matched ? matched[1] : ''
  }
})

