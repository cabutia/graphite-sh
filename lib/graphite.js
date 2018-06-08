'use babel'

import os from 'os'
import fs from 'fs'
import webshot from 'webshot'
import Prism from 'node-prismjs'
import inlineCss from 'inline-css'
import {el,mount,unmount} from 'redom'
import syntax from '../config/syntax.json'
import config from '../config/entries.json'

export default class Graphite {

    GraphiteView = null
    Editor = null
    props = null

    constructor (view = null) {
      this.GraphiteView = view
      this.props = {
        inlinecss: {
          removeStyleTags: true,
          url: '/'
        },
        path: {
          defaultPath: os.homedir(),
          title: 'Saving screenshot',
          filters: [
            {name: 'PNG Image', extensions: ['png']},
            {name: 'JPG Image', extensions: ['jpg']}
          ]
        },
        webshot: {
          siteType: 'html',
          windowSize: {
            width: 800,
            height: 10
          },
          shotSize: {
            width: 'all',
            height: 'all'
          },
          defaultWhiteBackground: false,
          quality: 100
        }
      }
    }

    config () {
      let conf = config
      conf.default_path.default = os.homedir()
      return conf
    }

    mapType (t) {
      return syntax.filter(i => i.a === t)[0].p
    }

    styles () {
      let styles = {
        base: fs.readFileSync(__dirname + '/../styles/base.css', {flag:'r'}),
        theme: fs.readFileSync(__dirname + '/../styles/themes/' + atom.config.get('graphite-sh.theme') + '.css', {flag:'r'})
      }
      return '<style>' + styles.base + styles.theme + '</style>'
    }

    html () {
      let e = atom.workspace.getActiveTextEditor()
      let s = e.getLastSelection().getText()
      let g = this.mapType(e.getGrammar().name)
      let l = Prism.languages[g]
      let h = Prism.highlight(s, l)
      return `<div class="wrapper">
                <pre class="language-${g}"><code class="language-${g}">${h}</code></pre>
              </div>`
    }

    template () {
      return this.styles() + this.html()
    }

    saveShot (h) {
      let dt = new Date(Date.now())
      let ts = dt.getFullYear() + '-'
               + ((dt.getMonth() + 1) ? ['0', dt.getMonth() + 1].join('') : (dt.getMonth() + 1)) + '-'
               + (dt.getDate() < 10 ? ['0', dt.getDate()].join('') : dt.getDate()) + ' '
               + (dt.getHours() < 10 ? ['0', dt.getHours()].join('') : dt.getHours()) + '-'
               + (dt.getMinutes() < 10 ? ['0', dt.getMinutes()].join('') : dt.getMinutes()) + '-'
               + (dt.getSeconds() < 10 ? ['0', dt.getSeconds()].join('') : dt.getSeconds())

      let n = 'Code screenshot ' + ts + '.png'
      let r = Math.random() * 50000
      let d = atom.config.get('graphite-sh.default_path') + '/' + n
      let t = `<html><body>${h}</body></html>`
      webshot(t, d, this.props.webshot, err => {
        if (err) return atom.notifications.addError('Problem saving file')
        atom.notifications.addSuccess('File saved as ' + d)
        this.GraphiteView.updateImage(d + '?avoid=' + r)
        this.GraphiteView.show()
      })
    }

    shot () {
      inlineCss(this.template(), this.props.inlinecss).then(h => this.saveShot(h))
    }
}
