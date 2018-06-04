'use babel'

import os from 'os'
import remote from 'remote'
import inlineCss from 'inline-css'
import Renderer from './renderer.js'
import webshot from 'webshot'

import CarbonShView from './carbon-sh-view'
import { CompositeDisposable } from 'atom'

export default {

  carbonShView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.carbonShView = new CarbonShView(state.carbonShViewState)
    this.modalPanel = atom.workspace.addRightPanel({
      item: this.carbonShView.getElement(),
      visible: false
    })

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable()

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'carbon-sh:toggle': () => this.toggle(),
      'carbon-sh:generate': () => this.generate()
    }))
  },

  deactivate() {
    this.modalPanel.destroy()
    this.subscriptions.dispose()
    this.carbonShView.destroy()
  },

  serialize() {
    return {
      carbonShViewState: this.carbonShView.serialize()
    }
  },

  toggle() {
    return true
    return (
      this.modalPanel.isVisible() ?
      true :
      this.modalPanel.show()
    )
  },

  generate () {
    if (!this.modalPanel.isVisible) {
      this.modalPanel.show()
    }

    inlineCss(Renderer.generateHTML(), {
      removeStyleTags: true,
      url: '/'
    }).then(html => {
      let pathOptions = {
        defaultPath: os.homedir(),
        title: 'Saving screenshot',
        filters: [
          {name: 'JPG Image', extensions: ['jpg']},
          {name: 'PNG Image', extensions: ['png']}
        ]
      }
      let path = remote.dialog.showSaveDialog(pathOptions)
      let options = {
          siteType: 'html',
          windowSize: {
            width: 1200,
            height: 10
          },
          shotSize: {
            width: 'all',
            height: 'all'
          },
          defaultWhiteBackground: '#ff0000',
          quality: 100
        }
      if (path) {
        webshot(Renderer.addHTMLTags(html), path, options, err => {
          if (err) return atom.notifications.addError('There was a problem saving the file')
          return atom.notifications.addSuccess("File saved as\n" + path)
        })
      }
    })
  }

}
