'use babel'

import fs from 'fs'
import path from 'path'
import Prism from 'node-prismjs'

let getSelectionText = () => {
  let editor = atom.workspace.getActiveTextEditor()
  let selection = editor.getLastSelection().getText()
  let language = Prism.languages.javascript
  let highlighted = Prism.highlight(selection, language)
  let themes = [
    'coy',
    'dark',
    'funky',
    'okaidia',
    'solarizedlight',
    'tomorrow',
    'twilight'
  ]
  let theme = 'twilight'
  let _style = fs.readFileSync(__dirname + '/../node_modules/prismjs/themes/prism-' + theme + '.css', {
    flag: 'r'
  })
  let style = '<style>' + _style + '</style>'
  let template = `<pre class="language-javascript"><code class="language-javascript">${highlighted}</code></pre>`

  return (style + template)
}

let generateElement = (string) => {
  let w = document.createElement('div')
  w.innerHTML = string.trim()

  return w.firstChild
}

let addHTMLTags = (string) => {
  return `<html><body>${string}</body></html>`
}

export default Renderer = {
  getText: getSelectionText,
  generateHTML: getSelectionText,
  generateElement: generateElement,
  addHTMLTags: addHTMLTags
}
