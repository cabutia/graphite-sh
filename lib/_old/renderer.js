'use babel'

import fs from 'fs'
import path from 'path'
import Prism from 'node-prismjs'
import {GrammarRegistry} from 'atom'
import Graphite from './graphite.js'

let getSelectionText = () => {
  let editor = atom.workspace.getActiveTextEditor()
  let selection = editor.getLastSelection().getText()
  let eGrammar = editor.getGrammar().name
  let grammar = Graphite.mapType(eGrammar)
  let language = Prism.languages[grammar]
  let highlighted = Prism.highlight(selection, language)
  let themes = [
    'coy',
    'dark',
    'funky',
    'okaidia',
    'solarizedlight',
    'tomorrow',
    'twilight',
    'monokai'
  ]
  let theme = atom.config.get('carbon-sh.theme') || 'dark'
  let baseStyle = fs.readFileSync(__dirname + '/../styles/base.css', {flag:'r'})
  let themeStyle = fs.readFileSync(__dirname + '/../styles/' + theme + '.css', {flag: 'r'})
  let style = '<style>' + baseStyle + themeStyle + '</style>'
  let template = `<div class="wrapper"><pre class="language-${grammar}"><code class="language-${grammar}">${highlighted}</code></pre></div>`
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
