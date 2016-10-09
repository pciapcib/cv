const fs = require('fs')
const path = require('path')

const pug = require('pug')

const resumeReg = /<template lang="pug">\n {2}pre#resume\n([\s\S]*?)<\/template>/

fs.readFile(path.resolve(__dirname, '../../components/ResumeText.vue'), (err, data) => {
  if (err) throw err

  const pugOut = data.toString().replace(/\n {4}/g, '\n').match(resumeReg)[1]
  const xmlOut = pug.render(pugOut, { pretty: true }).slice(1)

  fs.writeFileSync(path.resolve(__dirname, '../text/resume-pug.txt'), pugOut)
  fs.writeFileSync(path.resolve(__dirname, '../text/resume-xml.txt'), xmlOut)
})
