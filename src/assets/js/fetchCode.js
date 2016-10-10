const fs = require('fs')
const path = require('path')

const codesReg = [
  /<template lang="pug">\n([\s\S]*?)<\/template>/,
  /<script>\n([\s\S]*?)<\/script>/,
  /<style lang="sass">\n([\s\S]*?)<\/style>/
]

module.exports = () => {
  fetchCodes('App')
  fetchCodes('Codes')
}

function fetchCodes (componentName) {
  const componentPath = componentName === 'App' ? `../../App.vue` : `../../components/${componentName}.vue`

  fs.readFile(path.resolve(__dirname, componentPath), (err, data) => {
    if (err) throw err

    const dataString = data.toString().replace(/\n {2}/g, '\n')

    const textOut = codesReg.map(reg => match(dataString, reg))

    fs.writeFileSync(path.resolve(__dirname, `../text/${componentName.toLowerCase()}.txt`), textOut.join(''))
  })
}

function match (data, reg) {
  const matched = data.match(reg)

  return matched ? matched[1] : ''
}
